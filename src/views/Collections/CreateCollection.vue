<template>
    <form @submit.prevent="handleCreateCollection">
        <h4>Create New Movie Collection</h4>
        <input type="text" required placeholder="Collection Title" v-model="title" />
        <textarea required placeholder="Collection Description" v-model="description"></textarea>

        <label>Upload Collection Cover Image</label>
        <div class="error">{{ fileError }}</div>
        <input type="file" @change="handleFileUpload" />
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Loading...</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import CollectionDetails from './CollectionDetails.vue'

export default {
    setup() {
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDocument } = useCollection('collections')
        const { user } = getUser()

        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref('')
        const isPending = ref(false)

        const handleCreateCollection = async () => {
            if (file.value) {
                isPending.value = true

                await uploadImage(file.value)

                const res = await addDocument({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    movies: [],
                    createdAt: timestamp(),
                })

                isPending.value = false

                if (!error.value) {
                    router.push({name: 'CollectionDetails', params:{ id: res.id }})
                }
            }
        }

        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']

        const handleFileUpload = (e) => {
            const uploaded = e.target.files[0]

            if (uploaded && allowedFileTypes.includes(uploaded.type)) {
                file.value = uploaded
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image file (png, jpg or jpeg)'
            }
            console.log(file.value)
        }

        return { title, description, handleCreateCollection, handleFileUpload, fileError, isPending }
    },
}
</script>

<style>
input[type='file'] {
    border: 0;
    padding: 0;
}
label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}
button {
    margin-top: 20px;
}
</style>
