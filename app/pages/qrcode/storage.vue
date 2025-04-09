<template>
    <div class="dark-theme">
        <div class="container">
            <div class="card">
                <h5 >Megtalált QR-kódok</h5>
                <p class="body-1">Száma: {{ qrcodes.length }}</p>
            </div>

            <div class="qrcode-list">
                <div class="qrcode-item" v-for="(qrcode, index) in qrcodes" :key="index">
                    <p class="body-2">{{ qrcode }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { getAll } = useQrcodeStorage()
const qrcodes = getAll()
</script>
<style scoped>
/* Import Roboto font if not already included */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');


.qrcode-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    width: 100%;
}

.qrcode-item {
    background-color: #333;
    /* Dark background for list items */
    border-radius: 4px;
    padding: 12px 16px;
}

.body-2 {
    font-size: 16px;
    line-height: 1.5;
    color: #FFFFFF;
    /* Light text color for readability */
    word-break: break-all;
    /* Prevent long QR codes from breaking the layout */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
 

    .body-1 {
        font-size: 15px;
    }

    .body-2 {
        font-size: 15px;
    }
}

@media (max-width: 576px) {
    .body-1 {
        font-size: 14px;
    }

    .body-2 {
        font-size: 14px;
    }
}
</style>