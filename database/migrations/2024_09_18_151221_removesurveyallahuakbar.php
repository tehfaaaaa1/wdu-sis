<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('surveys', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign('surveys_province_id_foreign');

            // Drop the column
            $table->dropColumn('province_id');
        });
    }


    public function down()
    {
        Schema::table('surveys', function (Blueprint $table) {
            // Add the column back if rolling back
            $table->unsignedBigInteger('province_id')->nullable();

            // Add the foreign key constraint back if rolling back
            $table->foreign('province_id')->references('id')->on('provinces');
        });
    }
};
