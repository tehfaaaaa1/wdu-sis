<?php

namespace App\Http\Controllers;

use App\Models\Flow;
use Inertia\Inertia;
use App\Models\Survey;
use App\Models\Question;
use App\Models\QuestionPage;
use Illuminate\Http\Request;
use App\Models\QuestionChoice;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Unique;
use Illuminate\Support\Facades\File;
use PhpParser\Node\Stmt\Break_;

use function PHPUnit\Framework\arrayHasKey;

class QuestionController extends Controller
{

    public function question(Survey $survey, $clientSlug, $projectSlug, $id)
    {
        $survey =  Survey::findOrFail($id);
        $question = Question::where('survey_id',  $id)->get();
        $page = QuestionPage::where('survey_id', $id)->get();
        $project = DB::table('projects')
        ->where('slug', $projectSlug)
        ->get();
        $surveyall = Survey::where('project_id', $project[0]->id)->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();
        // $last = Question::all()->last();
        // $lastId = $last->id;
        // $c_last = QuestionChoice::all()->last();
        // $c_lastId = $c_last->id;
        $flow = Flow::where('survey_id', $id)->get();
        foreach($flow as $f){
            $sa =$f->survey;
            $pa =$f->pages;
            $qa =$f->question;
            $ca =$f->choice;
            
        }
        return Inertia::render(
            'Client/Projects/Surveys/AddQuestions',
            [
                'surveys' => $survey,
                'projects' => $project,
                'clients' => $client,
                'page' => $page,
                'listquestions' => collect($page)->map(function ($p) {
                    return [
                        'listquestion' => $p->question->sortBy('order'),
                        'choice' => collect($p->question)->map(function ($q) {
                            return ['choice' => $q->choice];
                        }),
                    ];
                }),
                // 'lastId' => $lastId,
                // 'c_lastId' => $c_lastId,
                'flows'=> $flow,
                'surveyall' => $surveyall,
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
            // dd($data);
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
        // dd($request);
        $validatedData = $request->validate([
            'data' => 'required|array',
            'data.*.question' => 'required|array',
            'data.*.id' => 'nullable|numeric',
            'data.*.name' => 'required|string',
            'data.*.question.*.soal' => 'required',
            'data.*.question.*.types' => 'required|array',
            'data.*.question.*.required' => 'boolean',
            'data.*.question.*.choices' => 'array',
            'data.*.question.*.files' => 'array',
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

        foreach ($validatedData['data'] as $pgIndex => $pageData) {
            $savePage = QuestionPage::firstOrNew(
                ['id' => $pageData['id'] ?? null]
            );
            $savePage->survey_id = $survey['id'];
            $savePage->page_name = $pageData['name'];
            $savePage->order = $pgIndex+1;
            $savePage->save();

            $processedPageIds[] = $savePage->id;

            // Retrieve existing questions for the page
            $existingQuestions = Question::where('question_page_id', $savePage->id)
                ->get()
                ->keyBy('id');

            // Track the question IDs that are being processed
            $processedQuestionIds = [];

            foreach ($pageData['question'] as $index =>$questionData) {
                $questionType = null;
                $choices = [];

                // Process the question types and handle choices
                foreach ($questionData['types'] as $qind => $type) {
                    switch ($type) {
                        case 'Paragraph':
                            $questionType = 5;
                            $choices =[];
                            break;
                        case 'Image':
                            $questionType = 4;
                            $choices = [];
                            if($questionData['soal'] != $questionData['files'][0]['files']){   
                                if ($questionData['soal'] && File::exists(public_path('img/') . $questionData['soal'])) {
                                    Storage::disk('public')->delete(public_path('img/') . $questionData['soal']);
                                    unlink(public_path('img/') . $questionData['soal']);
                                }
                                $fileName =date('YmdHi') . $questionData['soal']->getClientOriginalName();
                                $questionData['soal']->move(public_path('img'), $fileName);
                                $questionData['soal'] = $fileName;
                        }
                        break;
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
                    ['id' => $questionData['id'] ?? null, 'survey_id' => $survey->id]
                );
                $saveQuestion->question_page_id =  $savePage->id;
                $saveQuestion->required = $questionData['required'] ?? 0;
                $saveQuestion->order = $index+1;
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
        }
        
        $existingQuestions->except($processedQuestionIds)->each(function ($question) {
            $question->delete();
        });
        $existingPages->except($processedPageIds)->each(function ($page) {
            $page->delete();
        });

        // Additional logic for final submission, such as notifications or marking survey as complete
        return redirect()->route('question_surveys', [$clientSlug, $projectSlug, $id])->with('success', 'Survey created successfully.');
    }

    public function flow(Request $request, $clientSlug, $projectSlug, $id){
        
        $pageId = $request->page['id'];
        $qId = $request->question['id'];
        $qchoiceId = $request->choice['cId'];
        $nextOrder = $request->next['order'];   
        $currentOrder = $request->page['order'];
        $flowID = $request->flow_id;
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $saveFlow = Flow::firstOrNew(['id'=>$flowID??null]);
        $saveFlow->flow_name = $request->name;
        $saveFlow->question_page_id = $pageId;
        $saveFlow->question_id = $qId;
        $saveFlow->current_page_order = $currentOrder;
        $saveFlow->question_choice_id = $qchoiceId;
        $saveFlow->next_page_order = $nextOrder;
        $saveFlow->survey_id = $id;
        $saveFlow->save();

        return back()->with('success', 'Survey created successfully.');
    }

    public function deleteFlow($clientSlug, $projectSlug, $surveyId, $flowId) {
        $flow =  Flow::findOrFail($flowId);
        $survey =  Survey::findOrFail($surveyId);
        $project = DB::table('projects')
            ->where('slug', $projectSlug)
            ->get();
        $client = DB::table('clients')
            ->where('slug', $clientSlug)
            ->get();

        $flow->delete();

        return back()->with('success', 'Survey deleted successfully.');
    }
}
