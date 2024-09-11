<?php

namespace App\Http\Controllers;

use App\Models\QuestionPage;
use Inertia\Inertia;
use App\Models\Survey;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Models\QuestionChoice;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Unique;

class QuestionController extends Controller
{

    public function question(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $question = Question::where('survey_id', $id)->get();
        $page = QuestionPage::where('survey_id', $id)->get();
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
                'page' => $page,
                'listquestions' => collect($page)->map(function ($p) {
                    return [
                        'listquestion' => $p->question,
                        'choice' => collect($p->question)->map(function ($q) {
                            return ['choice' => $q->choice];
                        }),

                    ];
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

    public function manualSave(Request $request, $id, $clientSlug, $projectSlug)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'data' => 'required|array',
            'data.*.question' => 'required|array',
            'data.*.id' => 'nullable|numeric',
            'data.*.name' => 'required|string',
            'data.*.question.*.soal' => 'required|string|max:255',
            'data.*.question.*.types' => 'required|array',
            'data.*.question.*.required' => 'required|boolean',
            'data.*.question.*.choices' => 'array',
            'data.*.question.*.id' => 'nullable|numeric',
            'data.*.question.*.order' => 'nullable|integer',
        ]);
        // dd($validatedData);
        $survey = Survey::findOrFail($request->survey);

        // Save or update the questions

        // Retrieve existing questions for the page
        $existingPages = QuestionPage::where('survey_id', $survey->id)
            ->get()
            ->keyBy('id');

        // Track the question IDs that are being processed
        $processedPageIds = [];

        foreach ($validatedData['data'] as $pageData) {
            $newPage = new QuestionPage;
            $savePage = QuestionPage::firstOrNew(
                ['id' => $pageData['id'] ?? $newPage->id, 'survey_id' => $survey->id]
            );
            $savePage->page_name = $pageData['name'];
            $savePage->save();

            $processedPageIds[] = $savePage->id;

            // Retrieve existing questions for the page
            $existingQuestions = Question::where('question_page_id', $savePage->id)
                ->get()
                ->keyBy('id');

            // Track the question IDs that are being processed
            $processedQuestionIds = [];

            foreach ($pageData['question'] as $questionData) {
                $questionType = null;
                $choices = [];

                // Process the question types and handle choices
                foreach ($questionData['types'] as $type) {
                    switch ($type) {
                        case 'Text':
                            $questionType = 1;
                            $choices = []; // Clear any existing choices for Text type
                            break;
                        case 'Radio':
                        case 'Checkbox':
                            $questionType = $type === 'Radio' ? 2 : 3;
                            $choices = $questionData['choices'] ?? [];
                            if (count($choices) < 2) {
                                abort(403, "Isilah Minimal 2 Pilihan !!");
                            }
                            for($i = 0; $i<count($choices);$i++ ){
                                for($j = $i + 1;$j<count($choices);$j++){
                                    $intersect = array_intersect($choices[$i], $choices[$j]);
                                    if(!empty($intersect)){
                                        abort(403, 'ha');
                                    }
                                }
                            }
                            break;
                        default:
                            // Handle other types or do nothing
                            break;
                    }
                }
                // Save or update the question
                $saveQuestion = Question::firstOrNew(
                    ['id' => $questionData['id'] ?? null, 'survey_id' => $survey->id, 'question_page_id' => $savePage->id]
                );
                $saveQuestion->required = $questionData['required'];
                $saveQuestion->order = $questionData['order'] ?? random_int(1, 10000);
                $saveQuestion->question_text = $questionData['soal'];
                $saveQuestion->question_type_id = $questionType;
                $saveQuestion->save();

                $processedQuestionIds[] = $saveQuestion->id;

                // Save or update the question choices
                $existingQuestionChoices = QuestionChoice::where('question_id', $saveQuestion->id)->get()->keyBy('id');
                $processedChoiceIds = [];

                foreach ($choices as $choice) {
                    $saveChoice = QuestionChoice::firstOrNew(
                        ['id' => $choice['cId'] ?? null]
                    );
                    $saveChoice->value = $choice['pilih'];
                    $saveChoice->question_id = $saveQuestion->id;
                    $saveChoice->order = $choice['c_order'] ?? random_int(1, 10000);
                    $saveChoice->save();

                    $processedChoiceIds[] = $saveChoice->id;
                }

                // Delete any existing choices that were not processed
                $existingQuestionChoices->except($processedChoiceIds)->each(function ($choice) {
                    $choice->delete();
                });
            }

            // Delete any existing questions that were not processed
            $existingQuestions->except($processedQuestionIds)->each(function ($question) {
                $question->delete();
            });
        }

        $existingPages->except($processedPageIds)->each(function ($page) {
            $page->delete();
        });

        // Additional logic for final submission, such as notifications or marking survey as complete
        return redirect()->route('question_surveys', [$clientSlug, $projectSlug, $id])->with('success', 'Survey created successfully.');
    }
}
