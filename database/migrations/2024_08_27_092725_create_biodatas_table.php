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
        Schema::create('biodatas', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('nama_responden', 255);
            $table->string('alamat', 255);
            $table->integer('no_hp', unsigned: true);
            $table->string('instansi', 20);
            $table->foreignId('user_id')->constrained(
                table: 'users',
                indexName: 'biodatas_user_id',
            )->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biodatas');
    }
};
