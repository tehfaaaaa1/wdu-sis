<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Survey;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use URL;
// use Illuminate\Database\Eloquent\Relations\BelongsTo;
// use DB;
class SurveyController extends Controller
{
    public function index(Project $project, $slug){
        $surveyall =  Project::where('slug',$slug)->firstOrFail();
        $project = DB::table('projects')
        ->where('slug', $slug)
        ->get();
        $s = $surveyall->survey;
        // dump($survey);
        return Inertia::render('Projects/Surveys/ListSurveys',[
            'surveys' => collect($s)->map(function ($survey){
                return[
                    'id' => $survey->id,
                    'title' => $survey->title,
                    'desc' => $survey->desc,
                    'project_id' => $survey->project_id,
                    'created_at' => $survey->created_at->format('j F Y H:i:s'),
                    'updated_at' => $survey->updated_at->format('j F Y H:i:s'),

                ];
            }), 
            'projects' => $project,
        ] 
        );
    }

    public function create(Project $project, $slug){
        $survey = DB::table('projects')
        ->where('slug', $slug)
        ->get();

        return Inertia::render('Projects/Surveys/CreateSurveys',[
            'projects' => $survey,
        ] 
        );
    }
    
    public function store(Request $request, $slug)
    {
        $id = $request->project_id;
        $slug = $request->slug;


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
    
        return redirect()->route('listsurvey', $slug)->with('success', 'Survey created successfully.');
    }

    public function edit(Survey $survey,$slug, $id) {
        $project =  Survey::findOrFail($id);
        $survey = DB::table('projects')
        ->where('slug', $slug)
        ->get();
        // dump($survey);
        return Inertia::render('Projects/Surveys/EditSurveys',[
            'surveys' => $project,
            'projects' => $survey,
        ] 
        );
    }
    public function submission(Survey $survey,$slug, $id) {
        $survey =  Survey::findOrFail($id);
        $project = DB::table('projects')
        ->where('slug', $slug)
        ->get();
        // dump($survey);
        return Inertia::render('Projects/Surveys/SubmissionSurvey',[
            'surveys' => $survey,
            'projects' => $project,
        ] 
        );
    }

    public function update(Request $request, $id){
        $survey = Survey::findOrFail($id);
        $request->validate([
            'title' => 'required|max:255',
            'desc' => 'required',
          ]);
          Survey::where('id', $survey['id'])->update([
            'title' => $request->title,
            'desc' => $request->desc,
            'project_id' => $request->project_id,
            'updated_at' => now()
          ]);
            return redirect()->route('listsurvey', [$request->slug])->with('success','Update successfully.');
    }

    public function destroy($id, $slug){
        // dump($id);
        
        Survey::destroy($id);
        return redirect()->route('listsurvey', $slug)->with('success','Update successfully.');
    }
    
}
