<template>
    <div id="toast" ref="toastRef" @mouseenter="mouseEnterToast" @mouseleave="mouseLeaveToast" @load="toastLoaded">
        <h1>{{ title }}</h1>
        <h3>{{ content }}</h3>
    </div>
</template>
<script setup lang="ts">
const { title, content } = defineProps({
    "title": {
        required: true,
        type: String
    },
    "content": {
        default: "",
        type: String
    }
})

const toastRef = ref<HTMLDivElement>()



const timeToDie = 2000;

let dieTime: number;

const toastLoaded = () => {

    console.log("asd");
    

    toastRef.value?.animate(
        [
            {
                width: "calc(100% - 2*var(--padding))"
            },
            {
                width: "0%"
            }
        ], {
        pseudoElement: "::after",
        duration: timeToDie
    }
    );

    dieTime = setTimeout(() => {
    toastRef.value?.remove()
}, timeToDie)

}

const mouseEnterToast = () => {
    clearTimeout(dieTime)
    toastRef.value?.animate(
        [
            {
                width: "0%"
            },
            {
                width: "calc(100% - 2*var(--padding))"
            }
        ], {
        pseudoElement: "::after",
        duration: 1,
        fill: "forwards"
    }
    );
}
const mouseLeaveToast = () => {
    dieTime = setTimeout(() => {
        toastRef.value?.remove()
    }, timeToDie)
    toastRef.value?.animate(
        [
            {
                width: "calc(100% - 2*var(--padding))"
            },
            {
                width: "0%"
            }
        ], {
        pseudoElement: "::after",
        duration: timeToDie
    }
    );

}

</script>
<style>
#toast {
    --padding: 1rem;
    font-size: .8rem;
    background-color: var(--clr-ok);
    padding: var(--padding);
    border-radius: 20px;
    width: 20rem;
    position: relative;
}

#toast::after {
    content: '';
    width: calc(100% - 2*var(--padding));
    height: .2rem;
    background-color: var(--primary);
    position: absolute;
    left: var(--padding);
    bottom: 0;
}
</style>