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
        Schema::create('flows', function (Blueprint $table) {
            $table->id();
            $table->string('flow_name');
            $table->foreignId('question_page_id')->constrained(
                table: 'question_pages',
                indexName: 'flows_question_page_id',
            )->onDelete('cascade');
            $table->foreignId('question_id')->constrained(
                table: 'questions',
                indexName: 'flows_questions_id',
            )->onDelete('cascade');
            $table->foreignId('question_choice_id')->constrained(
                table: 'question_choices',
                indexName: 'flows_question_choice_id',
            )->onDelete('cascade');
            $table->foreignId('next_page_id')
                  ->constrained('question_pages', 'id') // referencing 'question_page_id'
                  ->index('flows_next_page_id') // custom index name
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flows');
    }
};
