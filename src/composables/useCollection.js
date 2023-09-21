import { projectFirestore } from '../firebase/config'
import { ref } from 'vue'

const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    const addDocument = async (document) => {
        error.value = null
        isPending.value = true

        try {
            await projectFirestore.collection(collection).add(document)
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = err.message
            isPending.value = false
        }
    }

    return { error, addDocument, isPending }
}

export default useCollection
