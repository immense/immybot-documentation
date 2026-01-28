<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps({
  mediaId: {
    type: String,
    default: '',
  },
  channelId: {
    type: String,
    default: '',
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

const mediaIdValue = computed(() => props.mediaId.trim())
const channelIdValue = computed(() => props.channelId.trim())
const hasMedia = computed(() => mediaIdValue.value.length > 0)
const hasChannel = computed(() => channelIdValue.value.length > 0)

const embedType = computed(() => {
  if (hasChannel.value) return 'playlist'
  if (hasMedia.value) return 'media'
  return 'none'
})

const aspectValue = computed(() => {
  const value = Number(props.aspect)
  return Number.isFinite(value) && value > 0 ? value : 16 / 9
})

const paddingTop = computed(() => `${(1 / aspectValue.value) * 100}%`)
const swatchUrl = computed(() => {
  if (!hasMedia.value) return ''
  return (
    props.swatch ||
    `https://fast.wistia.com/embed/medias/${mediaIdValue.value}/swatch`
  )
})
const embedSrc = computed(() => {
  if (!hasMedia.value) return ''
  return `https://fast.wistia.com/embed/${mediaIdValue.value}.js`
})

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
  const styleId = `wistia-style-${mediaIdValue.value}`
  if (document.getElementById(styleId)) return

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `wistia-player[media-id="${mediaIdValue.value}"]:not(:defined) { background: center / contain no-repeat url('${swatchUrl.value}'); display: block; filter: blur(5px); padding-top: ${paddingTop.value}; }`
  document.head.appendChild(style)
}

onMounted(() => {
  if (!hasMedia.value && !hasChannel.value) {
    console.warn('WistiaEmbed requires either media-id or channel-id.')
    return
  }

  if (hasMedia.value && hasChannel.value) {
    console.warn(
      'WistiaEmbed received both media-id and channel-id; using channel-id.'
    )
  }

  if (embedType.value === 'playlist') {
    ensureScript('https://fast.wistia.com/playlist.js')
    return
  }

  ensureScript('https://fast.wistia.com/player.js')
  ensureScript(embedSrc.value, { type: 'module' })
  ensureStyle()
})
</script>

<template>
  <wistia-playlist
    v-if="embedType === 'playlist'"
    :channel-id="channelIdValue"
  ></wistia-playlist>
  <wistia-player
    v-else-if="embedType === 'media'"
    :media-id="mediaIdValue"
    :aspect="aspectValue"
  ></wistia-player>
</template>
