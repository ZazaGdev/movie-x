<template>
    <div v-for="collection in collections" :key="collection.id">
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
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
}
img {
    max-width: 150%;
    max-height: 150%;
    display: block;
}
.info {
    margin: 0 30px;
}
.movie-number {
    margin-left: auto;
}
</style>
