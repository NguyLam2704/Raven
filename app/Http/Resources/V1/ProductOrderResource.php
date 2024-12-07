<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'proColorSizeId' => $this->pro_color_size_id,
            'orderId' => $this->order_id,
            'quantity' => $this->quantity,
            'cost' => $this->after_discount_cost
        ];
    }
}
