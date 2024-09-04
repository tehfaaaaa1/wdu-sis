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
    public function manualSave(Request $request, $clientSlug, $projectSlug, $id) {
        // Validate the incoming request data
        // dd($request['data']);
        $validatedData = $request->validate([
            'data' => 'required|array',
            'data.*.soal' => 'required|string|max:255',
            'data.*.types' => 'required|array',
            'data.*.required' => 'required|boolean'
            // Add additional validation rules for the questions
        ]);

        $survey = Survey::findOrFail($request->survey);
        // Save or update the questions
        foreach ($validatedData['data'] as $questionData) {
            // dd($questionData['required']);
            $question_type = null;
            foreach($questionData['types'] as $type){
                switch ($type) {
                    case 'Text':
                        $question_type = 1;
                        $tipe = null;
                        break;
                    case 'Radio':
                        $question_type = 2;
                        break;
                    case 'Checkbox':
                        $question_type = 3;
                        break;
                    default:
                        break;
                }
            }
            Question::updateOrCreate(
                ['id' => $questionData['id'] ?? null, 'survey_id' => $survey->id,'required' => $questionData['required'],'order'=> random_int(1,10000) ,'question_text' => $questionData['soal'], 'question_type_id' => $question_type],
                $questionData
            );
        }
        // Additional logic for final submission, such as notifications or marking survey as complete
        return response()->json(['status' => 'success']);
    }
    
    public function question(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $question = DB::table('questions')->where('survey_id', $id)->get();

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
                'listquestions' => $question,

            ]
        );
    }

    public function store(Request $request, $clientSlug, $projectSlug, $id)
    {
        // $surveyid = Survey::where('id', $id);
        $allRequest = $request->all();
        $allData = $allRequest['data'];
        $idSurvey = $request['survey'];
        $clientSlug = $request['client_slug'];
        $projectSlug = $request['project_slug'];
        // dd($allData);
        foreach ($allData as $data) {
            dd($data);
            $soal = $data['soal'];
            $type = $data['types'];
            $question_type = null;
            $req = $data['required'];
            $tipe = null;
            if ($soal !== null && $type !== []) {   
                foreach ($type as $Typee) {
                    switch ($Typee) {
                        case 'Text':
                            $question_type = 1;
                            $tipe = null;
                            break;
                        case 'Radio':
                            $question_type = 2;
                            $tipe = $data['radios'];
                            if (count($tipe) < 2) {
                                abort(403, "Isilah Minimal 2 Pilihan !!");
                            }
                            break;
                        case 'Checkbox':
                            $question_type = 3;
                            $tipe = $data['checkbox'];
                            if (count($tipe) < 2) {
                                abort(403, "Isilah Minimal 2 Pilihan !!");
                            }
                            break;
                        default:
                            break;
                    }
                }
            } else {
                abort(403, "Belum Mengisi Soal dan Memilih Tipe Soal");
            }

            $newQuestion = new Question;
            $newQuestion->question_text = $soal;
            $newQuestion->survey_id = $idSurvey;
            $newQuestion->question_type_id = $question_type;
            $newQuestion->order = random_int(1, 10000);
            $newQuestion->required = $req;
            $newQuestion->save();
            if ($tipe !== null) {
                foreach ($tipe as $choice) {
                    $value = $choice['pilih'];
                    QuestionChoice::Create([
                        'value' => $value,
                        'question_id' => $newQuestion->id,
                        'order' => random_int(1, 10000),
                    ]);
                }
            } else {
            }
        }

        // session()->flash('question_added', 'Questions added!');
        return redirect()->route('listsurvey', [$clientSlug, $projectSlug])->with('question_added', 'Question added successfully.');
    }
}
