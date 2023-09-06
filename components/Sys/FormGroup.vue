<template>
  <UFormGroup
    :id="props.name"
    :name="props.name"
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :class="`w-full ${props.class || ''}`"
    :ui="{
      label: {
        wrapper: 'flex content-center items-center justify-between',
        base: 'block font-medium text-base text-gray-700 dark:text-gray-200',
        required: `after:content-['*'] after:ms-0.5 after:text-error dark:after:text-error`
      },
      error: 'mt-2 text-sm text-error dark:text-error'
    }"
  >
    <slot></slot>
  </UFormGroup>
</template>

<script setup lang="ts">
import { FormGroupProps } from '@/types/components/Sys/FormGroup'

const props = withDefaults(defineProps<FormGroupProps>(), {
  label: '',
  required: false,
  help: ''
})
</script>
