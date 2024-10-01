<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithTitle;

class ReportExport implements FromArray, WithMultipleSheets
{
    use Exportable;
    protected $sheets;
    private $rownumber = 0;
    private $surveyTitle = '';
    private $survey_id = '';
    private $response = [];
    private $question = [];
    
    public function __construct($surveyId, $title, $question, $response)
    {
        $this->survey_id = $surveyId;
        $this->surveyTitle = $title;
        $this->response = $response;
        $this->question = $question;
    }

    public function array(): array
    {
        return $this->sheets;
    }

    public function sheets(): array
    {
        $sheets = [
            new StatisticExport($this->survey_id, $this->surveyTitle, $this->response),
            new ResponseExport($this->survey_id, $this->surveyTitle, $this->question),
        ];

        return $sheets;
    }

}
