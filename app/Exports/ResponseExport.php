<?php

namespace App\Exports;

use Number;
use App\Models\Response;
use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Contracts\Support\Responsable;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithProperties;
use Maatwebsite\Excel\Concerns\WithColumnLimit;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;

class ResponseExport implements FromQuery, WithHeadings, WithMapping, WithColumnFormatting, ShouldAutoSize, WithCustomStartCell, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */
    use Exportable;
    private $rownumber = 0;
    private $surveyTitle = '';

    public function survey($surveyId, $title)
    {
        $this->survey_id = $surveyId;
        $this->surveyTitle = $title;
        return $this;
    }

    public function startCell(): string
    {
        return 'B3';
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Responden',
            'Instansi',
            'Waktu Submit',
        ];
    }

    public function columnFormats(): array
    {
        return [
            'E' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function map($response): array
    {
        $this->rownumber++;
        return [
            $this->rownumber,
            $response->user->biodata->nama_responden,
            $response->user->biodata->instansi,
            Date::dateTimeToExcel($response->created_at)
        ];
    }

    public function query()
    {
        return Response::query()->where('survey_id', $this->survey_id);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                // Add text to cell A1 (or any other cell above the table)
                $event->sheet->setCellValue('B2', $this->surveyTitle .= ' - List Respon');
                
                // Merge cells A1 to C1 for centering
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
