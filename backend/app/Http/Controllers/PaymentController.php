<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Resources\Payment\PaymentResource;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::all();
        return PaymentResource::collection($payments);
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
            'payer_id' => 'required|exists:users,id',
            'payee_id' => 'required|exists:users,id',
            'expense_id' => 'required|exists:expenses,id',
            'status' => 'required|string',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $payment = Payment::create([
            'payer_id' => $request->payer_id,
            'payee_id' => $request->payee_id,
            'expense_id' => $request->expense_id,
            'amount' => $request->amount,
            'payment_date' => $request->payment_date,
            'status' => $request->status,
        ]);

        return new PaymentResource($payment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        return new PaymentResource($payment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    public function pay(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);
        $payment->amount = 0;
        $payment->status = 'completed';
        $payment->save();

        return response()->json(new PaymentResource($payment), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        $validator = Validator::make($request->all(), [
            'payer_id' => 'sometimes|required|exists:users,id',
            'payee_id' => 'sometimes|required|exists:users,id',
            'expense_id' => 'sometimes|required|exists:expenses,id',
            'status' => 'sometimes|required|string',
            'amount' => 'sometimes|required|numeric',
            'payment_date' => 'sometimes|required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $payment->update($request->all());

        return new PaymentResource($payment);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();

        return response()->json('Payment is deleted');
    }
}
