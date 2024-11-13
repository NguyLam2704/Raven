<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\V1\ProductImageResource;
class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'proId' => $this->prod_id,
            'productName' => $this->prod_name,
            'cost' => $this->cost,
            'discount' => $this->discount,
            'quantitySold' => $this->quantity_sold,
            'description' => $this->description,
            'datePosted' => $this->dateposted,
            'categorytypeId' => $this->category_type_id,
            // load relationship named productImage in model
            'productImage' => ProductImageResource::collection($this->whenLoaded('productImage'))
        ];
    }
}
