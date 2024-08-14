<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Surveys/ListSurveys', [
            'surveys' => Survey::all()->map(function ($survey) {
                return [
                    'id'=>$survey->id,
                    'title'=>$survey->title,
                    'desc'=>$survey->desc,
                    'project_id'=>$survey->project_id   ,
                    'created_at'=>$survey->created_at->format('Y-m-d H:i:s'),
                    'updated_at'=>$survey->updated_at->format('Y-m-d H:i:s'),
                ];
                
            })
        ]);
    }
    
    public function store(Request $request, Survey $survey) {
        $request->validate([
            'title' => 'required|max:255',
            'desc' => 'required',
            'created_at' => now(),
            'updated_at' => now(),
          ]);
          Survey::create($request->all());
          return redirect()->route('surveys')
            ->with('success','Post created successfully.');
    }

    public function edit(Survey $survey) {
        // dump($survey->title);   
        return Inertia::render('Surveys/EditSurveys', [
            'surveys' =>[
            'id' => $survey->id,
            'title' => $survey->title,
            'desc' => $survey->desc,
            'updated_at'=>$survey->update_at,
            ]
        ]);
    }
    public function submission(Survey $survey, $id) {
        $survey = $survey::findOrFail($id);
        return Inertia::render('Surveys/SubmissionSurvey', [
            'surveys' =>[
            'id' => $survey->id,
            'title' => $survey->title,
            'desc' => $survey->desc,
            'updated_at'=>$survey->update_at,
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
