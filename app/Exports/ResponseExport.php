<?php

namespace App\Exports;

use App\Models\Response;
use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithTitle;

class ResponseExport implements FromQuery, WithHeadings, WithMapping, WithColumnFormatting, ShouldAutoSize, WithCustomStartCell, WithEvents, WithTitle
{
    /**
     * @return \Illuminate\Support\Collection
     */
    use Exportable;
    private $rownumber = 0;
    private $surveyTitle = '';
    private $survey_id = '';
    public $question = [];
    public $question_text = [];
    public $choice = [];
    public function __construct($surveyId, $title, $question)
    {
        // dd($question->where('question_type_id', '<=', 3));
        $this->survey_id = $surveyId;
        $this->surveyTitle = $title;
        $this->question = $question->where('question_type_id', '<=', 3)->toArray();
        // array_push($this->question, $question->where('question_type_id', '==', 6)->first()->toArray());

        usort($this->question, function ($a, $b) {
            if($a['question_page_id'] == $b['question_page_id']){
                return $a['order'] >= $b['order'] ;
            }
            return $a['question_page_id'] >= $b['question_page_id'];
        });
        foreach($this->question as $index => $quest){ 
                $this->question_text[$index] = strip_tags($quest['question_text']);
        }
        foreach ($question as $q) {
            if ($q->question_type_id == 2 || $q->question_type_id == 3 ||$q->question_type_id == 6) {
                if($q->question_type_id == 6){
                    // dd($q);
                    array_push($this->question, $q->toArray());
                }
                array_push($this->choice, $q->choice->toArray());
            } 
        }   

    }

    public function title(): string
    {
        return 'Responses';
    }

    public function startCell(): string
    {
        return 'B3';
    }

    public function headings(): array
    {
        return array_merge([
            'No',
            'Nama Responden',
            'Instansi',
            'Email',
            'Waktu Mulai',
            'Waktu Submit',
        ], $this->question_text);
    }

    public function columnFormats(): array
    {
        return [
            'F' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function map($response): array
    {
        $this->rownumber++;
        $answer = $response->answer->toArray();
        usort($answer, function ($a, $b) {
            return ($a['question_id'] >= $b['question_id']);
        });
        $groupAnswer = [];
        dd($this->question);
        foreach ($this->question as $q) {
            $groupAnswer[$q['id']][] = null;
            foreach ($answer as $index => $ans) {
                foreach ($this->choice as $choice) {
                    foreach ($choice as $c) {
                        if($q['question_type_id'] <=3){
                            $ans['answer'] == $c['id'] ? $answer[$index]['answer'] = $c['value'] : '';
                        } else if($q['question_type_id']  == 6){
                            $ans['answer'] == $c['id'] ? $answer[$index]['answer'] = $c['scale'] : '';
                        }
                    }
                }
            $q['id'] == $ans['question_id'] ? $groupAnswer[$q['id']][] = $answer[$index]['answer'] : ''; 
            }
            $groupAnswer[$q['id']] =  array_filter($groupAnswer[$q['id']], function ($value) {
                return $value != null;
            });
        }
        foreach ($groupAnswer as $qId => &$answe) {
            $answe = implode(", ", $answe);
        }
        // dd($response);
        return array_merge(
            [
                $this->rownumber,
                $response->user->biodata->nama_responden,
                $response->user->biodata->instansi,
                $response->user->email,
                $response->created_at->format('H:i:s d-m-Y'),
                $response->updated_at->format('H:i:s d-m-Y'),
            ],
            $groupAnswer
        );
    }

    public function query()
    {
        return Response::query()->where('survey_id', $this->survey_id);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Add text to cell B2 (or any other cell above the table)
                $event->sheet->setCellValue('B2', $this->surveyTitle .= ' - List Respon');
                // Merge cells B2 to E2 for centering
                $event->sheet->mergeCells('B2:E2');
                // Optionally apply some styles to the text
                $event->sheet->getStyle('B2')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 14,
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                ]);
            },
        ];
    }
}
