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
    public function index(Project $project, $slug, Survey $survey, $id = null){
        $project =  Project::where('slug',$slug)->firstOrFail();
        $survey = DB::table('projects')
        ->where('slug', $slug)
        ->get();
        // dump($survey);
        return Inertia::render('Projects/Surveys/ListSurveys',[
            'surveys' => $project->survey,
            'projects' => $survey,
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

    public function edit(Survey $survey, $id) {
        $survey = Survey::findOrFail($id);
        return Inertia::render('Projects/Surveys/EditSurveys', [
            'surveys' =>[
            'id' => $survey->id,
            'title' => $survey->title,
            'desc' => $survey->desc,
            'updated_at'=>$survey->updated_at,
            ]
        ]);
    }
    public function submission(Survey $survey, $id) {
        $survey = Survey::findOrFail($id);

        return Inertia::render('Projects/Surveys/SubmissionSurvey', [
            'surveys' =>[
            'id' => $survey->id,
            'title' => $survey->title,
            'desc' => $survey->desc,
            // 'updated_at'=>$survey->updated_at,
            ]
        ]);
    }

    public function update(Request $request, $id){
        // dump($id);
        $request->validate([
            'title' => 'required|max:255',
            'desc' => 'required',
          ]);
          Survey::where('id', $id)->update([
            'title' => $request->title,
            'desc' => $request->desc,
            'updated_at' => now()
          ]);
          return redirect()->route('surveys')->with('success','Update successfully.');
    }

    public function destroy($id){
        // dump($id);
        Survey::destroy($id);
        return redirect()->route('surveys')->with('success','Update successfully.');
    }
    
}
