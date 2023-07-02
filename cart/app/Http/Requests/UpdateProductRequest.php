<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'quantity' => (int) $this->quantity,
            'price' => (int) $this->price
        ]);
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string',
            'user_id' => 'exists:users,id',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'quantity' => 'nullable',
            'price' => 'nullable',
            'image' => 'nullable|string',
            'sizes' => 'array',
            'colors' => 'array'
        ];
    }
}
