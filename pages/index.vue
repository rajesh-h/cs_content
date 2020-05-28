<template>
  <main-block />
</template>

<script>
import MainBlock from '@/components/blocks/MainBlock'

export default {
  components: {
    MainBlock
  },
  data() {
    return {
      queryType: 'index'
    }
  }
}
</script>
