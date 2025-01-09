<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
use App\Http\Controllers\CommentController;

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Comment CRUD operations
$router->post('comments', 'CommentController@store');         // Create a comment
$router->get('comments/{socmed_id}', 'CommentController@index'); // Get all comments for a post
$router->put('comments/{id}', 'CommentController@update');    // Update a comment
$router->delete('comments/{id}', 'CommentController@destroy'); // Delete a comment

// Routes for Socmed CRUD operations
$router->get('socmed', 'SocmedController@index'); // Get all posts
$router->post('socmed', 'SocmedController@store'); // Create a new post
$router->get('socmed/{id}', 'SocmedController@show'); // Get a specific post by ID
$router->put('socmed/{id}', 'SocmedController@update'); // Update a post by ID
$router->delete('socmed/{id}', 'SocmedController@destroy'); // Delete a post by ID
