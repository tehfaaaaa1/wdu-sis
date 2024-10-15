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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('subject')->nullable();
            $table->foreignId('sender_id')->nullable()->constrained(
                table: 'senders',
                indexName: 'campaigns_sender_id',
            )->nullOnDelete();
            $table->foreignId('recipient_id')->nullable()->constrained(
                table: 'recipients',
                indexName: 'campaigns_recipient_id',
            )->nullOnDelete();
            $table->string('content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
