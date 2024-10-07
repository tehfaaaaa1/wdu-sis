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
        Schema::table('questions', function (Blueprint $table) {
            $table->string('logic_type')->nullable();
            $table->foreignId('question_choice_id')->nullable()->constrained(
                table: 'question_choices',
                indexName: 'question_question_choice_id',
            )->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
           $table->dropColumn('logic_type');
           $table->dropColumn('question_choice_id');
        });
    }
};
