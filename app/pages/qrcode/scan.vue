<template>
  <div class="dark-theme">
    <div class="container">
      <div class="card">
        <p class="body-1 selector">
          A qrkód beolvasásához használt kamera:
          <div class="select-wrapper">
            <select v-model="selectedConstraints" class="select-input">
              <option v-for="option in constraintOptions" :key="option.label" :value="option.constraints">
                {{ option.label }}
              </option>
            </select>
            <div class="select-arrow"></div>
          </div>
        </p>
      </div>

      <p v-if="error" class="body-2 error">{{ error }}</p>

      <div class="camera-container">
        <div v-if="!isCameraReady" class="loading-indicator">
          <h2>Pár pillanat és megnyílik a kamera</h2>
        </div>
        <qrcode-stream
          v-if="status !== 'success' && status !== 'error'"
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
        />
      </div>

      <Toast
        v-if="status === 'success' && data?.isValid"
        class="ok"
        title="Siker"
        content="Qrkód sikeresen beolvasva"
        :time-to-die="timeToDie"
      />
      <Toast
        v-if="status === 'error'"
        class="bad"
        :title="requesterror.statusCode"
        :content="requesterror.statusMessage"
        :time-to-die="timeToDie"
      />
      <Toast
        v-if="status === 'success' && !data?.isValid"
        class="bad"
        title="Nop"
        content="Nem elfogadható QRcode"
        :time-to-die="timeToDie"
      />
    </div>
  </div>
</template>

<script setup>
const timeToDie = 5000;
let isCameraReady = false;
/*** detection handling ***/

const result = ref('')

const { data, status, refresh, clear, error: requesterror } = await useFetch(() => `/api/qrcode/validate/${result.value}/`, {
  transform: r => r.data,
  immediate: false,
  default: () => { return { isValid: false } }
})

const {appendQrcode} = useQrcodeStorage()

async function onDetect(detectedCodes) {
  isCameraReady = false
  result.value = detectedCodes.map((code) => code.rawValue)[0]

  await refresh()
  setTimeout(clear, timeToDie)

  if (status.value !== "success") return;
  console.log("asdasdsad", data.value.isValid);
  if (data.value.isValid) {

    appendQrcode(result.value)
  }
}

/*** select camera ***/

const selectedConstraints = ref({ facingMode: 'environment' })
const defaultConstraintOptions = [
  { label: 'rear camera', constraints: { facingMode: 'environment' } },
  { label: 'front camera', constraints: { facingMode: 'user' } }
]
const constraintOptions = ref(defaultConstraintOptions)

async function onCameraReady() {
  isCameraReady = true
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

  error.value = ''
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
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'kamera-hozzáférési engedélyt kell adnia'
  } else if (err.name === 'NotFoundError') {
    error.value += 'nincs kamera ezen az eszközön'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'biztonságos környezet szükséges (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'a kamera már használatban van?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'a telepített kamerák nem megfelelőek'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'A Stream API nem támogatott ebben a böngészőben'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'A kamerához való hozzáférés csak biztonságos környezetben engedélyezett. A HTTP helyett használjon HTTPS-t vagy localhost-ot.'
  } else {
    error.value += err.message
  }
}
</script>

<style scoped>
/* Import Roboto font if not already included */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
/* Typography */
.body-1 {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.body-2 {
  font-size: 14px;
  line-height: 1.4;
  color: #BDBDBD;
  margin-top: 8px;
  text-align: center; /* Keep the center alignment for error */
}


/* Camera Selector */
.selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  /* Add a subtle border if needed */
  /* border: 1px solid #555; */
}

.select-input {
  appearance: none;
  background-color: #333; /* Darker background for select */
  color: #FFFFFF;
  padding: 10px 30px 10px 12px;
  border: none;
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #FFFFFF; /* White arrow */
  pointer-events: none;
}

.select-input:focus {
  outline: none;
  /* Add a focus style, like a subtle shadow or border */
  box-shadow: 0 0 5px #BB86FC;
}


/* Loading Indicator */
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px; /* Adjust as needed */
  padding: 1rem;
}

/* Camera Container */
.camera-container {
  border-radius: 8px;
  overflow: hidden; /* Clip the camera stream to the rounded corners */
  margin-bottom: 16px;
  background-color: #222; /* Dark background for the camera area */
}

/* Responsive Adjustments */
@media (max-width: 768px) {

  .body-1 {
    font-size: 15px;
  }



  .selector {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .select-wrapper {
    width: 100%;
  }

  .select-input {
    font-size: 15px;
  }
}

@media (max-width: 576px) {
  .container {
    width: 100%;
  }

  .body-1 {
    font-size: 14px;
  }


  .select-input {
    font-size: 14px;
  }
}
</style>