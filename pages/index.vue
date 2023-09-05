<template>
  <div class="bg-zinc-800 h-screen w-screen">
    <div class="container mx-auto flex flex-col items-center justify-center">
      <Logo height="160" width="160" :color="appConfig.theme.primary[500]" />

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
              class="text-primary-400 underline hover:text-primary-300 transition-colors"
            >
              Termos de uso </a
            >.
          </SysCheckbox>

          <SysButton type="submit" block class="mt-8">Submit</SysButton>
        </UForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { boolean, object, string } from 'yup'

const appConfig = useAppConfig()

const form = ref()
const state = ref({
  cpf: '',
  email: '',
  password: '',
  gender: '',
  acceptance: false
})
const schema = object({
  cpf: string().cpf().required('Campo obrigatório'),
  email: string().email('E-mail inválido').required('Campo obrigatório'),
  password: string()
    .min(8, 'Campo deve ter ao menos 8 caracteres')
    .required('Campo obrigatório'),
  gender: string().required('Campo obrigatório'),
  acceptance: boolean().required('Campo obrigatório').oneOf([true], 'Campo obrigatório')
})

async function handleSubmit() {
  try {
    await form.value!.validate()
    console.log(JSON.stringify(state.value, null, 2))

  } catch (error) {
    console.error(error)
  }
}
</script>
