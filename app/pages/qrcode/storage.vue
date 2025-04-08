<template>
    <div>
        <p>Megtalált qrkódok száma {{ qrcodes.length }}</p>
        <div v-for="qrcode in qrcodes">
            {{ qrcode }}
        </div>
    </div>
</template>
<script lang="ts" setup>

const { getAll } = useQrcodeStorage()
const qrcodes = getAll()
</script>