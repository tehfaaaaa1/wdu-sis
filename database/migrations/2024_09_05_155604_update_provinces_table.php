<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProvincesTable extends Migration
{
    public function up()
    {
        Schema::table('provinces', function (Blueprint $table) {
            $table->integer('target_response')->default(0); 
        });
    }

    public function down()
    {
        Schema::table('provinces', function (Blueprint $table) {
            $table->dropColumn('target_response'); 
        });
    }
}