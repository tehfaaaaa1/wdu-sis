<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use App\Models\Survey;
use Illuminate\Http\Request;
// use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SurveyController extends Controller
{
    public function index(Project $project, $slug, Survey $survey){
        $project =  Project::where('slug',$slug)->firstOrFail();
        $survey = Survey::first();
        return Inertia::render('Projects/Surveys/ListSurveys',[
            'surveys' => $project->survey,
            'projects' => $survey->project,
        ] 
        );
    }

    public function create(Project $project, $slug){
        $project =  Project::where('slug',$slug)->firstOrFail();
        return inertia::render('Projects/Surveys/CreateSurveys');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'desc' => 'required',
        ]);
    
        Survey::create([
            'title' => $request->title,
            'desc' => $request->desc,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    
        return redirect()->route('listsurvey', $request->project_id)->with('success', 'Survey created successfully.');
    }

    public function edit(Survey $survey, $id) {
        dump($survey->title);   
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

    public function destroy( $id){
        // dump($id);
        Survey::destroy($id);
        return redirect()->route('surveys')->with('success','Update successfully.');
    }
    
}
