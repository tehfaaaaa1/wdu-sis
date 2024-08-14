<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;
use illuminate\Support\Facades\Auth;


class HomeController extends Controller
{
    public function adminpanel()
    {
        if(Auth::user()->usertype == 'admin' || Auth::user()->usertype == 'superadmin')
        {
            return view('dashboard.admin');
        }
        else
        {
            return redirect()->route('dashboard'); 
        }
    }
    
    public function store(Request $request, Team $team)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'role' => ['required', 'string'],
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            return back()->withErrors(['email' => 'User with this email does not exist.']);
        }
    
        $user->usertype = $request->role === 'admin' ? 'admin' : 'user';
        
        $user->current_team_id = $team->id;
    
        $user->save();
    
        $team->users()->attach($user->id, ['role' => $request->role]);
    
        return back()->with('success', 'Team member added successfully.');
    }

}
