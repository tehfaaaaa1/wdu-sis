<?php

namespace App\Exports;

use Number;
use App\Models\Response;
use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Concerns\FromQuery;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnLimit;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class ResponseExport implements FromQuery, WithHeadings, WithMapping, WithColumnFormatting
{
    /**
    * @return \Illuminate\Support\Collection
    */
    use Exportable;
    private $rownumber =0 ;
    public function headings() : array {
        return[
            'No',
            'Nama Responden',
            'Survey',
            'Waktu Submit',
        ];
    }
    public function columnFormats():array {
        return[
            'D' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }
    public function map($response):array {
        $this->rownumber ++;
        return [
            $this->rownumber,
            $response->user->biodata->nama_responden,
            $response->survey->title,
            Date::dateTimeToExcel($response->created_at)
        ];
    }
    public function survey($surveyId){
        $this->survey_id = $surveyId;

        return $this;
    }
    public function query()
    {
        return Response::query()->where('survey_id', $this->survey_id);
    }
}
