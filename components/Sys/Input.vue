<template>
  <SysFormGroup
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
      loadingIcon="i-mdi-loading"
      :ui="{
        color: {
          placeholder: 'placeholder-gray-400 dark:placeholder-gray-500',
          secondary: {
            outline:
              'shadow-sm bg-transparent text-black dark:text-white ring-1 ring-inset ring-secondary-200 dark:ring-secondary-400 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400'
          }
        }
      }"
      @input="handleInput"
      @blur="handleBlur"
    />
  </SysFormGroup>
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
