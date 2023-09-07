export interface AccordionItemDynamicContentSection {
  label: string
  content: AccordionItemDynamicContent[]
  redirectEdit?: string
}

export interface AccordionItemDynamicContent {
  label: string
  value: string
}

export interface AccordionItem {
  label: string
  content?: string
  dynamicContent?: AccordionItemDynamicContentSection[]

  defaultOpen?: boolean
  closeOthers?: boolean
  disabled?: boolean

  class?: string
}

export interface AccordionProps {
  items: AccordionItem[]
  openIcon?: string
  closeIcon?: string
  multiple?: boolean
  defaultOpen?: boolean
}
