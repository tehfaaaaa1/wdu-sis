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
            'users' => User::all()->map(function ($user) {
                return [
                    'id'=>$user->id,
                    'name'=>$user->name,
                    'email'=>$user->email,
                    'password'=>$user->password,
                ];
            })
        ]);
    }
}
