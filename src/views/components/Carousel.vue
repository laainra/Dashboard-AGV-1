<template>
  <div class="card card-carousel overflow-hidden h-100 p-0">
    <div id="carouselExampleCaptions" class="carousel slide h-100" data-bs-ride="carousel">
      <div class="carousel-inner border-radius-lg h-100">
        <div
          class="carousel-item h-100 active"
          :style="{backgroundImage: `url(${carousel1})`,
      backgroundSize: 'cover'}"
        >
          <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
            <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
              <i class="ni ni-camera-compact text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">Selamat Datang di Dashboard AGV</h5>
            <p>Pantau AGVmu dengan mudah di mana saja dan kapan saja </p>
          </div>
        </div>
        <div
          class="carousel-item h-100"
          :style="{backgroundImage: `url(${carousel2})`,
      backgroundSize: 'cover'}"
        >
          <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
            <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
              <i class="ni ni-bulb-61 text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">Apa itu AGV?</h5>
            <p>AGV adalah singkatan dari Automatic Guided Vehicle</p>
          </div>
        </div>
        <div
          class="carousel-item h-100"
          :style="{backgroundImage: `url(${carousel3})`,
      backgroundSize: 'cover'}"
        >
          <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
            <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
              <i class="ni ni-trophy text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">Apa kegunaan AGV?</h5>
            <p>Robot beroda yang dapat digunakan menjadi kendaraan pembawa dan pengangkut barang dari satu tempat ke tempat lainnya secara otomatis dan manual.</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import carousel1 from '@/assets/img/carousel-1.jpg';
import carousel2 from '@/assets/img/carousel-2.jpg';
import carousel3 from '@/assets/img/carousel-3.jpg';

export default {
  name: "carousel",
  data: () => ({
    carousel1,
    carousel2,
    carousel3,
  }),
};
</script>
