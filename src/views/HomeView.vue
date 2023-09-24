<template>
    <div class="home">
        <div class="error" v-if="error">
            {{ error }}
        </div>

        <div v-if="documents">
            <CollectionsList :collections="documents" />
        </div>
    </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import CollectionsList from '../components/CollectionsList.vue'
export default {
    name: 'HomeView',
    components: { CollectionsList },
    setup() {
        const { documents, error } = getCollection('collections')
        return { documents, error }
    },
}
</script>
