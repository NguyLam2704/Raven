<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'prodImgId' => $this->prod_img_id,
            'image' => $this->image,
            'prodId' => $this->prod_id,
            'isPrimary' => $this->is_primary
        ];
    }
}
