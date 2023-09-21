import { projectFirestore } from '../firebase/config'
import { ref, watchEffect } from 'vue'

const getCollection = (collection) => {
    const error = ref(null)
    const documents = ref(null)

    let collectionRef = projectFirestore.collection(collection).orderBy('sentAt')

    const unsub = collectionRef.onSnapshot(
        (snap) => {
            let results = []

            snap.docs.forEach((doc) => {
                doc.data().sentAt && results.push({ ...doc.data(), id: doc.id })
            })

            documents.value = results
            error.value = null
        },
        (err) => {
            error.value = err.message
            documents.value = null
            error.value = 'Could not fetch data'
        }
    )

    watchEffect((onInvalidate) => {
        // unsubscribe from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => {
            unsub()
        })
    })

    return { documents, error }
}

export default getCollection
