<?php

namespace App\Http\Controllers;

use App\Exports\ReportExport;
use Inertia\Inertia;
use App\Models\Answer;
use App\Models\Survey;
use App\Models\Biodata;
use App\Models\Province;
use App\Models\City;
use App\Models\Regency;
use App\Models\Response;
use App\Models\QuestionPage;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ResponseController extends Controller
{
    public function index(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey = Survey::findOrFail($id);
        $response = Response::where('survey_id', $id)->get();
        $project = DB::table('projects')->where('slug', $projectSlug)->get();
        $client = DB::table('clients')->where('slug', $clientSlug)->get();
        $totalRes = count($response);
        $provinces = Province::all();
        $cities = City::all();
        $regencies = Regency::all();
        $provinceTargets = json_decode($survey->province_targets, true);
        
        return Inertia::render( 
            'Client/Projects/Surveys/ListResponse',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'totalres' => $totalRes,
                'provinces' => $provinces,
                'response' => collect($response)->map(function ($res) {
                    return [
                        'id' => $res->id,
                        'user_id' => $res->user_id,
                        'survey_id' => $res->survey_id,
                        'user' => $res->user,
                        'role' =>$res->user->currentTeam,
                        'status' => $res->status,
                        'biodata' => $res->user->biodata,
                        'start'=>$res->created_at->format('H:i:s d-m-Y'),
                        'submit'=>$res->updated_at->format('H:i:s d-m-Y')
                    ];
                }),
                'province_targets' => $provinceTargets,
                'cities' => $cities,
                'regencies' => $regencies,
            ]
        );
    }
    public function report(Survey $surveyModel, $clientSlug, $projectSlug, $surveyId, $responseId)
    {
        $survey = Survey::findOrFail($surveyId);
        $response = Response::with('user')->where('survey_id', $surveyId)->findOrFail($responseId);
        $project = DB::table('projects')->where('slug', $projectSlug)->get();
        $client = DB::table('clients')->where('slug', $clientSlug)->get();
        $answers = Answer::where('response_id', $responseId)->get();
        $bio = $response->user->biodata;
        $page = QuestionPage::where('survey_id', $surveyId)->get();
        // Prepare data to pass to the view
        $formattedPage = $page->map(function ($p) {
            return [
                'id' => $p->id,
                'page_name' => $p->page_name,
                'survey_id' => $p->survey_id,
                'question' => $p->question->map(function ($q) {
                    return [
                        'id' => $q->id,
                        'question_text' => $q->question_text,
                        'question_type_id' => $q->question_type_id,
                        'survey_id' => $q->survey_id,
                        'order' => $q->order,
                        'required' => $q->required,
                        'choice' => $q->choice,
                        'answer' => $q->answer
                    ];
                }),
            ];
        });
        return Inertia::render(
            'Client/Projects/Surveys/Report/ReportSurvey',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'page' => $formattedPage,
                'responses' => $response,
                'mulai' => $response->created_at->format('H:i:s d-m-Y'),
                'submit' => $response->updated_at->format('H:i:s d-m-Y'),
                'answer' => $answers,
                'biodata' => $bio,
            ]
        );
    }
    public function allreport($clientSlug, $projectSlug, $surveyId) {
        $survey = Survey::findOrFail($surveyId);
        $response = Response::with('user')->where('survey_id', $surveyId)->get();
        $project = DB::table('projects')->where('slug', $projectSlug)->get();
        $client = DB::table('clients')->where('slug', $clientSlug)->get();
        $page = QuestionPage::where('survey_id', $surveyId)->get();
        // Prepare data to pass to the view
        $formattedPage = $page->map(function ($p) {
            return [
                'id' => $p->id,
                'page_name' => $p->page_name,
                'survey_id' => $p->survey_id,
                'question' => $p->question->map(function ($q) {
                    return [
                        'id' => $q->id,
                        'question_text' => $q->question_text,
                        'question_type_id' => $q->question_type_id,
                        'survey_id' => $q->survey_id,
                        'order' => $q->order,
                        'required' => $q->required,
                        'choice' => $q->choice,
                        'answer' => $q->answer
                    ];
                }),
            ];
        });
        return Inertia::render(
            'Client/Projects/Surveys/Report/AllReport',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'page' => $formattedPage,
                'responses' => $response,
            ]
        );
    }
    public function export($clientSlug, $projectSlug, $surveyId){
        $survey = Survey::where('id', $surveyId)->first();
        return (new ReportExport($surveyId, $survey->title, $survey->question, $survey->response))->download('Survey '.$survey->title.'.xlsx', \Maatwebsite\Excel\Excel::XLSX, ['Content-Type' => 'xlsx']);
    }
}
