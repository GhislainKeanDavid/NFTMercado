<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Retrieve all comments for a specific post.
     */
    public function index($socmed_id)
    {
        // Get all comments for a specific post
        $comments = Comment::where('socmed_id', $socmed_id)->get();

        return response()->json($comments);
    }

    /**
     * Store a new comment.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'socmed_id' => 'required|exists:category,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a new comment
        $comment = Comment::create($validator->validated());

        return response()->json(['message' => 'Comment added!', 'comment' => $comment], 201);
    }

    /**
     * Update an existing comment.
     */
    public function update(Request $request, $id)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find and update the comment
        $comment = Comment::findOrFail($id);
        $comment->update($validator->validated());

        return response()->json(['message' => 'Comment updated!', 'comment' => $comment]);
    }

    /**
     * Delete a comment.
     */
    public function destroy($id)
    {
        // Find and delete the comment
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(['message' => 'Comment deleted!']);
    }
}
