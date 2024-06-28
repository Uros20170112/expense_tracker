<?php

namespace App\Http\Controllers;

use App\Http\Resources\Category\CategoryCollection;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::all();
        return CategoryResource::collection($categories);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create($request->all());

        return response()->json($category, 201);
    }

    public function indexPaginate()
    {
        $categories = Category::all();
        if (is_null($categories)) {
            return response()->json('No categories found', 404);
        }
        $categories = Category::paginate(5);
        return response()->json(new CategoryCollection($categories));
    }


    public function show($id)
    {
        $category = Category::findOrFail($id);
        return $category;
    }


    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->update($request->all());

        return response()->json($category);
    }


    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
