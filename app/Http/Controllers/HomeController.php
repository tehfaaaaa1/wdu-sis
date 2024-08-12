<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use illuminate\Support\Facades\Auth;


class HomeController extends Controller
{
    public function adminpanel()
    {
        if(Auth::user()->usertype == 'admin')
        {
            return view('dashboard.admin');
        }
        else
        {
            return redirect()->route('dashboard'); 
        }
    }
}
