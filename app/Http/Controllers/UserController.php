<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Users', [
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


}
