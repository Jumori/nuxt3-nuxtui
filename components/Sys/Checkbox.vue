<template>
  <SysFormGroup
    :name="props.name"
    :required="props.required"
    :class="`w-full ${props.class || ''}`"
  >
    <UCheckbox
      :label="props.label"
      :value="props.value"
      :disabled="props.disabled"
      :required="props.required"
      :help="props.help"
      :class="`${props.checkboxClass || ''}`"
      :ui="{
        wrapper: 'relative flex items-center',
        base: 'h-5 w-5 dark:checked:bg-current dark:checked:border-transparent dark:indeterminate:bg-current dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
        label: 'font-medium text-gray-700 dark:text-gray-200 text-base'
      }"
      color="main"
      @change="handleInput"
    >
      <template #label>
        <slot></slot>
      </template>
    </UCheckbox>
  </SysFormGroup>
</template>

<script setup lang="ts">
import { CheckboxProps, CheckboxEvent } from '@/types/components/Sys/Checkbox'

const props = withDefaults(defineProps<CheckboxProps>(), {
  label: '',
  disabled: false,
  required: false,
  help: ''
})

const emits = defineEmits<{
  (event: 'update:value', value: boolean): boolean
}>()

const handleInput = (event: CheckboxEvent) => {
  emits('update:value', event.target.checked)
}
</script>
