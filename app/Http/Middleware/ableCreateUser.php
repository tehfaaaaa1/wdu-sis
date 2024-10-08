<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ableCreateUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // return response($user);
        if(Auth::user()->usertype != 'superadmin' && Auth::user()->current_team_id != 4){
            abort(403, 'Tidak diizinkan masuk.');
            // return redirect()->back()->withErrors(Auxth::user()->usertype, ' Dilarang Masuk');    
        }
        return $next($request);
    }
}
