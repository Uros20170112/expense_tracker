<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use App\Http\Resources\Expense\ExpenseResource;
use Illuminate\Support\Facades\Validator;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::all();
        return ExpenseResource::collection($expenses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validacija zahteva
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'paid_by' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'paid_on' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Kreiranje novog troška
        $expense = Expense::create($request->all());

        return new ExpenseResource($expense);
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        // Prikazivanje određenog troška
        return new ExpenseResource($expense);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required|numeric',
            'paid_by' => 'sometimes|required|exists:users,id',
            'category_id' => 'sometimes|required|exists:categories,id',
            'paid_on' => 'sometimes|required|date',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ažuriranje troška
        $expense->update($request->all());

        return new ExpenseResource($expense);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return response()->json(null, 204);
    }
}
