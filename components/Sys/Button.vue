<template>
  <UButton
    :color="props.color"
    :loading="props.loading"
    :type="props.type"
    :disabled="props.disabled"
    :block="props.block"
    :variant="props.variant"
    :icon="props.icon"
    :trailing="props.trailing"
    :size="props.size"
    :class="`min-w-[10rem] h-12 flex justify-center ${props.class || ''}`"
    loadingIcon="i-mdi-loading"
    :ui="{
      font: 'font-bold',
    }"
    @click="handleClick"
  >
    <slot></slot>
  </UButton>
</template>

<script setup lang="ts">
import { ButtonProps } from '@/types/components/Sys/Button'

const props = withDefaults(defineProps<ButtonProps>(), {
  loading: false,
  color: 'main',
  type: 'button',
  disabled: false,
  block: false,
  variant: 'solid',
  icon: '',
  trailing: false,
  size: 'xl'
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const handleClick = () => {
  emits('click')
}
</script>
