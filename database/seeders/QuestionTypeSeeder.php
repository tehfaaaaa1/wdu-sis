<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class QuestionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('question_types')->insert([
            // ['question_type' => 'Text'],
            // ['question_type' => 'Radio'],
            // ['question_type' => 'Checkbox'],
            ['question_type' => 'Image'],
            ['question_type' => 'Paragraph'],]
        );
    }
}
