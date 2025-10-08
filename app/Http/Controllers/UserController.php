<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use App\Models\Department;

class UserController extends Controller
{
    public function __construct()
    {
        // Middleware sẽ được áp dụng trong routes
    }

    /**
     * Hiển thị danh sách người dùng
     */
    public function index(\Illuminate\Http\Request $request)
    {
        try {
            $users = \Cache::remember('users_list', 300, function () {
                return User::with(['role', 'department'])
                    ->orderBy('user_id', 'asc')
                    ->get();
            });

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'data' => $users,
                ]);
            }

            // Serve SPA shell; frontend will fetch JSON from this same route
            return view('app');
        } catch (\Exception $e) {
            \Log::error('Error loading users: ' . $e->getMessage());
            if ($request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Không thể tải danh sách người dùng.'], 500);
            }
            return view('app');
        }
    }

    public function show($id, \Illuminate\Http\Request $request)
    {
        $user = User::with(['role', 'department'])->findOrFail($id);
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'data' => $user]);
        }
        return view('app');
    }

    /**
     * Tạo người dùng mới
     */
    public function store(Request $request)
    {
        // Middleware đã kiểm tra quyền Admin

        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role_id' => 'required|exists:roles,role_id',
            'department_id' => 'nullable|exists:departments,department_id',
            'status' => 'required|in:active,inactive',
        ]);

        $user = User::create($request->only(['full_name', 'email', 'role_id', 'department_id', 'status']));

        // Clear cache when user is created
        \Cache::forget('users_list');

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Tạo người dùng thành công!',
                'data' => $user->load(['role', 'department'])
            ]);
        }

        return redirect()->route('users.index')->with('success', 'Tạo người dùng thành công!');
    }

    /**
     * Cập nhật người dùng
     */
    public function update(Request $request, $id)
    {
        // Middleware đã kiểm tra quyền Admin

        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id . ',user_id',
            'role_id' => 'required|exists:roles,role_id',
            'department_id' => 'nullable|exists:departments,department_id',
            'status' => 'required|in:active,inactive',
        ]);

        $user = User::findOrFail($id);

        // Không cho phép thay đổi vai trò của Admin
        if ($user->isAdmin()) {
            if ($request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Không thể thay đổi vai trò của Admin.'], 400);
            }
            return redirect()->back()->withErrors('Không thể thay đổi vai trò của Admin.');
        }

        // Kiểm tra xem có thể thay đổi vai trò không
        if ($user->user_id === Auth::id() && !Auth::user()->isAdmin()) {
            if ($request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Bạn không thể thay đổi vai trò của chính mình.'], 400);
            }
            return redirect()->back()->withErrors('Bạn không thể thay đổi vai trò của chính mình.');
        }

        $user->update($request->only(['full_name', 'email', 'role_id', 'department_id', 'status']));

        // Clear cache when user is updated
        \Cache::forget('users_list');

        // Reload relationship để có thể truy cập role mới
        $user->load(['role', 'department']);

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Cập nhật người dùng thành công!',
                'data' => $user
            ]);
        }

        return redirect()->route('users.index')->with('success', 'Cập nhật người dùng thành công!');
    }

    /**
     * Cập nhật trạng thái người dùng
     */
    public function updateStatus(Request $request, $id)
    {
        // Middleware đã kiểm tra quyền Admin

        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        $user = User::findOrFail($id);

        // Không cho phép thay đổi trạng thái của Admin
        if ($user->isAdmin()) {
            if ($request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Không thể thay đổi trạng thái của Admin.'], 400);
            }
            return redirect()->back()->withErrors('Không thể thay đổi trạng thái của Admin.');
        }

        // Không cho phép Admin tự vô hiệu hóa chính mình
        if ($user->user_id === Auth::id() && $request->status === 'inactive') {
            if ($request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Bạn không thể vô hiệu hóa tài khoản của chính mình.'], 400);
            }
            return redirect()->back()->withErrors('Bạn không thể vô hiệu hóa tài khoản của chính mình.');
        }

        $oldStatus = $user->status ?? 'active';
        $newStatus = $request->status;

        $user->status = $newStatus;
        $user->save();

        // Clear cache when user status is updated
        \Cache::forget('users_list');

        $statusText = $newStatus === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa';

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => "Đã cập nhật trạng thái của {$user->full_name} thành {$statusText}."
            ]);
        }

        return redirect()->route('users.index')
            ->with('success', "Đã cập nhật trạng thái của {$user->full_name} thành {$statusText}.");
    }

    /**
     * Xóa người dùng (chỉ Admin)
     */
    public function destroy($id)
    {
        // Middleware đã kiểm tra quyền Admin

        $user = User::findOrFail($id);

        // Không cho phép xóa Admin
        if ($user->isAdmin()) {
            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Không thể xóa tài khoản Admin.'], 400);
            }
            return redirect()->back()->withErrors('Không thể xóa tài khoản Admin.');
        }

        // Không cho phép xóa chính mình
        if ($user->user_id === Auth::id()) {
            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Bạn không thể xóa tài khoản của chính mình.'], 400);
            }
            return redirect()->back()->withErrors('Bạn không thể xóa tài khoản của chính mình.');
        }

        $userName = $user->full_name;
        $user->delete();

        // Clear cache when user is deleted
        \Cache::forget('users_list');

        if (request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => "Đã xóa người dùng {$userName}."
            ]);
        }

        return redirect()->route('users.index')->with('success', "Đã xóa người dùng {$userName}.");
    }
}
