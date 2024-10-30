<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flows', function (Blueprint $table) {
            $table->id(); // Primary Key with auto-increment

            $table->string('flow_name', 255);
            $table->foreignId('current_page_id')
                  ->constrained('question_pages')
                  ->cascadeOnDelete();
            $table->foreignId('next_page_id')
                  ->nullable()
                  ->constrained('question_pages')
                  ->cascadeOnDelete();
            $table->foreignId('question_id')
                  ->nullable()
                  ->constrained('questions')
                  ->cascadeOnDelete();
            $table->foreignId('question_choice_id')
                  ->nullable()
                  ->constrained('question_choices')
                  ->cascadeOnDelete();
            $table->timestamps();
            $table->foreignId('survey_id')
                  ->nullable()
                  ->constrained('surveys')
                  ->cascadeOnDelete();
        });

        // Indexes
        Schema::table('flows', function (Blueprint $table) {
            $table->index('current_page_id', 'flows_question_page_id');
            $table->index('next_page_id', 'flows_next_page_id');
            $table->index('question_id', 'flows_questions_id');
            $table->index('question_choice_id', 'flows_question_choice_id');
            $table->index('survey_id', 'flows_survey_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flows');
    }
}
