<template>
    <div v-for="collection in collections" :key="collection.id">
        <router-link :to="{ name: 'CollectionDetails', params: { id: collection.id } }">
            <div class="single-collection">
                <div class="thumbnail">
                    <img :src="collection.coverUrl" />
                </div>

                <div class="info">
                    <h3>{{ collection.title }}</h3>
                    <p>Created By {{ collection.userName }}</p>
                </div>

                <div class="movie-number">
                    <p>{{ collection.movies.length }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['collections'],
}
</script>

<style scoped>
.single-collection {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
}
.single-collection:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
}
.thumbnail {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 10px;
}
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.info {
    margin: 0 30px;
}
.movie-number {
    margin-left: auto;
}
</style>
