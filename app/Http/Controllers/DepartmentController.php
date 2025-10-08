<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;

class DepartmentController extends Controller
{
    //
    public function index() {
        $departments = Department::all();
        if (request()->wantsJson()) {
            return response()->json(['data' => $departments]);
        }
        // Render React shell (Dashboard UI)
        return view('app');
    }

    public function create() {
        return view('app');
    }

    public function store(Request $request) {
        $request->validate([
            'd_name' => 'required|string|max:255',
            'd_description' => 'nullable|string',
        ]);

        $dept = Department::create($request->only(['d_name','d_description']));
        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Tạo phòng ban thành công!', 'data' => $dept]);
        }
        return redirect()->route('departments.index')->with('success', 'Tạo phòng ban thành công!').set_time_limit(300);
    }

    public function show(Department $department) {
        if (request()->wantsJson()) {
            return response()->json(['data' => $department]);
        }
        return view('app');
    }

    public function edit(Department $department) {
        return view('app');
    }

    public function update(Request $request, Department $department) {
        $request->validate([
            'd_name' => 'required|string|max:255',
            'd_description' => 'nullable|string',
        ]);

        $department->update($request->only(['d_name','d_description']));
        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Cập nhật phòng ban thành công!', 'data' => $department]);
        }
        return redirect()->route('departments.index')->with('success', 'Cập nhật phòng ban thành công!').set_time_limit(300);
    }

    public function destroy(Department $department) {
        $department->delete();
        if (request()->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Xóa phòng ban thành công!']);
        }
        return redirect()->route('departments.index')->with('success', 'Xóa phòng ban thành công!').set_time_limit(300);
    }
}
