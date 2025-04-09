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
<style scoped>
#toast {
  --padding: 16px; /* Adjust padding to Material Design spacing */
  font-size: 14px; /* Adjust base font size */
  padding: var(--padding);
  border-radius: 4px; /* More subtle rounded corners */
  min-width: 280px; /* Adjust minimum width */
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); /* Material Design elevation */
  color: #FFFFFF; /* Ensure text color is white for dark theme */
}

#toast h1 {
  font-size: 18px; /* Material Design headline style */
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 8px;
}

#toast h3 {
  font-size: 14px; /* Material Design body text style */
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.4;
}

.ok {
  background-color: var(--clr-ok); /* Use the global success color */
}

.bad {
  background-color: #F44336; /* Use a standard Material Design red for errors */
}
</style>