<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Team; 
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

    public function adminIndex()
    {
        return Inertia::render('Dashboard/AdminUsers', [
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
        // Fetch teams for the view
        $teams = Team::all();
        return Inertia::render('Users/CreateUsers', [
            'teams' => $teams,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed',
            'usertype' => 'required|string',
            'team_id' => 'nullable|exists:teams,id', 
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'usertype' => $request->usertype,
            'client_id' => 1,
        ]);

        // Assign team if provided
        if ($request->filled('team_id')) {
            $team = Team::find($request->team_id);
            if ($team) {
                $user->currentTeam()->associate($team);
                $user->save();
            }
        }

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        $teams = Team::all(); // Fetch all teams for the view

        return Inertia::render('Users/EditUsers', [
            'user' => $user,
            'teams' => $teams, // Pass teams to the view
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'usertype' => 'required|string',
            'team_id' => 'nullable|exists:teams,id',
        ]);
    
        $user = User::findOrFail($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'usertype' => $request->usertype,
        ]);

        // Assign team if provided
        if ($request->filled('team_id')) {
            $team = Team::find($request->team_id);
            if ($team) {
                $user->currentTeam()->associate($team);
                $user->save();
            }
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy($id)
    {
        User::destroy($id);
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
