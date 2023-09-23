<template>
    <form @submit.prevent="handleCreatePlaylist">
        <h4>Create New Movie Collection</h4>
        <input type="text" required placeholder="Collection Title" v-model="title" />
        <textarea required placeholder="Collection Description" v-model="description"></textarea>

        <label>Upload Playlist Cover Image</label>
        <div class="error"></div>
        <input type="file" />
        <button>Create</button>
    </form>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const title = ref('')
        const description = ref('')

        const handleCreatePlaylist = () => {
            console.log(title.value, description.value)
        }

        return { title, description, handleCreatePlaylist }
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
