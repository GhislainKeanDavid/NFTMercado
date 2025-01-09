<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category', function (Blueprint $table) {
            $table->id(); // Unique identifier
            $table->string('name'); // Name of the person
            $table->string('title'); // Title of the post
            $table->text('content'); // Content of the post
            $table->date('post_date'); // Date of the post
            $table->timestamps(); // Adds 'created_at' and 'updated_at' columns
            $table->softDeletes(); 

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category');
    }
};
