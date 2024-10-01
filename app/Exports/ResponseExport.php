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
    public $question_id = [];
    public $question_text = [];
    public $choice = [];
    public function __construct($surveyId, $title, $question)
    {
        $this->survey_id = $surveyId;
        $this->surveyTitle = $title;
        $this->question_id = array_column($question->toArray(), 'id');
        $this->question_text = array_column($question->toArray(), 'question_text');
        foreach ($question as $q) {
            if ($q->question_type_id == 2 || $q->question_type_id == 3) {
                array_push($this->choice, $q->choice->toArray());
            };
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
        foreach ($this->question_id as $qId) {
            $groupAnswer[$qId][] = null;
            foreach ($answer as $index => $ans) {
                foreach ($this->choice as $choice) {
                    foreach ($choice as $c) {
                        $ans['answer'] == $c['id'] ? $answer[$index]['answer'] = $c['value'] : '';
                    }
                }
            $qId == $ans['question_id'] ? $groupAnswer[$qId][] = $ans['answer'] : ''; 
            }
            $groupAnswer[$qId] =  array_filter($groupAnswer[$qId], function ($value) {
                return $value != null;
            });
        }

        foreach ($groupAnswer as $qId => &$answe) {
            $answe = implode(", ", $answe);
        }
        return array_merge(
            [
                $this->rownumber,
                $response->user->biodata->nama_responden,
                $response->user->biodata->instansi,
                $response->user->email,
                Date::dateTimeToExcel($response->created_at)
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
