<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
  mediaId: {
    type: String,
    required: true,
  },
  aspect: {
    type: [String, Number],
    default: 16 / 9,
  },
  swatch: {
    type: String,
    default: '',
  },
})

const aspectValue = computed(() => {
  const value = Number(props.aspect)
  return Number.isFinite(value) && value > 0 ? value : 16 / 9
})

const paddingTop = computed(() => `${(1 / aspectValue.value) * 100}%`)
const swatchUrl = computed(
  () =>
    props.swatch ||
    `https://fast.wistia.com/embed/medias/${props.mediaId}/swatch`
)
const embedSrc = computed(
  () => `https://fast.wistia.com/embed/${props.mediaId}.js`
)

const ensureScript = (src, options = {}) => {
  if (document.querySelector(`script[data-wistia-src="${src}"]`)) return

  const script = document.createElement('script')
  script.src = src
  script.async = true
  if (options.type) script.type = options.type
  script.setAttribute('data-wistia-src', src)
  document.head.appendChild(script)
}

const ensureStyle = () => {
  const styleId = `wistia-style-${props.mediaId}`
  if (document.getElementById(styleId)) return

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `wistia-player[media-id="${props.mediaId}"]:not(:defined) { background: center / contain no-repeat url('${swatchUrl.value}'); display: block; filter: blur(5px); padding-top: ${paddingTop.value}; }`
  document.head.appendChild(style)
}

onMounted(() => {
  ensureScript('https://fast.wistia.com/player.js')
  ensureScript(embedSrc.value, { type: 'module' })
  ensureStyle()
})
</script>

<template>
  <wistia-player :media-id="props.mediaId" :aspect="aspectValue"></wistia-player>
</template>
