<template>
  <div>
    <p>
      A qrkód beolvasásához használt kamera

      <select v-model="selectedConstraints">
        <option v-for="option in constraintOptions" :key="option.label" :value="option.constraints">
          {{ option.label }}
        </option>
      </select>
    </p>



    <p class="error">{{ errors }}</p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <div>
      <qrcode-stream :constraints="selectedConstraints" :track="trackFunctionSelected.value"
        :formats="selectedBarcodeFormats" @error="onError" @detect="onDetect" @camera-on="onCameraReady" />
    </div>

    <Toast v-if="data" title="Siker" content="Qrkód sikeresen beolvasva"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'




/*** detection handling ***/

const result = ref('')

const { data, status, refresh } = await useFetch(() => `/api/qrcode/validate/${result.value}/`, {
  transform: r => r.data,
  immediate: false,
})

async function onDetect(detectedCodes) {
  result.value = detectedCodes.map((code) => code.rawValue)[0]

  await refresh()
  console.log(data.value);

}

/*** select camera ***/

const selectedConstraints = ref({ facingMode: 'environment' })
const defaultConstraintOptions = [
  { label: 'rear camera', constraints: { facingMode: 'environment' } },
  { label: 'front camera', constraints: { facingMode: 'user' } }
]
const constraintOptions = ref(defaultConstraintOptions)

async function onCameraReady() {
  // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
  // camera access permission. `QrcodeStream` internally takes care of
  // requesting the permissions. The `camera-on` event should guarantee that this
  // has happened.
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId }
    }))
  ]

  errors.value = ''
}

/*** track functons ***/

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}


const trackFunctionSelected = ref({ text: 'outline', value: paintOutline })

/*** barcode formats ***/

const barcodeFormats = ref({
  qr_code: true

})
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
})

/*** error handling ***/

const error = ref('')

function onError(err) {
  errors.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    errors.value += 'kamera-hozzáférési engedélyt kell adnia'
  } else if (err.name === 'NotFoundError') {
    errors.value += 'nincs kamera ezen az eszközön'
  } else if (err.name === 'NotSupportedError') {
    errors.value += 'biztonságos környezet szükséges (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    errors.value += 'a kamera már használatban van?'
  } else if (err.name === 'OverconstrainedError') {
    errors.value += 'a telepített kamerák nem megfelelőek'
  } else if (err.name === 'StreamApiNotSupportedError') {
    errors.value += 'A Stream API nem támogatott ebben a böngészőben'
  } else if (err.name === 'InsecureContextError') {
    errors.value +=
      'A kamerához való hozzáférés csak biztonságos környezetben engedélyezett. A HTTP helyett használjon HTTPS-t vagy localhost-ot.'
  } else {
    errors.value += err.message
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}

.barcode-format-checkbox {
  margin-right: 10px;
  white-space: nowrap;
  display: inline-block;
}
</style>