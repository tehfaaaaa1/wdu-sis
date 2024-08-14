<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users', [
            'users' => User::with('currentTeam')->get()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'usertype' => $user->usertype,
                    'team' => $user->currentTeam ? $user->currentTeam->name : 'No Team',
                ];
            }),
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
    
        return redirect()->route('users.index')->with('status', 'User deleted successfully.');
    }

}


