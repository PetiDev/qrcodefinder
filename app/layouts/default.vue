<template>
    <navbar></navbar>
    <div class="content">
        <slot>
        </slot>
    </div>
</template>
<script setup></script>

<style scoped>
.content {
    padding-inline: var(--spacer);
}
</style>