import { projectAuth } from '../firebase/config'
import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, userName) => {
    error.value = null
    isPending.value = true

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)

        if (!res) throw new Error("Couldn't complete signup")

        await res.user.updateProfile({
            displayName: userName,
        })

        isPending.value = false
        error.value = null
        return res
    } catch (err) {
        error.value = err.message
        isPending.value = false
        console.log(error.value)
    }
}

const useSignup = () => {
    return { error, signup, isPending }
}

export default useSignup
