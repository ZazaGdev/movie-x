<template>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-if="collection" class="collection-details">
        <div class="collection-info">
            <div class="cover">
                <img :src="collection.coverUrl" />
            </div>
            <h2>{{ collection.title }}</h2>
            <p class="username">Created by {{ collection.userName }}</p>
            <p class="description">{{ collection.description }}</p>
            <button v-if="ownership" @click="handleDelete">Delete collection</button>
        </div>

        <div class="movie-list">
            <div v-if="!collection.movies.length">No Movies have been added to this collection yet</div>
            <div v-for="movie in collection.movies" :key="movie.id" class="single-movie">
                <div class="details">
                    <h3>{{ movie.title }}</h3>
                    <p>{{ movie.director }}</p>
                </div>
                <button v-if="ownership" @click="handleDeleteMovie(movie.id)">Delete Movie</button>
            </div>
            <AddMovie v-if="ownership" :collection="collection" />
        </div>
    </div>
</template>

<script>
import AddMovie from '@/components/AddMovie.vue'
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    props: ['id'],
    components: { AddMovie },
    setup(props) {
        const { error, document: collection } = getDocument('collections', props.id)
        const { user } = getUser()
        const { deleteDoc, updateDoc } = useDocument('collections', props.id)
        const { deleteImage } = useStorage()

        const router = useRouter()

        const ownership = computed(() => {
            return collection.value && user.value && user.value.uid == collection.value.userId
        })

        const handleDeleteMovie = async (id) => {
            let movies = collection.value.movies.filter((movie) => movie.id != id)
            await updateDoc({ movies })
        }

        const handleDelete = async () => {
            await deleteImage(collection.value.filePath)
            await deleteDoc()
            router.push({ name: 'Home' })
        }

        return { error, collection, ownership, handleDelete, handleDeleteMovie }
    },
}
</script>

<style>
.collection-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
}
.cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}

.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.collection-info {
    text-align: center;
}
.collection-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}
.collection-info p {
    margin-bottom: 20px;
}
.username {
    color: #999;
}
.description {
    text-align: left;
}
.single-movie {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}
</style>
