<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Survey;
use App\Models\Response;
use App\Models\Province;
use Illuminate\Support\Facades\DB;

class ResponseController extends Controller
{
    public function index($clientSlug, $projectSlug, $id)
    {
        $survey = Survey::findOrFail($id);
        $response = Response::where('survey_id', $id)->get();
        $project = DB::table('projects')->where('slug', $projectSlug)->first(); 
        $client = DB::table('clients')->where('slug', $clientSlug)->first(); 
        $totalRes = $response->count(); 
        $provinces = Province::all();

        return Inertia::render(
            'Client/Projects/Surveys/ListResponse',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'totalres' => $totalRes,
                'provinces' => $provinces,
                'response' => $response->map(function ($res) {
                    return [
                        'id' => $res->id,
                        'user_id' => $res->user_id,
                        'survey_id' => $res->survey_id,
                        'user' => $res->user,
                        'status' => $res->status,
                        'biodata' => $res->user->biodata
                    ];
                }),
                'province_targets' => json_encode($request->province_targets)
            ]
        );
    }
}
