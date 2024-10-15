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
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropColumn('sender');
            $table->foreignId('sender_id')->after('subject')->nullable()->constrained(
                table: 'senders',
                indexName: 'campaigns_sender_id',
            )->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropForeign('campaigns_sender_id');
            $table->dropColumn('sender_id');
        });
    }
};
