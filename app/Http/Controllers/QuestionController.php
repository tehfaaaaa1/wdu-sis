<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuestionChoice;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Unique;
use Inertia\Inertia;

class QuestionController extends Controller
{

    public function question(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $question = Question::where('survey_id', $id)->get();
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();
        $last = Question::all()->last();
        $lastId = $last->id;
        $c_last = QuestionChoice::all()->last();
        $c_lastId = $c_last->id;
        return Inertia::render(
            'Client/Projects/Surveys/AddQuestions',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'listquestions' => $question,
                'choice' => collect($question)->map(function ($q) {
                    return ['choice' => $q->choice];
                }),
                'lastId' => $lastId,
                'c_lastId' => $c_lastId
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
        dd($allData);
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

    public function manualSave(Request $request, $clientSlug, $projectSlug, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'data' => 'required|array',
            'data.*.soal' => 'required|string|max:255',
            'data.*.types' => 'required|array',
            'data.*.required' => 'required|boolean',
            'data.*.radios' => 'array',
            'data.*.checkbox' => 'array',
            'data.*.id' => 'required',
            'data.*.order' => 'integer',
        ]);

        $survey = Survey::findOrFail($request->survey);

        // Retrieve existing questions for the survey
        $existingQuestions = Question::where('survey_id', $survey->id)->get()->keyBy('id');

        // Track the question IDs that are being processed
        $processedQuestionIds = [];

        // Save or update the questions
        foreach ($validatedData['data'] as $questionData) {
            $question_type = null;
            $tipe = null;

            foreach ($questionData['types'] as $type) {
                switch ($type) {
                    case 'Text':
                        $question_type = 1;
                        $tipe = null;
                        break;
                    case 'Radio':
                        $question_type = 2;
                        $tipe = $questionData['radios'];
                        if (count($tipe) < 2) {
                            abort(403, "Isilah Minimal 2 Pilihan !!");
                        }
                        break;
                    case 'Checkbox':
                        $question_type = 3;
                        $tipe = $questionData['checkbox'];
                        if (count($tipe) < 2) {
                            abort(403, "Isilah Minimal 2 Pilihan !!");
                        }
                        break;
                    default:
                        break;
                }
            }

            // Save or update the question
            $save_question = Question::firstOrNew(
                ['id' => $questionData['id'], 'survey_id' => $survey->id]
            );
            $save_question->required = $questionData['required'];
            $save_question->order = $questionData['order'] ?? random_int(1, 10000);
            $save_question->question_text = $questionData['soal'];
            $save_question->question_type_id = $question_type;
            $save_question->save();

            // Add the question ID to the processed list
            $processedQuestionIds[] = $save_question->id;

            // Save or update the question choices
            if ($tipe != null && !empty($tipe)) {
                foreach ($tipe as $choice) {
                    $value = $choice['pilih'];
                    $c_order = $choice['c_order'] ?? random_int(1, 10000);
                    $new = new QuestionChoice;
                    $newId = $new->id;
                    $save_qChoice = QuestionChoice::firstOrNew(['id' => $choice['cId'] ?? $newId]);
                    $save_qChoice->value = $value;
                    $save_qChoice->question_id = $save_question->id;
                    $save_qChoice->order = $c_order;
                    $save_qChoice->save();
                }
            }
        }

        // Delete the questions that were not processed
        $existingQuestions->except($processedQuestionIds)->each(function ($question) {
            $question->delete();
        });

        // Additional logic for final submission, such as notifications or marking survey as complete
        return response()->json(['status' => 'success']);
    }
}
