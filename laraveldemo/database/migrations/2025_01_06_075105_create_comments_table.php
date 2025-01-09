<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->text('content');  // Comment content
            $table->foreignId('socmed_id')  // Post this comment belongs to
                  ->constrained('category')  // Assuming posts are stored in the 'categories' table
                  ->onDelete('cascade');
            $table->foreignId('user_id')   // The user who wrote the comment
                  ->constrained('users')    // Assuming users table exists
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
