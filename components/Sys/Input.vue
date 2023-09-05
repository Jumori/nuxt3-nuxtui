<template>
  <UFormGroup
    :id="props.name"
    :name="props.name"
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :class="`w-full ${props.class || ''}`"
  >
    <UInput
      v-inputmask="inputmaskMask"
      :type="props.type"
      :inputmode="props.inputmode"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :loading="props.loading"
      :value="props.value"
      :class="`h-10 ${props.inputClass || ''}`"
      color="secondary"
      variant="outline"
      @input="handleInput"
      @blur="handleBlur"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import { getInputmaskMask } from '@/services/inputmask'
import { InputProps, InputEvent } from '@/types/components/Sys/Input'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  inputmode: 'text',
  disabled: false,
  placeholder: '',
  help: '',
  loading: false,
  required: false
})

const emits = defineEmits<{
  (event: 'update:value', value: string): string
  (event: 'blur', value: InputEvent): void
}>()

const inputmaskMask = computed(() => {
  if (!props.inputmask) {
    return null
  }

  if (typeof props.inputmask === 'string') {
    return getInputmaskMask(props.inputmask)
  }

  return props.inputmask
})

const handleInput = (event: InputEvent) => {
  emits('update:value', event.target.value)
}

const handleBlur = (event: InputEvent) => {
  emits('blur', event)
}
</script>
