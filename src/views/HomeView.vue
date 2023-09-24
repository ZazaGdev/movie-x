<template>
    <div class="home">
        <div class="error" v-if="error">
            {{ error }}
        </div>

        <div v-if="documents">
            <div v-for="doc in documents" :key="doc.id">
                {{ doc.title }}
            </div>
        </div>
    </div>
</template>

<script>
import getCollection from '../composables/getCollection'

export default {
    name: 'HomeView',
    setup() {
        const { documents, error } = getCollection('collections')
        return { documents, error }
    },
}
</script>
