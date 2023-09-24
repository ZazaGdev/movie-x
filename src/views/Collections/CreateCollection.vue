<template>
    <form @submit.prevent="handleCreatePlaylist">
        <h4>Create New Movie Collection</h4>
        <input type="text" required placeholder="Collection Title" v-model="title" />
        <textarea required placeholder="Collection Description" v-model="description"></textarea>

        <label>Upload Playlist Cover Image</label>
        <div class="error">{{ fileError }}</div>
        <input type="file" @change="handleFileUpload" />
        <button>Create</button>
    </form>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const title = ref('')
        const description = ref('')
        const coverImg = ref(null)
        const fileError = ref('')

        const handleCreatePlaylist = () => {
            if (coverImg.value) {
                console.log(title.value, description.value, coverImg.value)
            }
        }

        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']

        const handleFileUpload = (e) => {
            const uploaded = e.target.files[0]

            if (uploaded && allowedFileTypes.includes(uploaded.type)) {
                coverImg.value = uploaded
                fileError.value = null
            } else {
                coverImg.value = null
                fileError.value = 'Please select an image file (png, jpg or jpeg)'
            }
            console.log(coverImg.value)
        }

        return { title, description, handleCreatePlaylist, handleFileUpload, fileError }
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
