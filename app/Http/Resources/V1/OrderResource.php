<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\V1\UserResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'orderId' => $this->order_id,
            'dateCreated' => $this->datecreated,
            'status' => $this->status,
            'user' => new UserResource($this->whenLoaded('user')), //load relationship user
            'bill' => new BillResource($this->whenLoaded('bill')), //load relationship bill
            'datePaid' => $this->datepaid,
            'payingMethod' => $this->payingmethod,
            'address' => $this->address,
            'detailAddress' => $this->detail_address
        ];
    }
}
