<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    name: 'CategoryOthers',

    setup() { },
})
</script>

<template>
    <div id="category">
        <!-- Category Home -->
        <LazyCategorySingleParent category="others" />
        <!-- Category Home -->

        <!-- More Category -->
        <LazyCategoryMore category="others" />
        <!-- More Category -->
    </div>
</template>
