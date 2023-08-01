<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function get($id = null){

        if($id){
            $products = Product::find($id);
        }else{
            $products = Product::all();
        }
        return response()->json([
            'status' => 'success',
            'products' => $products,
        ]);
    }

    public function addOrUpdate(Request $request, $id = "add"){

        if($id == "add"){
            $product = new Product;
        }else{
            $product = Product::find($id);
            
        }

        $image_base64 =null;
        if($request->file('image')){
            $image_base64 = base64_encode(file_get_contents($request->file('image')->path()));
        }

        $product->name = $request->name ? $request->name : $product->name;
        $product->description = $request->description ? $request->description : $product->description;
        $product->price = $request->price ? $request->price : $product->price;
        $product->image = $image_base64;
        $product->save();

        return response()->json([
            'status' => 'success',
            'product' => $product,
        ]);

    }

    public function delete($id){
        $product = Product::find($id)->delete();
        return json_encode(['status' => 'success']);
    }

}
