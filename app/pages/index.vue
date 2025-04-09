<template>
    <div class="dark-theme">
      <div class="container">
        <NuxtRouteAnnouncer />
        <div class="card">
          <p class="body-1">
            A <NuxtLink to="/qrcode/scan" class="link">scan</NuxtLink> oldalon megnyíló kamerával olvasd be a suli területén
            elrejtett qrkódokat.
          </p>
          <p class="body-1">
            6 darabnak kell lennie.
            <br />
            A beolvasáshoz szükséged lesz internet kapcsolatra.
          </p>
          <p class="body-1 warning">
            Ahoz hogy működjön engedélyezned kell az oldalnak, hogy hozzáférjen a kamérádhoz.
            <br />
            Erre majd felszólít ahogy aktuális lesz.
          </p>
          <p class="body-1 warning-info">
            A kamera képei se tárolva se elküldve nincsenek sehova. <br /> A qrkód beolvasása csak a telefonodon
            történik.
          </p>
        </div>
        <div class="card">
          <p class="body-1">
            A <NuxtLink to="/qrcode/storage" class="link">Lista</NuxtLink> oldalon találhatóak az eddig megtalált qrkódok
          </p>
        </div>
        <p class="body-2 info">
          Kiléphetsz a böngészőből a megtalált qrkódok nem vesznek el
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  <style scoped>

  
  /* Typography */
  .body-1 {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 8px;
  }
  
  .body-2 {
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    margin-top: 24px;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .body-1 {
      font-size: 15px; /* Slightly reduce font size on smaller screens */
    }
  
    .body-2 {
      font-size: 13px; /* Slightly reduce font size on smaller screens */
    }
  }
  
  @media (max-width: 576px) {
    .body-1 {
      font-size: 14px; /* Further reduce font size on very small screens */
    }
  
    .body-2 {
      font-size: 12px; /* Further reduce font size on very small screens */
    }
  }
  </style>