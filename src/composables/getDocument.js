import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, documentId) => {
    const document = ref(null)
    const error = ref(null)

    // register the firestore collection reference
    let documentRef = projectFirestore.collection(collection).doc(documentId)

    const unsub = documentRef.onSnapshot(
        (doc) => {
            if (doc.data()) {
                document.value = { ...doc.data(), id: doc.id }
                error.value = null
                console.log('Document data:', document.value) // This should log the actual data
            } else {
                error.value = 'document does not exist'
            }
        },
        (err) => {
            console.log(err.message)
            error.value = 'could not fetch the data'
        }
    )

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { error, document }
}

export default getDocument
