<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('teams')->insert(
            [
            'name' => 'Default User',
            'personal_team' => 1,
            'user_id' => 1, 
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('teams')->insert(
            [
            'name' => 'Enumerator',
            'personal_team' => 1,
            'user_id' => 1, 
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('teams')->insert(
            [
            'name' => 'Koordinator Lapangan',
            'personal_team' => 1,
            'user_id' => 1, 
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('teams')->insert(
            [
            'name' => 'Pic WDU',
            'personal_team' => 1,
            'user_id' => 1, 
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
