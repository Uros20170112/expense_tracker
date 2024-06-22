<?php

namespace App\Http\Resources\ExpenseParticipant;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseParticipantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'expense_id' => $this->resource->expense_id,
            'user_id' => $this->resource->user_id,
            'amount_to_refund' => $this->resource->amount_to_refund,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
