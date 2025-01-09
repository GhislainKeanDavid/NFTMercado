<?php

namespace App\Http\Controllers;

use App\Models\Socmed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SocmedController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index()
    {
        // Retrieve all posts
        $posts = Socmed::all();
        return response()->json($posts);
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        // Validate the request using Validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'post_date' => 'required|date',
        ]);

        // If validation fails, return error messages
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a new post with the validated data
        $post = Socmed::create($validator->validated());

        return response()->json([
            'message' => 'Post created successfully!',
            'post' => $post,
        ], 201);
    }

    /**
     * Display the specified post.
     */
    public function show($id)
    {
        // Find the post by ID
        $post = Socmed::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json($post);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the post by ID
        $post = Socmed::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        // Validate the request using Validator
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'title' => 'string|max:255',
            'content' => 'string',
            'post_date' => 'date',
        ]);

        // If validation fails, return error messages
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update the post with the validated data
        $post->update($validator->validated());

        return response()->json([
            'message' => 'Post updated successfully!',
            'post' => $post,
        ]);
    }

    /**
     * Remove the specified post from storage.
     */
    public function destroy($id)
    {
        // Find the post by ID
        $post = Socmed::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        // Delete the post
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully!']);
    }
}
