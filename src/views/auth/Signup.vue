<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>
        <input type="text" placeholder="Display Name" v-model="displayName" required />
        <input type="text" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <div class="error" v-if="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { error, signup, isPending } = useSignup()
        const router = useRouter()

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if (!error.value) {
                router.push({ name: 'UserCollections' })
            }
        }

        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        return { email, password, displayName, isPending, error, handleSubmit }
    },
}
</script>

<style></style>
