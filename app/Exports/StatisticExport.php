<?php

namespace App\Exports;

use App\Models\Question;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;

class StatisticExport implements FromQuery, WithMapping, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    use Exportable;
    private $rownumber = 0;
    private $surveyTitle = '';
    private $survey_id = '';
    private $response = [];
    public function survey($surveyId, $title, $response)
    {
        $this->survey_id = $surveyId;
        $this->surveyTitle = $title;
        $this->response = $response;
        return $this;
    }

    public function query()
    {
        return Question::query()->where('survey_id', $this->survey_id);
    }

    public function map($row): array
    {
        $this->rownumber++;
        $choice_value = array_column($row->choice->toArray(), 'value');
        $choice = array_column($row->choice->toArray(), 'id');
        $answer = $row->answer->toArray();
        $totalResponse = count($answer);
        $hitung = [];
        if($row->question_type_id != 1){
        foreach($choice as $index => $id){
            foreach($answer as $a){
                if($a['answer'] == $id){
                    $hitung[$index][] = $a['answer'];
                }
            }
        }
        $mapRows = [[
            $this->rownumber,
            $row->question_text
        ],['','', 'Response Percent', 'Response Count']];

        foreach($choice_value as $index =>$value){
            $count = count($hitung[$index]);
            $percentage = ($count *100) / $totalResponse;
            $mapRows[] = ['', $value, number_format($percentage, 2, '.', ""). '%' ,$count];
        }
            return $mapRows;
        } else if($row->question_type_id == 1){
            return [[
                $this->rownumber,
                $row->question_text
            ],['', $totalResponse. ' Responses']];
        }
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
