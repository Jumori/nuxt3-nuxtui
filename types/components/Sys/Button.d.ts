export interface ButtonProps {
  loading?: boolean
  color?: string
  type?: string
  disabled?: boolean
  block?: boolean
  variant?: 'solid' | 'outline' | 'link' | 'ghost'
  icon?: string
  trailing?: boolean
  size: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  class?: string
}
