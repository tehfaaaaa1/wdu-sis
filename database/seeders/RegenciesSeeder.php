<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegenciesSeeder extends Seeder
{
    public function run()
    {
        DB::table('regencies')->insert([
            // Nanggroe Aceh Darussalam
            ['province_id' => 1, 'name' => 'Aceh Besar'],
            ['province_id' => 1, 'name' => 'Aceh Selatan'],
            ['province_id' => 1, 'name' => 'Aceh Tenggara'],
            ['province_id' => 1, 'name' => 'Aceh Tengah'],
            ['province_id' => 1, 'name' => 'Aceh Timur'],
            ['province_id' => 1, 'name' => 'Aceh Utara'],
            ['province_id' => 1, 'name' => 'Bener Meriah'],
            ['province_id' => 1, 'name' => 'Bireuen'],
            ['province_id' => 1, 'name' => 'Gayo Lues'],
            ['province_id' => 1, 'name' => 'Nagan Raya'],
            ['province_id' => 1, 'name' => 'Pidie'],
            ['province_id' => 1, 'name' => 'Pidie Jaya'],
            ['province_id' => 1, 'name' => 'Simeulue'],

            // Sumatera Utara
            ['province_id' => 2, 'name' => 'Asahan'],
            ['province_id' => 2, 'name' => 'Batubara'],
            ['province_id' => 2, 'name' => 'Dairi'],
            ['province_id' => 2, 'name' => 'Deli Serdang'],
            ['province_id' => 2, 'name' => 'Karo'],
            ['province_id' => 2, 'name' => 'Labuhanbatu'],
            ['province_id' => 2, 'name' => 'Langkat'],
            ['province_id' => 2, 'name' => 'Mandailing Natal'],
            ['province_id' => 2, 'name' => 'Nias'],
            ['province_id' => 2, 'name' => 'Nias Barat'],
            ['province_id' => 2, 'name' => 'Nias Selatan'],
            ['province_id' => 2, 'name' => 'Nias Utara'],
            ['province_id' => 2, 'name' => 'Pakpak Bharat'],
            ['province_id' => 2, 'name' => 'Samosir'],
            ['province_id' => 2, 'name' => 'Serdang Bedagai'],
            ['province_id' => 2, 'name' => 'Sibolga'],
            ['province_id' => 2, 'name' => 'Simalungun'],
            ['province_id' => 2, 'name' => 'Tapanuli Selatan'],
            ['province_id' => 2, 'name' => 'Tapanuli Tengah'],
            ['province_id' => 2, 'name' => 'Tapanuli Utara'],
            ['province_id' => 2, 'name' => 'Tebing Tinggi'],

            // Sumatera Selatan
            ['province_id' => 3, 'name' => 'Banyuasin'],
            ['province_id' => 3, 'name' => 'Empat Lawang'],
            ['province_id' => 3, 'name' => 'Lahat'],
            ['province_id' => 3, 'name' => 'Musi Banyuasin'],
            ['province_id' => 3, 'name' => 'Musi Rawas'],
            ['province_id' => 3, 'name' => 'Musi Rawas Utara'],
            ['province_id' => 3, 'name' => 'Ogan Ilir'],
            ['province_id' => 3, 'name' => 'Ogan Komering Ilir'],
            ['province_id' => 3, 'name' => 'Ogan Komering Ulu'],
            ['province_id' => 3, 'name' => 'Ogan Komering Ulu Selatan'],
            ['province_id' => 3, 'name' => 'Ogan Komering Ulu Utara'],
            ['province_id' => 3, 'name' => 'Palembang'],
            ['province_id' => 3, 'name' => 'Pali'],
            ['province_id' => 3, 'name' => 'Penukal Abab Lematang Ilir'],

            // Sumatera Barat
            ['province_id' => 4, 'name' => 'Agam'],
            ['province_id' => 4, 'name' => 'Dharmasraya'],
            ['province_id' => 4, 'name' => 'Kepulauan Mentawai'],
            ['province_id' => 4, 'name' => 'Padang'],
            ['province_id' => 4, 'name' => 'Padang Panjang'],
            ['province_id' => 4, 'name' => 'Padang Pariaman'],
            ['province_id' => 4, 'name' => 'Pasaman'],
            ['province_id' => 4, 'name' => 'Pasaman Barat'],
            ['province_id' => 4, 'name' => 'Pesisir Selatan'],
            ['province_id' => 4, 'name' => 'Sijunjung'],
            ['province_id' => 4, 'name' => 'Solok'],
            ['province_id' => 4, 'name' => 'Solok Selatan'],
            ['province_id' => 4, 'name' => 'Tanah Datar'],

            // Bengkulu
            ['province_id' => 5, 'name' => 'Bengkulu'],
            ['province_id' => 5, 'name' => 'Bengkulu Selatan'],
            ['province_id' => 5, 'name' => 'Bengkulu Tengah'],
            ['province_id' => 5, 'name' => 'Bengkulu Utara'],
            ['province_id' => 5, 'name' => 'Kaur'],
            ['province_id' => 5, 'name' => 'Lebong'],
            ['province_id' => 5, 'name' => 'Muko Muko'],
            ['province_id' => 5, 'name' => 'Rejang Lebong'],

            // Riau
            ['province_id' => 6, 'name' => 'Bengkalis'],
            ['province_id' => 6, 'name' => 'Dumai'],
            ['province_id' => 6, 'name' => 'Indragiri Hilir'],
            ['province_id' => 6, 'name' => 'Indragiri Hulu'],
            ['province_id' => 6, 'name' => 'Kampar'],
            ['province_id' => 6, 'name' => 'Kuantan Singingi'],
            ['province_id' => 6, 'name' => 'Pelalawan'],
            ['province_id' => 6, 'name' => 'Rokan Hilir'],
            ['province_id' => 6, 'name' => 'Rokan Hulu'],
            ['province_id' => 6, 'name' => 'Siak'],

            // Kepulauan Riau
            ['province_id' => 7, 'name' => 'Bintan'],
            ['province_id' => 7, 'name' => 'Karimun'],
            ['province_id' => 7, 'name' => 'Kepulauan Anambas'],
            ['province_id' => 7, 'name' => 'Lingga'],
            ['province_id' => 7, 'name' => 'Natuna'],
            ['province_id' => 7, 'name' => 'Tanjung Pinang'],

            // Jambi
            ['province_id' => 8, 'name' => 'Batang Hari'],
            ['province_id' => 8, 'name' => 'Bungo'],
            ['province_id' => 8, 'name' => 'Jambi'],
            ['province_id' => 8, 'name' => 'Kerinci'],
            ['province_id' => 8, 'name' => 'Merangin'],
            ['province_id' => 8, 'name' => 'Muaro Jambi'],
            ['province_id' => 8, 'name' => 'Sarolangun'],
            ['province_id' => 8, 'name' => 'Tebo'],

            // Lampung
            ['province_id' => 9, 'name' => 'Bandar Lampung'],
            ['province_id' => 9, 'name' => 'Lampung Barat'],
            ['province_id' => 9, 'name' => 'Lampung Selatan'],
            ['province_id' => 9, 'name' => 'Lampung Tengah'],
            ['province_id' => 9, 'name' => 'Lampung Timur'],
            ['province_id' => 9, 'name' => 'Lampung Utara'],
            ['province_id' => 9, 'name' => 'Mesuji'],
            ['province_id' => 9, 'name' => 'Pesawaran'],
            ['province_id' => 9, 'name' => 'Pesisir Barat'],
            ['province_id' => 9, 'name' => 'Pringsewu'],
            ['province_id' => 9, 'name' => 'Tanggamus'],
            ['province_id' => 9, 'name' => 'Way Kanan'],

            // Bangka Belitung
            ['province_id' => 10, 'name' => 'Bangka'],
            ['province_id' => 10, 'name' => 'Bangka Barat'],
            ['province_id' => 10, 'name' => 'Bangka Tengah'],
            ['province_id' => 10, 'name' => 'Bangka Selatan'],
            ['province_id' => 10, 'name' => 'Belitung'],
            ['province_id' => 10, 'name' => 'Belitung Timur'],

            // Kalimantan Barat
            ['province_id' => 11, 'name' => 'Bengkayang'],
            ['province_id' => 11, 'name' => 'Kapuas Hulu'],
            ['province_id' => 11, 'name' => 'Kubu Raya'],
            ['province_id' => 11, 'name' => 'Landak'],
            ['province_id' => 11, 'name' => 'Melawi'],
            ['province_id' => 11, 'name' => 'Pontianak'],
            ['province_id' => 11, 'name' => 'Sambas'],
            ['province_id' => 11, 'name' => 'Sanggau'],
            ['province_id' => 11, 'name' => 'Sekadau'],
            ['province_id' => 11, 'name' => 'Singkawang'],
            ['province_id' => 11, 'name' => 'Sintang'],

            // Kalimantan Timur
            ['province_id' => 12, 'name' => 'Balikpapan'],
            ['province_id' => 12, 'name' => 'Bontang'],
            ['province_id' => 12, 'name' => 'Kutai Barat'],
            ['province_id' => 12, 'name' => 'Kutai Kartanegara'],
            ['province_id' => 12, 'name' => 'Kutai Timur'],
            ['province_id' => 12, 'name' => 'Mahakam Ulu'],
            ['province_id' => 12, 'name' => 'Paser'],
            ['province_id' => 12, 'name' => 'Penajam Paser Utara'],

            // Kalimantan Selatan
            ['province_id' => 13, 'name' => 'Banjar'],
            ['province_id' => 13, 'name' => 'Barito Kuala'],
            ['province_id' => 13, 'name' => 'Banjarbaru'],
            ['province_id' => 13, 'name' => 'Hulu Sungai Selatan'],
            ['province_id' => 13, 'name' => 'Hulu Sungai Tengah'],
            ['province_id' => 13, 'name' => 'Hulu Sungai Utara'],
            ['province_id' => 13, 'name' => 'Kotabaru'],
            ['province_id' => 13, 'name' => 'Tabalong'],
            ['province_id' => 13, 'name' => 'Tanah Bumbu'],
            ['province_id' => 13, 'name' => 'Tanah Laut'],

            // Kalimantan Tengah
            ['province_id' => 14, 'name' => 'Barito Selatan'],
            ['province_id' => 14, 'name' => 'Barito Utara'],
            ['province_id' => 14, 'name' => 'Gunung Mas'],
            ['province_id' => 14, 'name' => 'Katingan'],
            ['province_id' => 14, 'name' => 'Kotawaringin Barat'],
            ['province_id' => 14, 'name' => 'Kotawaringin Timur'],
            ['province_id' => 14, 'name' => 'Lamandau'],
            ['province_id' => 14, 'name' => 'Murung Raya'],
            ['province_id' => 14, 'name' => 'Pulang Pisau'],
            ['province_id' => 14, 'name' => 'Sukamara'],
            ['province_id' => 14, 'name' => 'Seruyan'],

            // Kalimantan Utara
            ['province_id' => 15, 'name' => 'Bulungan'],
            ['province_id' => 15, 'name' => 'Malinau'],
            ['province_id' => 15, 'name' => 'Nunukan'],
            ['province_id' => 15, 'name' => 'Tana Tidung'],
            ['province_id' => 15, 'name' => 'Tarakan'],

            // Banten
            ['province_id' => 16, 'name' => 'Bandung'],
            ['province_id' => 16, 'name' => 'Banten'],
            ['province_id' => 16, 'name' => 'Lebak'],
            ['province_id' => 16, 'name' => 'Pandeglang'],
            ['province_id' => 16, 'name' => 'Serang'],
            ['province_id' => 16, 'name' => 'Tangerang'],

            // DKI Jakarta
            ['province_id' => 17, 'name' => 'Jakarta Barat'],
            ['province_id' => 17, 'name' => 'Jakarta Pusat'],
            ['province_id' => 17, 'name' => 'Jakarta Selatan'],
            ['province_id' => 17, 'name' => 'Jakarta Timur'],
            ['province_id' => 17, 'name' => 'Jakarta Utara'],

            // Jawa Barat
            ['province_id' => 18, 'name' => 'Bandung'],
            ['province_id' => 18, 'name' => 'Bandung Barat'],
            ['province_id' => 18, 'name' => 'Bekasi'],
            ['province_id' => 18, 'name' => 'Bogor'],
            ['province_id' => 18, 'name' => 'Ciamis'],
            ['province_id' => 18, 'name' => 'Cianjur'],
            ['province_id' => 18, 'name' => 'Cirebon'],
            ['province_id' => 18, 'name' => 'Garut'],
            ['province_id' => 18, 'name' => 'Indramayu'],
            ['province_id' => 18, 'name' => 'Karawang'],
            ['province_id' => 18, 'name' => 'Kuningan'],
            ['province_id' => 18, 'name' => 'Majalengka'],
            ['province_id' => 18, 'name' => 'Pangandaran'],
            ['province_id' => 18, 'name' => 'Purwakarta'],
            ['province_id' => 18, 'name' => 'Subang'],
            ['province_id' => 18, 'name' => 'Sukabumi'],
            ['province_id' => 18, 'name' => 'Sumedang'],
            ['province_id' => 18, 'name' => 'Tasikmalaya'],

            // Jawa Tengah
            ['province_id' => 19, 'name' => 'Banjarnegara'],
            ['province_id' => 19, 'name' => 'Banyumas'],
            ['province_id' => 19, 'name' => 'Batang'],
            ['province_id' => 19, 'name' => 'Blora'],
            ['province_id' => 19, 'name' => 'Boyolali'],
            ['province_id' => 19, 'name' => 'Brebes'],
            ['province_id' => 19, 'name' => 'Demak'],
            ['province_id' => 19, 'name' => 'Grobogan'],
            ['province_id' => 19, 'name' => 'Jepara'],
            ['province_id' => 19, 'name' => 'Karanganyar'],
            ['province_id' => 19, 'name' => 'Kebumen'],
            ['province_id' => 19, 'name' => 'Kendal'],
            ['province_id' => 19, 'name' => 'Klaten'],
            ['province_id' => 19, 'name' => 'Kudus'],
            ['province_id' => 19, 'name' => 'Magelang'],
            ['province_id' => 19, 'name' => 'Pati'],
            ['province_id' => 19, 'name' => 'Pemalang'],
            ['province_id' => 19, 'name' => 'Purbalingga'],
            ['province_id' => 19, 'name' => 'Purworejo'],
            ['province_id' => 19, 'name' => 'Rembang'],
            ['province_id' => 19, 'name' => 'Salatiga'],
            ['province_id' => 19, 'name' => 'Semarang'],
            ['province_id' => 19, 'name' => 'Sragen'],
            ['province_id' => 19, 'name' => 'Sukoharjo'],
            ['province_id' => 19, 'name' => 'Temanggung'],
            ['province_id' => 19, 'name' => 'Tegal'],
            ['province_id' => 19, 'name' => 'Wonosobo'],

            // Daerah Istimewa Yogyakarta
            ['province_id' => 20, 'name' => 'Bantul'],
            ['province_id' => 20, 'name' => 'Gunung Kidul'],
            ['province_id' => 20, 'name' => 'Kulon Progo'],
            ['province_id' => 20, 'name' => 'Sleman'],
            ['province_id' => 20, 'name' => 'Yogyakarta'],

            // Jawa Timur
            ['province_id' => 21, 'name' => 'Bangkalan'],
            ['province_id' => 21, 'name' => 'Banyuwangi'],
            ['province_id' => 21, 'name' => 'Blitar'],
            ['province_id' => 21, 'name' => 'Bondowoso'],
            ['province_id' => 21, 'name' => 'Gresik'],
            ['province_id' => 21, 'name' => 'Jember'],
            ['province_id' => 21, 'name' => 'Jombang'],
            ['province_id' => 21, 'name' => 'Kediri'],
            ['province_id' => 21, 'name' => 'Lamongan'],
            ['province_id' => 21, 'name' => 'Lumajang'],
            ['province_id' => 21, 'name' => 'Madiun'],
            ['province_id' => 21, 'name' => 'Magetan'],
            ['province_id' => 21, 'name' => 'Malang'],
            ['province_id' => 21, 'name' => 'Mojokerto'],
            ['province_id' => 21, 'name' => 'Nganjuk'],
            ['province_id' => 21, 'name' => 'Ngawi'],
            ['province_id' => 21, 'name' => 'Pamekasan'],
            ['province_id' => 21, 'name' => 'Pasuruan'],
            ['province_id' => 21, 'name' => 'Ponorogo'],
            ['province_id' => 21, 'name' => 'Sampang'],
            ['province_id' => 21, 'name' => 'Sidoarjo'],
            ['province_id' => 21, 'name' => 'Situbondo'],
            ['province_id' => 21, 'name' => 'Sumenep'],
            ['province_id' => 21, 'name' => 'Trenggalek'],
            ['province_id' => 21, 'name' => 'Tuban'],
            ['province_id' => 21, 'name' => 'Tulungagung'],

            // Bali
            ['province_id' => 22, 'name' => 'Badung'],
            ['province_id' => 22, 'name' => 'Bangli'],
            ['province_id' => 22, 'name' => 'Buleleng'],
            ['province_id' => 22, 'name' => 'Denpasar'],
            ['province_id' => 22, 'name' => 'Gianyar'],
            ['province_id' => 22, 'name' => 'Jembrana'],
            ['province_id' => 22, 'name' => 'Karangasem'],
            ['province_id' => 22, 'name' => 'Klungkung'],

            // Nusa Tenggara Timur
            ['province_id' => 23, 'name' => 'Belu'],
            ['province_id' => 23, 'name' => 'Ende'],
            ['province_id' => 23, 'name' => 'Flores Timur'],
            ['province_id' => 23, 'name' => 'Kupang'],
            ['province_id' => 23, 'name' => 'Lembata'],
            ['province_id' => 23, 'name' => 'Ngada'],
            ['province_id' => 23, 'name' => 'Nagekeo'],
            ['province_id' => 23, 'name' => 'Rote Ndao'],
            ['province_id' => 23, 'name' => 'Sabu Raijua'],
            ['province_id' => 23, 'name' => 'Sikka'],
            ['province_id' => 23, 'name' => 'Sumba Barat'],
            ['province_id' => 23, 'name' => 'Sumba Barat Daya'],
            ['province_id' => 23, 'name' => 'Sumba Tengah'],
            ['province_id' => 23, 'name' => 'Sumba Timur'],

            // Nusa Tenggara Barat
            ['province_id' => 24, 'name' => 'Bima'],
            ['province_id' => 24, 'name' => 'Dompu'],
            ['province_id' => 24, 'name' => 'Lombok Barat'],
            ['province_id' => 24, 'name' => 'Lombok Tengah'],
            ['province_id' => 24, 'name' => 'Lombok Timur'],
            ['province_id' => 24, 'name' => 'Lombok Utara'],
            ['province_id' => 24, 'name' => 'Mataram'],
            ['province_id' => 24, 'name' => 'Sumbawa'],
            ['province_id' => 24, 'name' => 'Sumbawa Barat'],

            // Gorontalo
            ['province_id' => 25, 'name' => 'Boalemo'],
            ['province_id' => 25, 'name' => 'Bone Bolango'],
            ['province_id' => 25, 'name' => 'Gorontalo'],
            ['province_id' => 25, 'name' => 'Gorontalo Utara'],
            ['province_id' => 25, 'name' => 'Pohuwato'],

            // Sulawesi Barat
            ['province_id' => 26, 'name' => 'Majene'],
            ['province_id' => 26, 'name' => 'Mamuju'],
            ['province_id' => 26, 'name' => 'Mamuju Tengah'],
            ['province_id' => 26, 'name' => 'Mamuju Utara'],
            ['province_id' => 26, 'name' => 'Pasangkayu'],

            // Sulawesi Tengah
            ['province_id' => 27, 'name' => 'Banggai'],
            ['province_id' => 27, 'name' => 'Banggai Kepulauan'],
            ['province_id' => 27, 'name' => 'Buol'],
            ['province_id' => 27, 'name' => 'Donggala'],
            ['province_id' => 27, 'name' => 'Morowali'],
            ['province_id' => 27, 'name' => 'Parigi Moutong'],
            ['province_id' => 27, 'name' => 'Palu'],
            ['province_id' => 27, 'name' => 'Sigi'],
            ['province_id' => 27, 'name' => 'Tojo Una-Una'],

            // Sulawesi Selatan
            ['province_id' => 28, 'name' => 'Bantaeng'],
            ['province_id' => 28, 'name' => 'Barru'],
            ['province_id' => 28, 'name' => 'Bone'],
            ['province_id' => 28, 'name' => 'Bulukumba'],
            ['province_id' => 28, 'name' => 'Enrekang'],
            ['province_id' => 28, 'name' => 'Gowa'],
            ['province_id' => 28, 'name' => 'Jeneponto'],
            ['province_id' => 28, 'name' => 'Kepulauan Selayar'],
            ['province_id' => 28, 'name' => 'Luwu'],
            ['province_id' => 28, 'name' => 'Luwu Utara'],
            ['province_id' => 28, 'name' => 'Luwu Timur'],
            ['province_id' => 28, 'name' => 'Makassar'],
            ['province_id' => 28, 'name' => 'Pangkep'],
            ['province_id' => 28, 'name' => 'Pinrang'],
            ['province_id' => 28, 'name' => 'Sidrap'],
            ['province_id' => 28, 'name' => 'Sinjai'],
            ['province_id' => 28, 'name' => 'Soppeng'],
            ['province_id' => 28, 'name' => 'Takalar'],
            ['province_id' => 28, 'name' => 'Tana Toraja'],
            ['province_id' => 28, 'name' => 'Toraja Utara'],
            ['province_id' => 28, 'name' => 'Wajo'],

            // Sulawesi Tenggara
            ['province_id' => 29, 'name' => 'Buton'],
            ['province_id' => 29, 'name' => 'Kolaka'],
            ['province_id' => 29, 'name' => 'Konawe'],
            ['province_id' => 29, 'name' => 'Konut'],
            ['province_id' => 29, 'name' => 'Muna'],
            ['province_id' => 29, 'name' => 'Kendari'],
            ['province_id' => 29, 'name' => 'Wakatobi'],

            // Maluku
            ['province_id' => 30, 'name' => 'Ambon'],
            ['province_id' => 30, 'name' => 'Buru'],
            ['province_id' => 30, 'name' => 'Maluku Barat Daya'],
            ['province_id' => 30, 'name' => 'Maluku Tengah'],
            ['province_id' => 30, 'name' => 'Maluku Tenggara'],
            ['province_id' => 30, 'name' => 'Seram Bagian Barat'],
            ['province_id' => 30, 'name' => 'Seram Bagian Timur'],

            // Papua
            ['province_id' => 31, 'name' => 'Biak Numfor'],
            ['province_id' => 31, 'name' => 'Jayapura'],
            ['province_id' => 31, 'name' => 'Kepulauan Yapen'],
            ['province_id' => 31, 'name' => 'Lanny Jaya'],
            ['province_id' => 31, 'name' => 'Mimika'],
            ['province_id' => 31, 'name' => 'Nabire'],
            ['province_id' => 31, 'name' => 'Paniai'],
            ['province_id' => 31, 'name' => 'Pegunungan Bintang'],
            ['province_id' => 31, 'name' => 'Waropen'],
            ['province_id' => 31, 'name' => 'Yahukimo'],
            ['province_id' => 31, 'name' => 'Yapen Waropen'],

            // Papua Barat
            ['province_id' => 32, 'name' => 'Bintuni'],
            ['province_id' => 32, 'name' => 'Manokwari'],
            ['province_id' => 32, 'name' => 'Raja Ampat'],
            ['province_id' => 32, 'name' => 'Sorong'],
            ['province_id' => 32, 'name' => 'Tambrauw'],
            ['province_id' => 32, 'name' => 'Teluk Bintuni'],
            ['province_id' => 32, 'name' => 'Teluk Wondama'],
        ]);
    }
}
