<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

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
            'id' => $this->id,
            'name' => $this->name,
            'image_url' => URL::to($this->image),
            'slug' => $this->slug,
            'category' => $this->category,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'sizes' => json_decode($this->sizes),
            'colors' =>json_decode($this->colors)
        ];
    }
}
