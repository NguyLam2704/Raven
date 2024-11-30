<?php

namespace App\Http\Resources\V1;

// use Database\Seeders\category_type;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProColorSizeResource extends JsonResource
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
            'prodId' => $this->prod_id,
            'sizeId' => $this->size_id,
            'colorId' => $this->color_id,
            'quantityAvailable' => $this->quantity_available,
            'color' => new ColorResource($this->whenLoaded('color')),
            'size' => new SizeResource($this->whenLoaded('size')),
        ];
    }
}
