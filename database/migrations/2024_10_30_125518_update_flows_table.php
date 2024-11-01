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
        Schema::table('flows', function (Blueprint $table) {
            $table->foreignId('question_id')->nullable()->change();
            $table->foreignId('question_choice_id')->nullable()->change();
            $table->foreignId('next_page_id')->after('question_page_id')->nullable()->constrained(
                table: 'question_pages',
                indexName: 'flows_next_page_id',
            )->onDelete('cascade');
            $table->renameColumn('question_page_id', 'current_page_id');
            $table->dropColumn('next_page_order');
            $table->dropColumn('current_page_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
