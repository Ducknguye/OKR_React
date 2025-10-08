<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            if ($request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Bạn cần đăng nhập để xem hồ sơ.'], 401);
            }
            return redirect()->route('login')->withErrors('Bạn cần đăng nhập để xem hồ sơ.');
        }

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'data' => [
                    'name' => $user->full_name,
                    'email' => $user->email,
                    'avatar' => $user->avatar_url,
                ]
            ]);
        }

        return view('app');
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'full_name' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Cập nhật thông tin cơ bản
        $user->full_name = $request->full_name;

        // Xử lý upload avatar
        if ($request->hasFile('avatar')) {
            // Xóa avatar cũ nếu có
            if ($user->avatar_url && Storage::disk('public')->exists(str_replace('/storage/', '', $user->avatar_url))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->avatar_url));
            }

            // Lưu avatar mới
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar_url = '/storage/' . $path;
        }

        $user->save();

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Cập nhật hồ sơ thành công!',
                'user' => [
                    'name' => $user->full_name,
                    'email' => $user->email,
                    'avatar' => $user->avatar_url,
                ],
            ]);
        }

        return redirect()->route('profile.show')->with('success', 'Cập nhật hồ sơ thành công!');
    }
}
