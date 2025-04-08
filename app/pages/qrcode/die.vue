<template>
    Minden resetelve lett
</template>

<script lang="ts" setup>
const { removeAll } = useQrcodeStorage()
removeAll()
</script>