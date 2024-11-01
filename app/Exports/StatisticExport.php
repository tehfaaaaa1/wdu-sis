<?php

namespace App\Exports;

use App\Models\Question;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class StatisticExport implements FromQuery, WithMapping, ShouldAutoSize, WithCustomStartCell, WithEvents, WithTitle
{
    /**
     * @return \Illuminate\Support\Collection
     */
    use Exportable;
    private $rownumber = 0;
    private $surveyTitle = '';
    private $survey_id = '';
    private $response = [];
    public function __construct($surveyId, $title, $response)
    {
        $this->survey_id = $surveyId;
        $this->surveyTitle = $title;
        $this->response = $response;
    }

    public function title(): string
    {
        return 'Summary Report';
    }

    public function query()
    {
        return Question::query()->where('survey_id', $this->survey_id)->where('question_type_id', '<=', 6)->orderBy('question_page_id')->orderBy('order');
    }

    public function startCell(): string
    {
        return 'B3';
    }

    public function map($row): array
    {
        $this->rownumber++;
        $choice = $row->choice->toArray();
        $answer = $row->answer->toArray();
        $totalResponse = count($answer);
        // dd($row[1]);
        if ($row->question_type_id != 1 && ($row->question_type_id <= 3 || $row->question_type_id == 6)) {
            $hitung = [];
            $mapRows = [
                [$this->rownumber, strip_tags($row->question_text)],
                ['', '', 'Response Percent', 'Response Count'],
            ];
            foreach ($choice as $index => $c) {
                foreach ($answer as $a) {
                    $a['answer'] == $c['id'] ? $hitung[$index][] = $a['answer'] : '';
                }
                $hitung[$index] ?? 0 ? $count = count($hitung[$index]) : $count = '0';
                $answer ? $percentage = ($count * 100) / $totalResponse : $percentage = '0';
                $mapRows[] = [str($c['scale']), $c['value'], number_format($percentage, 2, '.', "") . '%', $count];
            }
            $mapRows[] = [''];
            return $mapRows;
        } else if ($row->question_type_id == 1) {
            return [
                [$this->rownumber, strip_tags($row->question_text)],
                ['', (string)$totalResponse . ' Responses' ?? (string)'No' . ' Responses'],
                [''],
            ];
        } else {
            return false;
        }
    }

    public function registerEvents(): array
    {

        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Add text to cell B2 (or any other cell above the table)
                $event->sheet->setCellValue('B2', $this->surveyTitle .= ' - Summary Report');
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
