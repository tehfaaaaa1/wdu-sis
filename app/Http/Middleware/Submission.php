<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use PHPUnit\Framework\Constraint\IsEmpty;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Response as Res;

class Submission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $surveyId= $request->route('id');
        $response = Res::where('user_id', Auth::user()->id)->where('survey_id', $surveyId)->first();
        if($response != null){
            abort(403, 'Anda Sudah Mengisi Kuisioner Ini');
        }
        return $next($request);
    }
}
