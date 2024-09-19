<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::table('surveys', function (Blueprint $table) {
            $table->json('province_targets')->change();
        });
    }

    public function down()
    {
        Schema::table('surveys', function (Blueprint $table) {
            $table->text('province_targets')->change();
        });
    }
};
