<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'billId' => $this->bill_id,
            'orderId' => $this->order_id,
            'totalCost' => $this->total_cost,
            'detail' => $this->detail
        ];
    }
}
