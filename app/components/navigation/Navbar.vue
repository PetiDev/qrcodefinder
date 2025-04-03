<template>
    <nav>
        <NuxtLink to="/">
            <h2>Home</h2>
        </NuxtLink>
        <div>
            <NuxtLink to="/">asd</NuxtLink>
            <NuxtLink to="/">asd</NuxtLink>
            <NuxtLink to="/">asd</NuxtLink>
        </div>
    </nav>
</template>

<script setup></script>

<style scoped>
nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: var(--spacer);
    gap: 2rem;
    font-size: 1.2rem;
    position: relative;
    height: 3.2rem;
}

nav::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--primary);
    width: calc(100% - 2*var(--spacer));
    height: .1em;
    margin-inline: var(--spacer);
    box-shadow: 0 0 30px 1px var(--primary);
}

nav>div {
    display: flex;
    gap: 1rem;
}
</style>