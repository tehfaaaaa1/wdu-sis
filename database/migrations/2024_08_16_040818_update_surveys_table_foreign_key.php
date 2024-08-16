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
        Schema::table('surveys', function (Blueprint $table) {
            // Drop the existing foreign key constraint
            $table->dropForeign(['project_id']);
            
            // Add the foreign key constraint with cascading deletes
            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->onDelete('cascade'); // This will automatically delete surveys when a project is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('surveys', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['project_id']);
            
            // Add the original foreign key constraint without cascading delete
            $table->foreign('project_id')
                ->references('id')
                ->on('projects');
        });
    }
};
