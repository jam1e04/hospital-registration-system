<template>
  <div v-if="$route.query.orderId">
    <Detail/>
  </div>
  <div v-else>
    <allOrder/>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Detail from './detail/index.vue'
import allOrder from './allOrder/index.vue'
let $route = useRoute()
</script>

<style scoped>

</style>