<AppLayout title="Profile Client ">
    <template #header>
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Profile Client - {{ client.client_name }}
        </h2>
    </template>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="py-12 bg-white overflow-hidden shadow-xl sm:rounded-lg h-auto flex flex-col items-center">
                <img :src="`/img/${client.image}`" alt="" class="h-60 w-full object-scale-down border-b-1 border-gray-400">
                <div class="mx-4 px-4 mt-3 py-5">
                    <p class=" text-base text-justify line-clamp-3 leading-5 tracking-wide">
                        {{ client.desc }}
                    </p>

                    <div class="mt-5 grid grid-cols-2">
                        <div>Instansi</div>
                        <div class="font-bold"> {{ client.client_name }}</div>
                        <div>Alamat</div>
                        <div class="font-bold"> {{ client.alamat }}</div>
                        <div>Tanggal Tender</div>
                        <div class="font-bold"> {{ formatDate(client.date) }} </div>
                        <div>List Project</div>
                        <div class="font-bold">
                            <ul class="list-none">
                                <li>Test</li>
                                <li>Test-2</li>
                            </ul>
                        </div>
                    </div>    
                </div>
            </div>    
        </div>
    </div>
</AppLayout>