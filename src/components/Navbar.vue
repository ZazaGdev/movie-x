<template>
    <div class="navbar">
        <nav>
            <h1>
                <router-link :to="{ name: 'Home' }">Movie<span>X</span></router-link>
            </h1>

            <div class="links">
                <div v-if="user">
                    <button @click="handleLogout">Logout</button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
                    <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '@/composables/getUser'

export default {
    setup() {
        const { logout } = useLogout()
        const router = useRouter()
        const { user } = getUser()
        console.log(user.value)

        const handleLogout = async () => {
            await logout()

            console.log('User Logged Out')
            router.push({ name: 'Login' })
        }

        return { handleLogout, user }
    },
}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}
nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav img {
    max-height: 60px;
}
nav h1 {
    margin-left: 20px;
}
nav h1 a {
    display: flex;
    align-items: center;
}
nav h1 span {
    font-size: 2rem;
}
nav .links {
    margin-left: auto;
}
nav .links a,
button {
    margin-left: 16px;
    font-size: 14px;
}
</style>
