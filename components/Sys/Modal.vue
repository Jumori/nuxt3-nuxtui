<template>
  <UModal
    v-model="isOpen"
    @close="handleClose"
    :ui="{
      width:
        props.size === 'sm'
          ? 'max-w-lg'
          : props.size === 'lg'
          ? 'max-w-4xl'
          : props.size === 'xl'
          ? 'max-w-6xl'
          : 'max-w-2xl'
    }"
  >
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <slot name="header"></slot>
      </template>

      <slot></slot>

      <template #footer>
        <slot name="footer"></slot>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ModalProps } from '@/types/components/Sys/Modal'

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md'
})

const isOpen = ref(props.open)

const emits = defineEmits<{
  (event: 'close'): void
}>()

const handleClose = () => {
  emits('close')
}

watch(
  () => props.open,
  () => {
    isOpen.value = props.open
  }
)
</script>
