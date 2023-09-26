<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="text" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Login</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { error, login, isPending } = useLogin()

        const router = useRouter()

        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)
            if (!error.value) {
                router.push({ name: 'UserCollections' })
            }
        }

        return { email, password, handleSubmit, error, isPending }
    },
}
</script>

<style></style>
