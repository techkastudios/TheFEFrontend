<script lang="ts">
import { defineComponent, h } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VContainer',

  props: {
    tag: {
      type: String,
      default: 'section',
    },
  },

  setup(props, { slots }) {
    return () =>
      h(
        props.tag,
        {
          class: ['container', 'mx-auto', 'px-4', '2sm:px-0', '2xl:px-4'],
        },
        slots.default?.()
      )
  },
})
</script>
