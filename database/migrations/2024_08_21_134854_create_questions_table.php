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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained(
                table: 'surveys',
                indexName: 'questions_survey_id',
            )->onDelete('cascade');
            $table->string('question_text', 255);
            $table->foreignId('question_type_id')->constrained(
                table: 'question_types',
                indexName: 'questions_question_type_id',
            )->onDelete('cascade');
            $table->integer('order')->unique()->nullable();
            $table->boolean('required');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
