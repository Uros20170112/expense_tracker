<?php

namespace App\Http\Resources\Payment;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'payer_id' => $this->resource->payer->payer->id,
            'payer_name' => $this->resource->payer->name,
            'payee_id' => $this->resource->payee->id,
            'payee_name' => $this->resource->payee->name,
            'expense_id' => $this->resource->expense->id,
            'amount' => $this->resource->amount,
            'payment_date' => $this->resource->payment_date,
        ];
    }
}
