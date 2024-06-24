<?php

namespace App\Http\Resources\Expense;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'description' =>$this->resource->description,
            'amount'=>$this->resource->amount,
            'paid_by'=>$this->resource->user->id,
            'category_id'=>$this->resource->category_id,
            'paid_on'=>$this->resource->paid_on
        ];
    }
}
