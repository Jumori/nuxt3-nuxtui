<template>
  <div class="bg-zinc-800 h-screen w-screen">
    <div class="container mx-auto flex flex-col items-center justify-center">
      <Logo height="160" width="160" :color="appConfig.theme.main.DEFAULT" />

      <div class="w-[50%]">
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
              class="text-main underline hover:text-main-500 transition-colors"
            >
              Termos de uso </a
            >.
          </SysCheckbox>

          <SysButton
            type="button"
            variant="ghost"
            icon="i-mdi-dock-window"
            class="min-w-min h-min"
            @click="() => (isModalOpen = !isModalOpen)"
          />

          <SysButton
            type="button"
            block
            variant="link"
            icon="i-mdi-chevron-left"
            class="mt-8"
            @click="() => console.log('return clicked')"
          >
            Voltar
          </SysButton>
          <SysButton type="submit" block>Submit</SysButton>
        </UForm>
      </div>
    </div>

    <SysModal :open="isModalOpen" size="lg" @close="() => (isModalOpen = false)">
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-white text-xl font-bold">Modal Title</h1>

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
