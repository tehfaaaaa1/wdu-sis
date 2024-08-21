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
        Schema::create('answer_choices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('answer_id')->constrained(
                table: 'answers',
                indexName: 'answer_choices_answer_id',
            )->onDelete('cascade');
            $table->foreignId('question_choice_id')->constrained(
                table: 'question_choices',
                indexName: 'answer_choices_question_choice_id',
            )->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answer_choices');
    }
};
