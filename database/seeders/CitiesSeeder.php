<?php

// database/seeders/CitiesSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitiesSeeder extends Seeder
{
    public function run()
    {
        DB::table('cities')->insert([
            // Nanggroe Aceh Darussalam
            ['province_id' => 1, 'name' => 'Kota Banda Aceh'],
            ['province_id' => 1, 'name' => 'Kota Sabang'],
            ['province_id' => 1, 'name' => 'Kota Langsa'],
            ['province_id' => 1, 'name' => 'Kota Lhokseumawe'],
            ['province_id' => 1, 'name' => 'Kota Subulussalam'],

            // Sumatera Utara
            ['province_id' => 2, 'name' => 'Kota Medan'],
            ['province_id' => 2, 'name' => 'Kota Binjai'],
            ['province_id' => 2, 'name' => 'Kota Tebing Tinggi'],
            ['province_id' => 2, 'name' => 'Kota Pematang Siantar'],
            ['province_id' => 2, 'name' => 'Kota Tanjung Balai'],
            ['province_id' => 2, 'name' => 'Kota Sibolga'],
            ['province_id' => 2, 'name' => 'Kota Padangsidimpuan'],
            ['province_id' => 2, 'name' => 'Kota Gunungsitoli'],

            // Sumatera Selatan
            ['province_id' => 3, 'name' => 'Kota Palembang'],
            ['province_id' => 3, 'name' => 'Kota Prabumulih'],
            ['province_id' => 3, 'name' => 'Kota Pagar Alam'],
            ['province_id' => 3, 'name' => 'Kota Lubuklinggau'],

            // Sumatera Barat
            ['province_id' => 4, 'name' => 'Kota Padang'],
            ['province_id' => 4, 'name' => 'Kota Bukittinggi'],
            ['province_id' => 4, 'name' => 'Kota Padang Panjang'],
            ['province_id' => 4, 'name' => 'Kota Pariaman'],
            ['province_id' => 4, 'name' => 'Kota Payakumbuh'],
            ['province_id' => 4, 'name' => 'Kota Sawahlunto'],
            ['province_id' => 4, 'name' => 'Kota Solok'],

            // Bengkulu
            ['province_id' => 5, 'name' => 'Kota Bengkulu'],

            // Riau
            ['province_id' => 6, 'name' => 'Kota Pekanbaru'],
            ['province_id' => 6, 'name' => 'Kota Dumai'],

            // Kepulauan Riau
            ['province_id' => 7, 'name' => 'Kota Tanjung Pinang'],
            ['province_id' => 7, 'name' => 'Kota Batam'],

            // Jambi
            ['province_id' => 8, 'name' => 'Kota Jambi'],
            ['province_id' => 8, 'name' => 'Kota Sungai Penuh'],

            // Lampung
            ['province_id' => 9, 'name' => 'Kota Bandar Lampung'],
            ['province_id' => 9, 'name' => 'Kota Metro'],

            // Bangka Belitung
            ['province_id' => 10, 'name' => 'Kota Pangkal Pinang'],

            // Kalimantan Barat
            ['province_id' => 11, 'name' => 'Kota Pontianak'],
            ['province_id' => 11, 'name' => 'Kota Singkawang'],

            // Kalimantan Timur
            ['province_id' => 12, 'name' => 'Kota Samarinda'],
            ['province_id' => 12, 'name' => 'Kota Balikpapan'],
            ['province_id' => 12, 'name' => 'Kota Bontang'],

            // Kalimantan Selatan
            ['province_id' => 13, 'name' => 'Kota Banjarbaru'],
            ['province_id' => 13, 'name' => 'Kota Banjarmasin'],

            // Kalimantan Tengah
            ['province_id' => 14, 'name' => 'Kota Palangkaraya'],

            // Kalimantan Utara
            ['province_id' => 15, 'name' => 'Kota Tarakan'],

            // Banten
            ['province_id' => 16, 'name' => 'Kota Serang'],
            ['province_id' => 16, 'name' => 'Kota Tangerang'],
            ['province_id' => 16, 'name' => 'Kota Tangerang Selatan'],
            ['province_id' => 16, 'name' => 'Kota Cilegon'],

            // DKI Jakarta
            ['province_id' => 17, 'name' => 'Kota Jakarta Pusat'],
            ['province_id' => 17, 'name' => 'Kota Jakarta Utara'],
            ['province_id' => 17, 'name' => 'Kota Jakarta Barat'],
            ['province_id' => 17, 'name' => 'Kota Jakarta Selatan'],
            ['province_id' => 17, 'name' => 'Kota Jakarta Timur'],

            // Jawa Barat
            ['province_id' => 18, 'name' => 'Kota Bandung'],
            ['province_id' => 18, 'name' => 'Kota Bogor'],
            ['province_id' => 18, 'name' => 'Kota Depok'],
            ['province_id' => 18, 'name' => 'Kota Bekasi'],
            ['province_id' => 18, 'name' => 'Kota Cimahi'],
            ['province_id' => 18, 'name' => 'Kota Cirebon'],
            ['province_id' => 18, 'name' => 'Kota Sukabumi'],
            ['province_id' => 18, 'name' => 'Kota Tasikmalaya'],
            ['province_id' => 18, 'name' => 'Kota Banjar'],

            // Jawa Tengah
            ['province_id' => 19, 'name' => 'Kota Semarang'],
            ['province_id' => 19, 'name' => 'Kota Surakarta'],
            ['province_id' => 19, 'name' => 'Kota Magelang'],
            ['province_id' => 19, 'name' => 'Kota Pekalongan'],
            ['province_id' => 19, 'name' => 'Kota Salatiga'],
            ['province_id' => 19, 'name' => 'Kota Tegal'],

            // Daerah Istimewa Yogyakarta
            ['province_id' => 20, 'name' => 'Kota Yogyakarta'],

            // Jawa Timur
            ['province_id' => 21, 'name' => 'Kota Surabaya'],
            ['province_id' => 21, 'name' => 'Kota Batu'],
            ['province_id' => 21, 'name' => 'Kota Blitar'],
            ['province_id' => 21, 'name' => 'Kota Kediri'],
            ['province_id' => 21, 'name' => 'Kota Madiun'],
            ['province_id' => 21, 'name' => 'Kota Malang'],
            ['province_id' => 21, 'name' => 'Kota Mojokerto'],
            ['province_id' => 21, 'name' => 'Kota Pasuruan'],
            ['province_id' => 21, 'name' => 'Kota Probolinggo'],

            // Bali
            ['province_id' => 22, 'name' => 'Kota Denpasar'],

            // Nusa Tenggara Timur
            ['province_id' => 23, 'name' => 'Kota Kupang'],

            // Nusa Tenggara Barat
            ['province_id' => 24, 'name' => 'Kota Mataram'],
            ['province_id' => 24, 'name' => 'Kota Bima'],

            // Gorontalo
            ['province_id' => 25, 'name' => 'Kota Gorontalo'],

            // Sulawesi Barat
            ['province_id' => 26, 'name' => 'Kota Mamuju'],

            // Sulawesi Tengah
            ['province_id' => 27, 'name' => 'Kota Palu'],

            // Sulawesi Utara
            ['province_id' => 28, 'name' => 'Kota Manado'],
            ['province_id' => 28, 'name' => 'Kota Bitung'],
            ['province_id' => 28, 'name' => 'Kota Kotamobagu'],
            ['province_id' => 28, 'name' => 'Kota Tomohon'],

            // Sulawesi Tenggara
            ['province_id' => 29, 'name' => 'Kota Kendari'],
            ['province_id' => 29, 'name' => 'Kota Baubau'],

            // Sulawesi Selatan
            ['province_id' => 30, 'name' => 'Kota Makassar'],
            ['province_id' => 30, 'name' => 'Kota Palopo'],
            ['province_id' => 30, 'name' => 'Kota Parepare'],

            // Maluku Utara
            ['province_id' => 31, 'name' => 'Kota Sofifi'],
            ['province_id' => 31, 'name' => 'Kota Ternate'],
            ['province_id' => 31, 'name' => 'Kota Tidore Kepulauan'],

            // Maluku
            ['province_id' => 32, 'name' => 'Kota Ambon'],
            ['province_id' => 32, 'name' => 'Kota Tual'],

            // Papua Barat
            ['province_id' => 33, 'name' => 'Kota Sorong'],

            // Papua
            ['province_id' => 34, 'name' => 'Kota Jayapura'],

            // Papua Tengah
            // Tidak ada kota

            // Papua Pegunungan
            // Tidak ada kota

            // Papua Selatan
            // Tidak ada kota

            // Papua Barat Daya
            ['province_id' => 35, 'name' => 'Kota Sorong'],
        ]);
    }
}
