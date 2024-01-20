<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(Product::paginate(10));
    }

    public function customerIndex()
    {
        return ProductResource::collection(Product::paginate(7));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        if(is_array($data['sizes'])){
            $data['sizes'] = json_encode($data['sizes']);
        }
        if(is_array($data['colors'])){
            $data['colors'] = json_encode($data['colors']);
        }

        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }

        $product = Product::create($data);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function showForCustomer(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if(is_array($data['sizes'])){
            $data['sizes'] = json_encode($data['sizes']);
        }
        if(is_array($data['colors'])){
            $data['colors'] = json_encode($data['colors']);
        }

        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if($product->image){
                $absolutePath = public_path($product->image);
                File::delete($absolutePath);
            }
        }


        $product->update($data);

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        if($product->image){
            $absolutePath = public_path($product->image);
            File::delete($absolutePath);
        }

        return response('',204);
    }

     /**
     * search for values within the model.
     */
    public function search(Request $request)
    {
       $products = Product::search($request->input('query'))->paginate(10);
       return ProductResource::collection($products);
    }

    private function saveImage($image)
    {   // check if the image is valid based64 string
        if (preg_match('/^data:image\/(\w+);base64,/',$image,$type)) {
            // take out the based64 encoded text without mime type
            $image = substr($image,strpos($image,',') + 1);
            // get file extension
            $type = strtolower($type[1]);
            // check if file is valid
            if(!in_array($type, ['jpg','jpeg','gif','png'])){
                throw new \Exception('invalid image type');
            }
            $image = str_replace('','+',$image);
            $image = base64_decode($image);

            if ($image === false){
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URL with image');
        }

        $dir = 'images/';
        $file = Str::random().'.'.$type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
