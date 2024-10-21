<?php

namespace App\Http\Controllers;

use App\Imports\ContactsImport;
use Hash;
use App\Models\Team;
use App\Models\User;
use Inertia\Inertia;
use App\Mail\TestMail;
use App\Models\Survey;
use App\Models\Response;
use Illuminate\Http\Request;
use illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class HomeController extends Controller
{
    public function adminpanel()
    {
        if (Auth::user()->usertype == 'admin' || Auth::user()->usertype == 'superadmin') {
            return view('dashboard.admin');
        } else {
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
    public function create()
    {
        $teams = Team::all();
        return Inertia::render('CreateUser', [
            'teams' => $teams,
        ]);
    }
    public function coba(Request $request)
    {
        $email = $request->route('email');
        $isi2 = $request->route('password');
        $cSlug = $request->route('Client');
        $pSlug = $request->route('Project');
        $sId = $request->route('Survey');
        $user = User::where('email', $email)->first();
        if ($user) {
            Auth::login($user);
            if (Auth::user()->biodata_id == null) {
                return redirect()->route('biodata', [$cSlug, $pSlug, $sId]);
            } else if (Auth::user()->biodata_id != null) {
                return redirect()->route('edit_bio', [$cSlug, $pSlug, $sId, Auth::user()->id]);
            }
        } else {
            return 'user Not Found';
        }
    }
 
}
