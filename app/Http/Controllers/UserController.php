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

    public function create()
    {
        return Inertia::render('Users/CreateUsers');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'usertype' => 'required',
            'password' => 'required|string|confirmed',
        ]);
        User::create($request->all());
        return redirect()->route('users')
            ->with('success', 'Post created successfully.');
    }

    public function edit(User $user)
    {
        // dump($survey->id);   
        return Inertia::render('Users/EditUsers', [
            'users' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'usertype' => $user->usertype,
                'password' => $user->password,
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        // dump($id);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                Rule::unique('users')->ignore($id),
            ],
            'usertype' => 'required',
            'password' => 'required|string|confirmed',
        ]);
        User::where('id', $id)->update([
            'id' => $request->id,
            'name' => $request->name,
            'email' => $request->email,
            'usertype' => $request->usertype,
            'password' => $request->password,
        ]);
        return redirect()->route('users')->with('success', 'Update successfully.');
    }

    public function destroy($id)
    {
        User::destroy($id);
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

}
