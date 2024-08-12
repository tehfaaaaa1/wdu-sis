<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->withPersonalTeam()->create();

        User::factory()->withPersonalTeam()->create([
<<<<<<< HEAD
            'name' => 'Test User',
            'email' => 'test@example.com',
=======
            'name' => 'Enum',
            'email' => 'enum@gmail.com',
            'password' => 'enum1234',
            'usertype' => 'enum',
>>>>>>> f7d4836190d4a3a0cb6344051a14c0485303787d
        ]);
    }
}
