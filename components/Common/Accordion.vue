<template>
  <UAccordion
    :items="items"
    :default-open="props.defaultOpen"
    :multiple="props.multiple"
  >
    <template #default="{ item, index, open }">
      <UButton
        color="gray"
        variant="ghost"
        class="border-b border-secondary-200 dark:border-secondary-100"
        :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
      >
        <span class="truncate text-lg font-bold" v-html="item.label" />

        <template #trailing>
          <UIcon
            :name="open ? props.closeIcon : props.openIcon"
            class="w-5 h-5 ms-auto transform transition-transform duration-200"
          />
        </template>
      </UButton>
    </template>

    <template #item="{ item }">
      <UCard
        :ui="{
          background: 'bg-transparent',
          shadow: 'shadow-none',
          ring: 'ring-0',
          body: {
            padding: 'px-1 py-4'
          }
        }"
      >
        <span v-if="!slots.item && item.content" :class="`${item.class || ''}`">
          {{ item.content }}
        </span>

        <div
          v-else-if="!slots.item && item.dynamicContent"
          class="flex flex-col gap-6"
        >
          <div
            v-for="(section, sectionIndex) in item.dynamicContent"
            :key="`${sectionIndex}-${section.label}`"
            :class="`${
              sectionIndex < item.dynamicContent.length - 1
                ? 'border-b-[1px]'
                : ''
            } border-secondary-200 pb-4`"
          >
            <div class="flex items-center justify-between">
              <p class="text-lg font-bold mb-4">{{ section.label }}</p>

              <SysButton
                v-if="section.redirectEdit"
                type="button"
                variant="ghost"
                icon="i-mdi-pencil"
                class="min-w-min h-min"
                @click="() => handleEditSection(section.redirectEdit)"
              />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(item, itemIndex) in section.content"
                :key="`${itemIndex}-${item.label}`"
              >
                <span class="font-bold"> {{ item.label }}: </span>

                {{ item.value }}
              </div>
            </div>
          </div>
        </div>

        <slot name="item" :item="item"></slot>
      </UCard>
    </template>
  </UAccordion>
</template>

<script setup lang="ts">
import { AccordionProps } from '@/types/components/Common/Accordion'

const slots = useSlots()

const props = withDefaults(defineProps<AccordionProps>(), {
  openIcon: 'i-mdi-plus',
  closeIcon: 'i-mdi-minus',
  defaultOpen: false
})

const emits = defineEmits<{
  (event: 'edit:section', sectionRedirect: string): void
}>()

const handleEditSection = (sectionRedirect: string) => {
  emits('edit:section', sectionRedirect)
}
</script>
