<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegenciesTable extends Migration
{
    public function up()
    {
        Schema::create('regencies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('province_id');
            $table->string('name');
            $table->timestamps();

            $table->index('province_id');
            $table->foreign('province_id')
                  ->references('id')->on('provinces')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('regencies', function (Blueprint $table) {
            $table->dropForeign(['province_id']);
        });

        Schema::dropIfExists('regencies');
    }
}
