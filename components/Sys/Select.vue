<template>
  <SysFormGroup
    :name="props.name"
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :class="`w-full ${props.class || ''}`"
  >
    <USelectMenu
      v-model="selectedOption"
      :options="props.options"
      :value-attribute="props.optionValue"
      :option-attribute="props.optionLabel"
      :searchable="props.searchable"
      :searchable-placeholder="props.searchablePlaceholder"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :loading="props.loading"
      :class="`h-10 ${props.selectClass || ''}`"
      color="secondary"
      variant="outline"
      @change="handleInput"
    >
      <template #label>
        {{ selectedOptionLabel }}
      </template>
    </USelectMenu>
  </SysFormGroup>
</template>

<script setup lang="ts">
import { SelectProps } from '@/types/components/Sys/Select'

const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  required: false,
  placeholder: '',
  help: '',
  loading: false,
  searchable: false,
  searchablePlaceholder: '',
  optionValue: '',
  optionLabel: '',
  reduce: false
})

const emits = defineEmits<{
  (
    event: 'update:value',
    value: string | number | object
  ): string | number | object
}>()

const selectedOption = ref(props.value)

const selectedOptionLabel = computed(() => {
  if (typeof selectedOption.value === 'object') {
    return selectedOption.value[props.optionLabel]
  }

  const optionsIsArrayOfStrings = props.options.some(
    option => typeof option === 'string'
  )
  if (optionsIsArrayOfStrings) {
    return selectedOption.value
  }

  const matchSelectedOptions = (
    props.options as { [key: string]: string | number }[]
  ).find(option => option[props.optionValue] === selectedOption.value)

  if (matchSelectedOptions) {
    return matchSelectedOptions[props.optionLabel]
  }

  return props.placeholder
})

const handleInput = (value: string | { [key: string]: string }) => {
  emits('update:value', value)
}
</script>
