<template>
    <div class="cont">
        <p>Megtalált qrkódok száma: {{ qrcodes.length }}</p>
        <div class="qrco" v-for="qrcode in qrcodes">
            {{ qrcode }}
        </div>
    </div>
</template>
<script lang="ts" setup>

const { getAll } = useQrcodeStorage()
const qrcodes = getAll()
</script>
<style scoped>
.qrco{
    background-color: var(--clr-ok);
    border-radius: 25px;
    padding-inline: 2rem;
    padding-block: 1rem;

    font-size: 3rem;
}
.cont {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>