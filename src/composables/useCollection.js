import { projectFirestore } from '../firebase/config'
import { ref } from 'vue'

const useCollection = (collection) => {
    const error = ref(null)

    const addDocument = async (document) => {
        error.value = null

        try {
            await projectFirestore.collection(collection).add(document)
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, addDocument }
}

export default useCollection
