<?php

namespace App\Http\Resources\V1;

// use Database\Seeders\category_type;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'categorytypeId' => $this->category_type_id,
            'categorytypeName' => $this->category_type_name,
            'categoryId' => $this->category_id,
        ];
    }
}
