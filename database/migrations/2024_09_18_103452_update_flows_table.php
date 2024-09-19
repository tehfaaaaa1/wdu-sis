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
            $table->integer('next_page_order')->nullable();
            $table->dropForeign('flows_next_page_id');
            $table->dropColumn('next_page_id');
            $table->foreignId('survey_id')->nullable()->constrained(
                table: 'surveys',
                indexName: 'flows_survey_id',
            )->onDelete('cascade');
            $table->integer('current_page_order')->nullable();
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
