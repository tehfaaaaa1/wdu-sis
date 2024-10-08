<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use illuminate\Support\Facades\Auth;

class ableCUDdSurvey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::user()->current_team_id == 1 && Auth::user()->usertype == 'user')  {
            abort(403,  Auth::user()->currentTeam->name.' Tidak Diizinkan');
            // return redirect()->back()->withErrors(Auth::user()->usertype, ' Dilarang Masuk');
        }
        return $next($request);
    }
}
