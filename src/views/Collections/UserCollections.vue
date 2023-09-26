<template>
    <div class="user-collections">
        <h2>My Playlists</h2>
        <div v-if="collections">
            <CollectionsList :collections="collections" />
        </div>
        <router-link class="btn" :to="{ name: 'CreateCollection' }">Create New Playlist</router-link>
    </div>
</template>
<script>
import CollectionsList from '@/components/CollectionsList.vue'
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'

export default {
    setup() {
        const { user } = getUser()
        const { documents: collections } = getCollection('collections', ['userId', '==', user.value.uid])
        return { collections }
    },
    components: { CollectionsList },
}
</script>
