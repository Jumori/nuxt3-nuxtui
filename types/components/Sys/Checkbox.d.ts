
export interface CheckboxProps {
  name: string
  value: boolean

  label?: string
  disabled?: boolean
  required?: boolean
  help?: string
  help?: string

  class?: string
  checkboxClass?: string
}

export interface CheckboxEvent extends Event {
  target: HTMLInputElement
}
