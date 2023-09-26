<template>
    <div class="add-movie">
        <button v-if="!showForm" @click="showForm = true">Add Movie</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h2>Add a new movie</h2>
            <input type="text" placeholder="Movie Title" required v-model="title" />
            <input type="text" placeholder="director" required v-model="director" />
            <button>Add</button>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'

export default {
    props: ['collection'],
    setup(props) {
        const title = ref('')
        const director = ref('')
        const showForm = ref(false)

        const { updateDoc } = useDocument('collections', props.collection.id)

        const handleSubmit = async () => {
            let newMovie = {
                title: title.value,
                director: director.value,
                id: Math.floor(Math.random() * 1000000),
            }

            const res = await updateDoc({
                movies: [...props.collection.movies, newMovie],
            })

            title.value = ''
            director.value = ''
        }

        return { title, director, showForm, handleSubmit }
    },
}
</script>
<style scoped>
.add-movie {
    text-align: center;
    margin-top: 40px;
}

form {
    max-width: 100%;
    text-align: left;
}
</style>
