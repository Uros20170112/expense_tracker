<?php

namespace App\Http\Resources\ExpenseParticipant;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ExpenseParticipantCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public static $wrap = 'expense_participants';
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
