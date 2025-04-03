<template>
    <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <div>
            <NuxtLink to="/">asd</NuxtLink>
            <NuxtLink to="/">asd</NuxtLink>
            <NuxtLink to="/">asd</NuxtLink>
        </div>
    </nav>
</template>

<script setup>

</script>

<style scoped>
nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding-inline: var(--spacer);
    gap: 2rem;
}
nav > div {
    display: flex;
    gap: 1rem;
}
</style>