<template>
  <div class="flex flex-col items-center gap-4">
    <!-- Upload manual -->
    <div class="flex flex-col items-center gap-2">
      <input type="file" accept="image/*" @change="onFileChange" />
      <div v-if="previewUrl" class="w-[300px] h-[300px] rounded-full overflow-hidden border border-gray-300">
        <img :src="previewUrl" alt="Preview" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Botão para abrir câmera -->
    <button
      @click="openCamera"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Abrir Câmera
    </button>

    <!-- Modal da câmera -->
    <div
      v-if="cameraOpen"
      class="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    >
      <div class="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center gap-3 relative">
        <video ref="videoRef" autoplay playsinline class="rounded-full w-[300px] h-[300px] object-cover"></video>

        <div v-if="photoBlob" class="w-[300px] h-[300px] rounded-full overflow-hidden border border-gray-300">
          <img :src="URL.createObjectURL(photoBlob)" class="w-full h-full object-cover" />
        </div>

        <div class="flex gap-3 mt-2">
          <button
            v-if="!photoBlob"
            @click="capturePhoto"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Capturar
          </button>
          <button
            v-if="photoBlob"
            @click="retakePhoto"
            class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Tirar outra
          </button>
          <button
            v-if="photoBlob"
            @click="confirmPhoto"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            OK
          </button>
          <button
            @click="closeCamera"
            class="px-3 py-1 absolute top-2 right-3 text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const videoRef = ref(null)
const cameraOpen = ref(false)
const stream = ref(null)
const photoBlob = ref(null)
const previewUrl = ref(null)

// Abrir câmera
const openCamera = async () => {
  cameraOpen.value = true
  photoBlob.value = null

  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true })
    videoRef.value.srcObject = stream.value
  } catch (err) {
    console.error("Erro ao acessar câmera:", err)
  }
}

// Capturar imagem
const capturePhoto = () => {
  const video = videoRef.value
  const canvas = document.createElement("canvas")
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext("2d")
  ctx.drawImage(video, 0, 0)
  canvas.toBlob((blob) => {
    photoBlob.value = blob
  }, "image/jpeg")
}

// Recomeçar
const retakePhoto = () => {
  photoBlob.value = null
}

// Confirmar foto
const confirmPhoto = () => {
  previewUrl.value = URL.createObjectURL(photoBlob.value)
  closeCamera()
}

// Fechar câmera
const closeCamera = () => {
  cameraOpen.value = false
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
  }
}

// Preview do upload manual
const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    previewUrl.value = URL.createObjectURL(file)
    photoBlob.value = file
  }
}
</script>

<style scoped>
/* Centraliza o vídeo redondo */
video {
  transform: scaleX(-1); /* espelhar para parecer selfie */
}
</style>
