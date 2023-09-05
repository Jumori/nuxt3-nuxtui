<template>
  <UFormGroup
    :id="props.name"
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
      color="primary"
      @input="handleInput"
    >
      <template #label>
        <slot></slot>
      </template>
    </UCheckbox>
  </UFormGroup>
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
