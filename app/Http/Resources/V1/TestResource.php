<?php

namespace App\Http\Resources\V1;

// use Database\Seeders\category_type;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // 'categoryTypeId' => $this->category_type_id,
            'prodId' => $this->prod_id,
            'colorId' => $this->color_id,
        ];
    }
}
