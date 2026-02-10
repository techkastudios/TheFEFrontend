<template>
  <script type="application/ld+json">
  {{ jsonldData }}
  </script>
</template>

<script>
export default {
  props: {
    jsonldData: {
      type: Object,
      required: true,
    },
  },
}
</script>