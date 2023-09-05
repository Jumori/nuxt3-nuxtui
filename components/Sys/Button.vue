<template>
  <UButton
    :color="props.color"
    :loading="props.loading"
    :type="props.type"
    :disabled="props.disabled"
    :block="props.block"
    :variant="props.outline ? 'outline' : 'solid'"
    :class="`min-w-[10rem] h-12 flex justify-center ${
      props.class || ''
    }`"
  >
    <slot></slot>
  </UButton>
</template>

<script setup lang="ts">
import { ButtonProps } from '@/types/components/Sys/Button'

const props = withDefaults(defineProps<ButtonProps>(), {
  loading: false,
  color: 'primary',
  type: 'button',
  disabled: false,
  block: false,
  outline: false,
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const handleClick = () => {
  emits('click')
}
</script>
