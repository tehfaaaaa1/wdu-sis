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
        Schema::create('question_pages', function (Blueprint $table) {
            $table->id();
            $table->string('page_name');
            $table->foreignId('survey_id')->constrained(
                table: 'surveys',
                indexName: 'question_pages_survey_id',
            )->onDelete('cascade');
            $table->integer('order')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_pages');
    }
};
