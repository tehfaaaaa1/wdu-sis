<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Survey;
use App\Models\Biodata;
use App\Models\Response;
use Illuminate\Http\Request;
use App\Models\QuestionChoice;
use Illuminate\Support\Facades\DB;

class ResponseController extends Controller
{
    public function index(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $response = Response::where('survey_id', $id)->get();
        $project = DB::table('projects')->where('slug', $projectSlug)->get();
        $client = DB::table('clients')->where('slug', $clientSlug)->get();
        $totalRes = count($response);
        return Inertia::render( 
            'Client/Projects/Surveys/ListResponse',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'totalres' => $totalRes,
                'response' =>collect($response)->map(function ($res) {
                    return [
                        'id' => $res->id,
                        'user_id' => $res->user_id,
                        'survey_id' => $res->survey_id,
                        'user' => $res->user,
                        'status' => $res->status,
                        'biodata' => $res->user->biodata
                    ];

                })
            ]
        );
    }
}
