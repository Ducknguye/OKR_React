<?php

namespace App\Http\Controllers;

use App\Models\Objective;
use App\Models\KeyResult;
use App\Models\Cycle;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class ObjectiveController extends Controller
{
    /**
     * Display a listing of objectives
     */
    public function index()
    {
        $objectives = Objective::with(['user', 'cycle', 'keyResults'])->paginate(10);
        if (request()->wantsJson()) {
            return response()->json(['data' => $objectives]);
        }
        return view('app');
    }

    /**
     * Show the form for creating a new objective with Tailwind
     */
    public function create(Request $request): View
    {
        $user = Auth::user();
        $cycle_id = $request->query('cycle_id', null);

        // Xác định các level được phép tạo theo role_id
        $allowedLevels = match($user->role_id) {
            1 => ['Công ty', 'Phòng ban', 'Nhóm', 'Cá nhân'], // Admin
            2 => ['Phòng ban', 'Nhóm', 'Cá nhân'],            // Manager
            default => ['Nhóm', 'Cá nhân'],                   // Member
        };

        return view('objectives.create', compact('cycle_id', 'allowedLevels'));
    }

    /**
     * Store a newly created objective
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $level = $request->input('level', 'Cá nhân');

        // Xác định các level được phép tạo theo role_id
        switch ($user->role_id) {
            case 1: // Admin
                $allowedLevels = ['Công ty', 'Phòng ban', 'Nhóm', 'Cá nhân'];
                break;
            case 2: // Manager
                $allowedLevels = ['Phòng ban', 'Nhóm', 'Cá nhân'];
                break;
            case 3: // Member
            default:
                $allowedLevels = ['Nhóm', 'Cá nhân'];
                break;
        }

        // Kiểm tra quyền
        if (!in_array($level, $allowedLevels)) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bạn không có quyền tạo OKR cấp ' . $level . '.'
                ], 403);
            }
            return redirect()->back()
                ->withErrors(['level' => 'Bạn không có quyền tạo OKR cấp ' . $level . '.'])
                ->withInput();
        }

        // Validate dữ liệu
        $validated = $request->validate([
            // Objective
            'obj_title' => 'required|string|max:255',
            'level' => 'required|string|in:' . implode(',', $allowedLevels),
            'description' => 'nullable|string|max:1000',
            'status' => 'required|in:draft,active,completed',
            'progress_percent' => 'nullable|numeric|min:0|max:100',
            'cycle_id' => 'nullable|integer|exists:cycles,cycle_id',

            // Key Results
            'key_results' => 'nullable|array',
            'key_results.*.kr_title' => 'required|string|max:255',
            'key_results.*.target_value' => 'required|numeric|min:0',
            'key_results.*.current_value' => 'nullable|numeric|min:0',
            'key_results.*.unit' => 'required|string|max:255',
            'key_results.*.status' => 'nullable|string|max:255',
            'key_results.*.weight' => 'nullable|integer|min:0|max:100',
            'key_results.*.progress_percent' => 'nullable|numeric|min:0|max:100',
        ]);

        try {
            // Tạo Objective và Key Results trong transaction
            $objective = DB::transaction(function() use ($validated, $request) {
                $objectiveData = [
                    'obj_title' => $validated['obj_title'],
                    'level' => $validated['level'],
                    'description' => $validated['description'],
                    'status' => $validated['status'],
                    'progress_percent' => $validated['progress_percent'] ?? 0,
                    'user_id' => Auth::id() ?? 2,
                    'cycle_id' => $validated['cycle_id'],
                ];
                $objective = Objective::create($objectiveData);

                $keyResults = $request->input('key_results', []);
                foreach ($keyResults as $kr) {
                    if (empty($kr['kr_title'])) continue;

                    $keyResultData = [
                        'kr_title' => $kr['kr_title'],
                        'target_value' => $kr['target_value'],
                        'current_value' => $kr['current_value'] ?? 0,
                        'unit' => $kr['unit'],
                        'status' => $kr['status'] ?? 'active',
                        'weight' => $kr['weight'] ?? 0,
                        'progress_percent' => $kr['progress_percent'] ?? 0,
                        'objective_id' => $objective->objective_id,
                        'cycle_id' => $objective->cycle_id ?? null,
                    ];
                    KeyResult::create($keyResultData);
                }

                return $objective;
            });

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Mục tiêu đã được tạo thành công!',
                    'data' => $objective->load('keyResults')
                ]);
            }

            return redirect()->route('cycles.show', $validated['cycle_id'])
                ->with('success', 'Objective created successfully!');
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Có lỗi xảy ra khi tạo mục tiêu: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Có lỗi xảy ra khi tạo mục tiêu.'])
                ->withInput();
        }
    }

    /**
     * Display the specified objective
     */
    public function show(string $id)
    {
        $objective = Objective::with('keyResults')->findOrFail($id);
        if (request()->wantsJson()) {
            return response()->json(['data' => $objective]);
        }
        return view('app');
    }

    /**
     * Show the form for editing the specified objective
     */
    public function edit(string $id): View
    {
        $objective = Objective::findOrFail($id);
        return view('app');
    }

    /**
     * Update the specified objective
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'obj_title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'status' => 'required|in:draft,active,completed',
            'progress_percent' => 'nullable|numeric|min:0|max:100'
        ]);

        try {
            $objective = Objective::findOrFail($id);
            $objective->update($validated);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Mục tiêu đã được cập nhật thành công!',
                    'data' => $objective
                ]);
            }

            return redirect()->route('objectives.index')
                ->with('success', 'Objective updated successfully!');
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Có lỗi xảy ra khi cập nhật mục tiêu: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Có lỗi xảy ra khi cập nhật mục tiêu.'])
                ->withInput();
        }
    }

    /**
     * Remove the specified objective
     */
    public function destroy(string $id)
    {
        try {
            $objective = Objective::findOrFail($id);
            $objective->delete();

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Mục tiêu đã được xóa thành công!'
                ]);
            }

            return redirect()->route('objectives.index')
                ->with('success', 'Objective deleted successfully!');
        } catch (\Exception $e) {
            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Có lỗi xảy ra khi xóa mục tiêu: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Có lỗi xảy ra khi xóa mục tiêu.']);
        }
    }
}
