<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class QuestionLogicTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('question_logic_types')->insert(
            [
                ['logic_type' => 'Always Display'],
                ['logic_type' => 'Display If Condition is Met'],
                ['logic_type' => 'Hide If Condition is Met'],
            ]
        );
    }
}
