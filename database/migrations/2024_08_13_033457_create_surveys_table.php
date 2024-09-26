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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('desc');
            $table->string('slug');
            $table->foreignId('project_id')->constrained(
                table: 'projects',
                indexName: 'surveys_project_id',
            )->onDelete('cascade');
            $table->integer('total_response')->nullable();
            $table->integer('target_response')->default(0);
            $table->boolean('status')->default(0);
            $table->json('province_targets')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
