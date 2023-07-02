<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
        $this->quantity = intval($this->quantity);
        $this->price = intval($this->price);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'user_id' => 'exists:users,id',
            'category' => 'required|string',
            'description' => 'required|string',
            'quantity' => 'required',
            'price' => 'required',
            'image' => 'required|string',
            'sizes' => 'array',
            'colors' => 'array'

        ];
    }
}
