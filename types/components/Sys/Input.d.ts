import Inputmask from 'inputmask'

export interface InputProps {
  name: string
  value: string | number | null
  label: string

  type?: string
  inputmode?: string
  disabled?: boolean
  placeholder?: string
  help?: string
  loading?: boolean
  required?: boolean

  inputmask?: Inputmask.Options | string

  class?: string
  inputClass?: string
}

export interface InputEvent extends Event {
  target: HTMLInputElement
}
