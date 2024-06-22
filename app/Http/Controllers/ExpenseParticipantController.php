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
        // Prikazivanje svih učesnika troškova
        $participants = ExpenseParticipant::all();
        return ExpenseParticipantResource::collection($participants);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Nije potrebno za API kontroler
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validacija zahteva
        $validator = Validator::make($request->all(), [
            'expense_id' => 'required|exists:expenses,id',
            'user_id' => 'required|exists:users,id',
            'amount_to_refund' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Kreiranje novog učesnika troška
        $participant = ExpenseParticipant::create($request->all());

        return new ExpenseParticipantResource($participant);
    }

    /**
     * Display the specified resource.
     */
    public function show(ExpenseParticipant $expenseParticipant)
    {
        // Prikazivanje određenog učesnika troška
        return new ExpenseParticipantResource($expenseParticipant);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExpenseParticipant $expenseParticipant)
    {
        // Nije potrebno za API kontroler
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExpenseParticipant $expenseParticipant)
    {
        // Validacija zahteva
        $validator = Validator::make($request->all(), [
            'expense_id' => 'sometimes|required|exists:expenses,id',
            'user_id' => 'sometimes|required|exists:users,id',
            'amount_to_refund' => 'sometimes|required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ažuriranje učesnika troška
        $expenseParticipant->update($request->all());

        return new ExpenseParticipantResource($expenseParticipant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExpenseParticipant $expenseParticipant)
    {
        // Brisanje učesnika troška
        $expenseParticipant->delete();

        return response()->json('Expense participant is deleted');
    }
}
