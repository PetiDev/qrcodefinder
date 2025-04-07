<template>
    <div id="toast" ref="toastRef">
        <h1>{{ title }}</h1>
        <h3>{{ content }}</h3>
    </div>
</template>
<script setup lang="ts">
const { title, content, timeToDie } = defineProps({
    "title": {
        required: true,
        type: String
    },
    "content": {
        default: "",
        type: String
    },
    "timeToDie": {
        type: Number,
        required: true
    }
})

const toastRef = ref<HTMLDivElement>()


let dieTime: number;

const die = () => {
    toastRef.value?.remove();
}

onMounted(() => {
    dieTime = setTimeout(() => die, timeToDie)
})

</script>
<style>
#toast {
    --padding: 1rem;
    font-size: .8rem;
    background-color: var(--clr-ok);
    padding: var(--padding);
    border-radius: 20px;
    width: 20rem;
}
</style>