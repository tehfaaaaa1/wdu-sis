<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->withPersonalTeam()->create();

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
            'name' => 'Klien',
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

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin123',
            'usertype' => 'superadmin',
        ]);
    }
}
