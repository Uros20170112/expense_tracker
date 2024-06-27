<?php

namespace App\Http\Controllers;

use App\Models\ExpenseParticipant;
use Illuminate\Http\Request;
use App\Http\Resources\ExpenseParticipant\ExpenseParticipantResource;
use Illuminate\Support\Facades\Validator;

class ExpenseParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $participants = ExpenseParticipant::all();
        return ExpenseParticipantResource::collection($participants);
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
        $validator = Validator::make($request->all(), [
            'expense_id' => 'required|exists:expenses,id',
            'user_id' => 'required|exists:users,id',
            'amount_to_refund' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $participant = ExpenseParticipant::create([
            'expense_id' => $request->expense_id,
            'user_id' => $request->user_id,
            'amount_to_refund' => $request->amount_to_refund,
        ]);
        

        return new ExpenseParticipantResource($participant);
    }

    /**
     * Display the specified resource.
     */
    public function show(ExpenseParticipant $expenseParticipant)
    {
        return new ExpenseParticipantResource($expenseParticipant);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExpenseParticipant $expenseParticipant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExpenseParticipant $expenseParticipant)
    {
        $validator = Validator::make($request->all(), [
            'expense_id' => 'sometimes|required|exists:expenses,id',
            'user_id' => 'sometimes|required|exists:users,id',
            'amount_to_refund' => 'sometimes|required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $expenseParticipant->update($request->all());

        return new ExpenseParticipantResource($expenseParticipant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExpenseParticipant $expenseParticipant)
    {
        $expenseParticipant->delete();

        return response()->json('Expense participant is deleted');
    }
}
