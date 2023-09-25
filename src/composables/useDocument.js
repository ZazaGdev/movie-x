import { projectFirestore } from '../firebase/config'
import { ref } from 'vue'

const useDocument = (collection, documentId) => {
    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(documentId)

    const deleteDoc = async () => {
        isPending.value = true
        error.value = null

        try {
            const res = await docRef.delete()
            isPending.value = false
            return res
        } catch (error) {
            console.log(error.message)
            isPending.value = false
            error.value = 'Could not delete the document'
        }
    }

    const updateDoc = async (updates) => {
        isPending.value = true
        error.value = null

        try {
            const res = await docRef.update(updates)
            isPending.value = false
            return res
        } catch (error) {
            console.log(error.message)
            isPending.value = false
            error.value = 'Could not update the document'
        }
    }

    return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument
