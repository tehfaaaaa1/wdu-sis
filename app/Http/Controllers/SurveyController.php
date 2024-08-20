<?php

namespace App\Http\Controllers;

use URL;
use Inertia\Inertia;
use App\Models\Client;
use App\Models\Survey;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Eloquent\Relations\BelongsTo;
// use DB;
class SurveyController extends Controller
{
    public function index(Project $project,$clientSlug, $projectSlug)
    {
        $surveyall =  Project::where('slug', $projectSlug)->firstOrFail();
        $projectall = DB::table('projects')
        ->where('slug', $projectSlug)
        ->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();
        $s = $surveyall->survey;
        // dump($survey);
        return Inertia::render(
            'Client/Projects/Surveys/ListSurveys',
            [
                'surveys' => collect($s)->map(function ($survey) {
                    return [
                        'id' => $survey->id,
                        'title' => $survey->title,
                        'desc' => $survey->desc,
                        'project_id' => $survey->project_id,
                        'created_at' => $survey->created_at->format('j F Y H:i:s'),
                        'updated_at' => $survey->updated_at->format('j F Y H:i:s'),
                    ];
                }),
                'projects'=> $projectall,
                'clients' => $client,
            ]
        );
    }

    public function create(Project $project,$clientSlug, $projectSlug)
    {
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();

        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();
        return Inertia::render(
            'Client/Projects/Surveys/CreateSurveys',
            [
                'projects' => $project,
                'clients' => $client,
            ]
        );
    }

    public function store(Request $request,$clientSlug, $projectSlug)
    {
        $id = $request->project_id;
        $clientSlug = $request->client_slug;
        $projectSlug = $request->project_slug;


        $request->validate([
            'title' => 'required|max:255',
            'desc' => 'required',

        ]);

        Survey::create([
            'title' => $request->title,
            'desc' => $request->desc,
            'project_id' => $id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Survey created successfully.');
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
        // dump($survey);
        return Inertia::render(
            'Client/Projects/Surveys/EditSurveys',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
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
        ]);
        Survey::where('id', $survey['id'])->update([
            'title' => $request->title,
            'desc' => $request->desc,
            'project_id' => $project_id,
            'updated_at' => now()
        ]);
        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Update successfully.');
    }
    
    public function submission(Survey $survey, $slug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $project = DB::table('projects')
            ->where('slug', $slug)
            ->get();
        // dump($survey);
        return Inertia::render(
            'Projects/Surveys/SubmissionSurvey',
            [
                'surveys' => $survey,
                'projects' => $project,
            ]
        );
    }
    public function destroy($slug, $id)
    {
        $survey =  Survey::findOrFail($id);
        // $project = DB::table('projects')
        //     ->where('slug', $slug)
        //     ->get();

        $survey->delete();

        return redirect()->route('listsurvey', $slug)->with('success', 'Survey deleted successfully.');
    }
}
