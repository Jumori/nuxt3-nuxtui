export interface SelectProps {
  name: string
  value: string | number | {[key: string]: string | number}
  label: string
  options: string[] | {[key: string]: string}[]

  disabled?: boolean
  required?: boolean
  placeholder?: string
  help?: string
  loading?: boolean
  searchable?: boolean
  searchablePlaceholder?: string

  optionValue?: string
  optionLabel?: string

  class?: string
  selectClass?: string
}
