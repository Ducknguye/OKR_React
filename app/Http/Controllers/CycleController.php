<?php

namespace App\Http\Controllers;
use App\Models\Cycle;
use App\Models\Objective;

use Illuminate\Http\Request;

class CycleController extends Controller
{
    //
    public function index(Request $request) {
        $cycles = Cycle::orderByDesc('start_date')->get();
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'data' => $cycles]);
        }
        return view('app');
    }

    public function create() {
        return view('app');
    }

    public function store(Request $request) {
        $request->validate([
            'cycle_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:active,inactive',
            'description' => 'nullable|string',
        ]);

        $cycle = Cycle::create($request->all());
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'data' => $cycle, 'message' => 'Tạo chu kỳ thành công!']);
        }
        return redirect()->route('cycles.index')->with('success', 'Tạo chu kỳ thành công!');
    }

    public function show(Request $request, Cycle $cycle) {
        // Eager load objectives và user của objectives
        $cycle->load(['objectives.user']);

        // Trích xuất objectives từ cycle
        $objectives = $cycle->objectives;

        // Truyền cả $cycle và $objectives vào view
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'data' => compact('cycle','objectives')]);
        }
        return view('app');
    }

    public function edit(Cycle $cycle) {
        return view('app');
    }

    public function update(Request $request, Cycle $cycle) {
        $request->validate([
            'cycle_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:active,inactive',
            'description' => 'nullable|string',
        ]);

        $cycle->update($request->all());
        if ($request->expectsJson()) {
            return response()->json(['success' => true, 'data' => $cycle, 'message' => 'Cập nhật chu kỳ thành công!']);
        }
        return redirect()->route('cycles.index')->with('success', 'Cập nhật chu kỳ thành công!');
    }

    public function destroy(Cycle $cycle) {
        $cycle->delete();
        if (request()->expectsJson()) {
            return response()->json(['success' => true, 'message' => 'Xóa chu kỳ thành công!']);
        }
        return redirect()->route('cycles.index')->with('success', 'Xóa chu kỳ thành công!');
    }
}
