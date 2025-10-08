<?php

namespace App\Http\Controllers;

use App\Models\KeyResult;
use App\Models\Objective;
use Illuminate\Http\Request;
use App\Models\Cycle;

class KeyResultController extends Controller
{
    public function index($objectiveId)
    {
        $objective = Objective::with('keyResults')->findOrFail($objectiveId);
        $keyResults = $objective->keyResults;
        $cycles = Cycle::all();

        return view('key_results.index', compact('objective', 'keyResults', 'cycles'));
    }

    public function show($objectiveId, $keyResultId)
    {
        $objective = Objective::findOrFail($objectiveId);

        $keyResult = KeyResult::with(['objective', 'cycle'])
            ->where('objective_id', $objectiveId)
            ->where('kr_id', $keyResultId)
            ->firstOrFail();

        return view('key_results.show', compact('objective', 'keyResult'));
    }

    public function create($objectiveId)
    {
        $objective = Objective::findOrFail($objectiveId);
        $cycles = Cycle::all();
        return view('key_results.create', compact('objective', 'cycles'));
    }

    public function store(Request $request, $objectiveId)
    {
        $validated = $request->validate([
            'kr_title' => 'required|string|max:255',
            'target_value' => 'required|numeric|min:0',
            'current_value' => 'nullable|numeric|min:0',
            'unit' => 'required|string|max:255',
            'status' => 'nullable|string|max:255',
            'weight' => 'nullable|integer|min:0|max:100',
            'progress_percent' => 'nullable|numeric|min:0|max:100',
            'cycle_id' => 'nullable|exists:cycles,cycle_id',
        ]);

        try {
            // Lấy objective để có cycle_id
            $objective = Objective::findOrFail($objectiveId);

            // Đảm bảo có cycle_id hợp lệ
            $cycleId = $validated['cycle_id'] ?? $objective->cycle_id;
            if (!$cycleId) {
                // Nếu không có cycle_id, lấy cycle hiện tại hoặc tạo mặc định
                $currentCycle = Cycle::where('status', 'active')->first();
                if (!$currentCycle) {
                    $currentCycle = Cycle::latest()->first();
                }
                $cycleId = $currentCycle ? $currentCycle->cycle_id : 1; // fallback to 1
            }

            // Tính % tiến độ (nếu có current_value)
            $current = $validated['current_value'] ?? 0;
            $target = $validated['target_value'];
            $progress = $validated['progress_percent'] ?? ($target > 0 ? ($current / $target) * 100 : 0);

            $keyResult = KeyResult::create([
                'kr_title' => $validated['kr_title'],
                'target_value' => $target,
                'current_value' => $current,
                'unit' => $validated['unit'],
                'status' => $validated['status'] ?? 'active',
                'weight' => $validated['weight'] ?? 0,
                'progress_percent' => $progress,
                'objective_id' => $objectiveId,
                'cycle_id' => $cycleId,
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Key Result đã được thêm thành công!',
                    'data' => $keyResult
                ]);
            }

            return redirect()
                ->route('objectives.show', $objectiveId)
                ->with('success', 'Key Result đã được thêm thành công!');
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Có lỗi xảy ra khi thêm Key Result: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Có lỗi xảy ra khi thêm Key Result.'])
                ->withInput();
        }
    }

    public function update(Request $request, $objectiveId, $krId)
    {
        $validated = $request->validate([
            'kr_title' => 'required|string|max:255',
            'target_value' => 'required|numeric|min:0',
            'current_value' => 'nullable|numeric|min:0',
            'unit' => 'required|string|max:255',
            'status' => 'nullable|string|max:255',
            'weight' => 'nullable|integer|min:0|max:100',
            'progress_percent' => 'nullable|numeric|min:0|max:100',
            'cycle_id' => 'nullable|exists:cycles,cycle_id',
        ]);

        try {
            $keyResult = KeyResult::findOrFail($krId);

            // Tính % tiến độ (nếu có current_value)
            $current = $validated['current_value'] ?? $keyResult->current_value ?? 0;
            $target = $validated['target_value'];
            $progress = $validated['progress_percent'] ?? ($target > 0 ? ($current / $target) * 100 : 0);

            $keyResult->update([
                'kr_title' => $validated['kr_title'],
                'target_value' => $target,
                'current_value' => $current,
                'unit' => $validated['unit'],
                'status' => $validated['status'] ?? $keyResult->status,
                'weight' => $validated['weight'] ?? $keyResult->weight,
                'progress_percent' => $progress,
                'cycle_id' => $validated['cycle_id'] ?? $keyResult->cycle_id,
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Key Result đã được cập nhật thành công!',
                    'data' => $keyResult
                ]);
            }

            return redirect()
                ->route('objectives.show', $objectiveId)
                ->with('success', 'Key Result đã được cập nhật thành công!');
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Có lỗi xảy ra khi cập nhật Key Result: ' . $e->getMessage()
                ], 500);
            }

            return redirect()->back()
                ->withErrors(['error' => 'Có lỗi xảy ra khi cập nhật Key Result.'])
                ->withInput();
        }
    }

    public function destroy($objectiveId, $krId)
    {
        $kr = KeyResult::findOrFail($krId);
        $kr->delete();

        return response()->json(['success' => true, 'message' => 'Key Result đã được xóa']);
    }
}
