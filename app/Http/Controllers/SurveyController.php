<?php

namespace App\Http\Controllers;

use App\Events\FormClosed;
use App\Models\Flow;
use App\Models\QuestionPage;
use URL;
use App\Models\City;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Answer;
use App\Models\Client;
use App\Models\Survey;
use App\Models\Biodata;
use App\Models\Project;
use App\Models\Regency;
use App\Models\Province;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\raw;
use App\Models\QuestionChoice;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Database\Eloquent\Relations\BelongsTo;
// use DB;
class SurveyController extends Controller
{
    public function index(Project $project, $clientSlug, $projectSlug)
    {
        $surveyall = Project::where('slug', $projectSlug)->firstOrFail();
        $projectall = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = Client::where('slug', $clientSlug)->get();
        $s = $surveyall->survey;
    
        $user = Auth::user();
    
        $userTarget = Response::select('survey_id', DB::raw('count(*) as submissions'))
            ->groupBy('survey_id')
            ->get()
            ->mapWithKeys(function ($response) {
                return [$response->survey_id => $response->submissions];
            });
    
        $response = Response::where('user_id', $user->id)->get();
        $provinces = Province::all();
        $cities = City::all();
        $regencies = Regency::all();

        return Inertia::render(
            'Client/Projects/Surveys/ListSurveys',
            [
                'surveys' => collect($s)->map(function ($survey) {

                    $provinceTargets = json_decode($survey->province_targets, true);
    
                    return [
                        'id' => $survey->id,
                        'title' => $survey->title,
                        'desc' => $survey->desc,
                        'project_id' => $survey->project_id,
                        'created_at' => $survey->created_at->format('j F Y H:i:s'),
                        'updated_at' => $survey->updated_at->format('j F Y H:i:s'),
                        'response' => $survey->response,
                        'status' => $survey->status,
                        'province_targets' => $provinceTargets
                    ];
                }),
                'projects' => $projectall,
                'clients' => $client,
                'user' => $user,
                'userTarget' => $userTarget,
                'response' => $response,
                'provinces' => $provinces,
                'cities' => $cities,
                'regencies' => $regencies,
            ]
        );
    }
    

    public function create(Project $project, $clientSlug, $projectSlug)
    {
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();

        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();

        $provinces = Province::all();
        return Inertia::render(
            'Client/Projects/Surveys/CreateSurveys',
            [
                'projects' => $project,
                'clients' => $client,
                'provinces' => $provinces,
            ]
        );
    }

    public function store(Request $request, $clientSlug, $projectSlug)
    {
        $id = $request->project_id;
    
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'desc' => ['required', 'string'],
            'project_id' => ['required', 'exists:projects,id'],
            'province_targets' => ['required', 'array'],
            'province_targets.*.province_id' => ['required', 'exists:provinces,id'],
            'province_targets.*.target_response' => ['required', 'integer'],
            'province_targets.*.cities' => ['nullable', 'array'],
            'province_targets.*.regencies' => ['nullable','array'],
        ]);
    
        foreach ($validatedData['province_targets'] as &$province) {
            $province['province_name'] = Province::find($province['province_id'])->name;
    
            $province['cities'] = array_filter($province['cities'], function ($city) {
                return isset($city['city_id']) && !empty($city['target_response_city']);
            });
    
            $province['regencies'] = array_filter($province['regencies'], function ($regency) {
                return isset($regency['regency_id']) && !empty($regency['target_response_regency']);
            });
        }
    
        $filteredProvinceTargets = array_filter($validatedData['province_targets'], function ($province) {
            return !empty($province['cities']) || !empty($province['regencies']);
        });
    
        Survey::create([
            'title' => $request->title,
            'desc' => $request->desc,
            'slug' => Str::slug($request->title.now()),
            'province_targets' => json_encode($request->province_targets),
            'project_id' => $validatedData['project_id'], 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    
        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Survey created successfully.');
    }
    public function location(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $surveyall = Project::where('slug', $projectSlug)->firstOrFail();
        $projectall = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = Client::where('slug', $clientSlug)->get();
        $s = $surveyall->survey;
    
        $user = Auth::user();
    
        $userTarget = Response::select('survey_id', DB::raw('count(*) as submissions'))
            ->groupBy('survey_id')
            ->get()
            ->mapWithKeys(function ($response) {
                return [$response->survey_id => $response->submissions];
            });
    
        $response = Response::where('user_id', $user->id)->get();
        $provinces = Province::all();
        $cities = City::all();
        $regencies = Regency::all();
        
        return Inertia::render(
            'Client/Projects/Surveys/LocationSurveys',
            [
                'surveys' => collect($s)->map(function ($survey) {

                    $provinceTargets = json_decode($survey->province_targets, true);
    
                    return [
                        'id' => $survey->id,
                        'title' => $survey->title,
                        'desc' => $survey->desc,
                        'project_id' => $survey->project_id,
                        'created_at' => $survey->created_at->format('j F Y H:i:s'),
                        'updated_at' => $survey->updated_at->format('j F Y H:i:s'),
                        'response' => $survey->response,
                        'status' => $survey->status,
                        'province_targets' => $provinceTargets
                    ];
                }),
                'projects' => $projectall,
                'clients' => $client,
                'user' => $user,
                'userTarget' => $userTarget,
                'response' => $response,
                'provinces' => $provinces,
                'cities' => $cities,
                'regencies' => $regencies,
                'currentSurveyId' => (int) $id,
            ]
        );
    }
    
    public function edit(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();

        $provinces = Province::all();
        // dump($survey);
        return Inertia::render(
            'Client/Projects/Surveys/EditSurveys',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'provinces' => $provinces,
            ]
        );
    }

    public function update(Request $request, $clientSlug, $projectSlug, $id)
    {
        $project_id = $request->project_id;
        $clientSlug = $request->client_slug;
        $projectSlug = $request->project_slug;

        $survey = Survey::findOrFail($id);

        $request->validate([
            'title' => 'required|max:255',
            'desc' => 'required',
            'target_response' => 'required',
            'province_id' => 'required|exists:provinces,id',
            'city_id' => 'nullable|exists:cities,id',
            'regency_id' => 'nullable|exists:regencies,id',

        ]);
        Survey::where('id', $survey['id'])->update([
            'title' => $request->title,
            'desc' => $request->desc,
            'target_response' => $request->target_response,
            'project_id' => $project_id,
            'province_id' => $request->province_id,
            'city_id' => $request->city_id,
            'regency_id' => $request->regency_id,
            'updated_at' => now()
        ]);
        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Update successfully.');
    }

    public function destroy($clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();

        $survey->delete();

        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Survey deleted successfully.');
    }

    public function statusChange($clientSlug, $projectSlug, $id, Request $request)
    {
        $status = $request->surveyStatus;
        $id = $request->surveyId;
        // $update = Survey::where('id', $id)->update($status == 0 ? ['status' => 1] : ['status' => 0]);
        $update = Survey::firstOrCreate(['id'=>$id]);
        $update->status = $status == 0 ? 1 : 0;
        // dd($status);
        $update->save();
        // dd($update->id);
        // FormClosed::dispatch($update);
        broadcast(new FormClosed($update));
        return back()->with('success', 'change Status');
    }
}
