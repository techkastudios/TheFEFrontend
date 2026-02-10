<script lang="ts">
import { defineComponent, h } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'VHeading',

  props: {
    level: {
      type: Number,
      default: 3
    }
  },

  setup(props, { slots }) {
    return () => h('h' + props.level, {}, slots.default?.());
  },
});
</script>
