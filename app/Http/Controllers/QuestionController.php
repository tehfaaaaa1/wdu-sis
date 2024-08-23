<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuestionChoice;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function question(Survey $survey, $clientSlug, $projectSlug, $id)
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
            'Client/Projects/Surveys/AddQuestions',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
            ]
        );
    }

    public function store(Request $request, $clientSlug, $projectSlug, $id)
    {
        // $surveyid = Survey::where('id', $id);

        $allRequest =$request->all();
        $allData = $allRequest['data'];
        $idSurvey = $request['survey'];
        $clientSlug = $request['client_slug'];
        $projectSlug = $request['project_slug'];
        foreach ($allData as $data){
            $soal = $data['soal'];
            $type = $data['types'];
            $question_type = null;
            $req = false;
            $tipe = null;
            foreach($type as $Typee){
                if($Typee === "Text"){
                    $question_type = 1;
                    $req = true;
                } elseif($Typee === 'Radio'){
                    $question_type = 2;
                    $tipe = $data['radios'];
                }
            }
        // dd($question_type);
            Question::create([
                'question_text' => $soal,
                'survey_id' => $idSurvey,
                'question_type_id' => $question_type,
                'order' => random_int(1, 10000),
                'required' => $req 
            ]);

            if($tipe !== [] || $tipe !== null || $tipe !== ''){
                foreach($tipe as $choice){
                    $value = $choice['pilih'];

                    QuestionChoice::Create([
                        'value' => $value, 
                        'question_id' => $data['id'], 
                        'order' => random_int(1, 10000),
                    ]);
                }
            }

        }   

        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('success', 'Question add successfully.');
    }
}
