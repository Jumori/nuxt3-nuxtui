<template>
  <div
    :class="`min-h-screen w-screen ${
      isDarkTheme ? 'bg-gray-900' : 'bg-zinc-200'
    }`"
  >
    <div class="container mx-auto flex flex-col items-center justify-center">
      <Logo height="160" width="160" :color="appConfig.theme.main[400]" />

      <div class="w-[50%]">
        <div
          class="flex justify-center items-center border-[1px] border-main-500 rounded-lg my-10"
        >
          <SysButton
            type="button"
            variant="ghost"
            :icon="isDarkTheme ? 'i-mdi-weather-sunny' : 'i-mdi-weather-night'"
            class="min-w-min h-min"
            @click="() => (isDarkTheme = !isDarkTheme)"
          />

          <SysButton
            type="button"
            variant="ghost"
            icon="i-mdi-dock-window"
            class="min-w-min h-min"
            @click="() => (isModalOpen = !isModalOpen)"
          />
        </div>

        <div class="my-10">
          <Accordion
            class="my-6"
            :items="[
              {
                label: `Lista de produtos <span class='text-main-400 font-bold'>(Valor Total: R$200,00)</span>`,
                closeOthers: false
              },
              {
                label: 'Dados Pessoais',
                closeOthers: false,
                dynamicContent: [
                  {
                    label: 'Seu dados',
                    content: [
                      {
                        label: 'Nome pessoal',
                        value: 'John Doe'
                      },
                      {
                        label: 'Data de nascimento',
                        value: '01/01/1990'
                      },
                      {
                        label: 'Gênero',
                        value: 'Masculino'
                      }
                    ],
                    redirectEdit: '/dados-pessoais'
                  },
                  {
                    label: 'Endereço',
                    content: [
                      {
                        label: 'CEP',
                        value: 'xxxxx-xxx'
                      }
                    ],
                    redirectEdit: '/endereco'
                  }
                ]
              },
              {
                label: 'Dados Adicionais',
                content:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.',
                closeOthers: false
              }
            ]"
            multiple
            default-open
            @edit:section="redirectTo => console.log(redirectTo)"
          />
        </div>

        <UForm
          ref="form"
          :schema="schema"
          :state="state"
          class="flex flex-col justify-center items-center gap-3 my-4"
          @submit.prevent="handleSubmit"
        >
          <SysInput
            name="cpf"
            label="CPF"
            inputmask="cpf"
            placeholder="xxx.xxx.xxx-xx"
            required
            :value="state.cpf"
            @update:value="value => (state.cpf = value)"
          />

          <SysInput
            name="email"
            label="E-mail"
            placeholder="email@email.com"
            required
            :value="state.email"
            @update:value="value => (state.email = value)"
          />

          <SysInput
            name="password"
            label="Senha"
            type="password"
            placeholder="******"
            required
            :value="state.password"
            @update:value="value => (state.password = value)"
          />

          <SysSelect
            name="gender"
            label="Gênero"
            placeholder="Selecione uma opção"
            required
            :value="state.gender"
            :options="[
              { label: 'Feminino', value: 'F' },
              { label: 'Masculino', value: 'M' }
            ]"
            optionLabel="label"
            optionValue="value"
            searchable
            @update:value="value => (state.gender = value as string)"
          />

          <SysCheckbox
            name="acceptance"
            :value="state.acceptance"
            @update:value="value => (state.acceptance = value)"
          >
            Declaro que li e concordo com as informações contidas nos
            <a
              href="/"
              target="_blank"
              class="text-main-400 underline hover:text-main-500 transition-colors"
            >
              Termos de uso </a
            >.
          </SysCheckbox>

          <SysButton type="submit" block class="mt-10">Submit</SysButton>
        </UForm>
      </div>
    </div>

    <SysModal
      :open="isModalOpen"
      size="lg"
      @close="() => (isModalOpen = false)"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <h1 :class="`text-xl font-bold`">Modal Title</h1>

          <SysButton
            type="button"
            variant="ghost"
            icon="i-mdi-close"
            color="white"
            class="min-w-min h-min"
            @click="() => (isModalOpen = false)"
          />
        </div>
      </template>

      <div class="flex justify-center items-center bg-zinc-500 h-40 rounded">
        Some content here
      </div>

      <template #footer>
        <div class="flex justify-center items-center">
          <SysButton
            type="button"
            variant="link"
            icon="i-mdi-chevron-left"
            @click="() => (isModalOpen = false)"
          >
            Voltar
          </SysButton>
        </div>
      </template>
    </SysModal>
  </div>
</template>

<script setup lang="ts">
import { boolean, object, string } from 'yup'

const colorMode = useColorMode()
const appConfig = useAppConfig()
const toast = useNotification()

const form = ref()
const state = ref({
  cpf: '',
  email: '',
  password: '',
  gender: '',
  acceptance: false
})
const isModalOpen = ref(false)
const isDarkTheme = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const schema = object({
  cpf: string().cpf().required('Campo obrigatório'),
  email: string().email('E-mail inválido').required('Campo obrigatório'),
  password: string()
    .min(8, 'Campo deve ter ao menos 8 caracteres')
    .required('Campo obrigatório'),
  gender: string().required('Campo obrigatório'),
  acceptance: boolean()
    .required('Campo obrigatório')
    .oneOf([true], 'Campo obrigatório')
})

const handleSubmit = async () => {
  try {
    await form.value!.validate()
    console.log(JSON.stringify(state.value, null, 2))

    toast.success({
      id: 'index-valid-form',
      title: 'Dados enviados com sucesso!'
    })
  } catch (error) {
    console.error(error)

    toast.error({
      id: 'index-invalid-form',
      title: 'Formulário inválido',
      description: 'Verifique se preencheu os campos corretamente'
    })
  }
}
</script>
