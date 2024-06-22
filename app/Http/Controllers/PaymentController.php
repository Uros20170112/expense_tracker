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
        // Prikazivanje svih uplata
        $payments = Payment::all();
        return PaymentResource::collection($payments);
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
            'payer_id' => 'required|exists:users,id',
            'payee_id' => 'required|exists:users,id',
            'expense_id' => 'required|exists:expenses,id',
            'amount' => 'required|numeric',
            'payment_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Kreiranje nove uplate
        $payment = Payment::create($request->all());

        return new PaymentResource($payment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        // Prikazivanje određene uplate
        return new PaymentResource($payment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        // Nije potrebno za API kontroler
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        // Validacija zahteva
        $validator = Validator::make($request->all(), [
            'payer_id' => 'sometimes|required|exists:users,id',
            'payee_id' => 'sometimes|required|exists:users,id',
            'expense_id' => 'sometimes|required|exists:expenses,id',
            'amount' => 'sometimes|required|numeric',
            'payment_date' => 'sometimes|required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ažuriranje uplate
        $payment->update($request->all());

        return new PaymentResource($payment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        // Brisanje uplate
        $payment->delete();

        return response()->json(null, 204);
    }
}
