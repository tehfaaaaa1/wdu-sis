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
        Schema::create('contact_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('email_contact_id')->constrained(
                table: 'email_contacts',
                indexName: 'contact_recipients_email_contact_id',
            )->onDelete('cascade');
            $table->foreignId('recipient_id')->constrained(
                table: 'recipients',
                indexName: 'contact_recipients_recipient_id',
            )->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_recipients');
    }
};
