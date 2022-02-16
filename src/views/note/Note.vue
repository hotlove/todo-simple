<template>
  <div class="note-main">
    <router-view/>
  </div>
</template>
<script setup lang="ts">
  import {onMounted} from "vue";
  import {useRouter} from "vue-router";
  const router = useRouter()
  onMounted(() => {
    router.push({name: 'notelist'})
  })
</script>
<style lang="scss">
  .note-main {
    padding: 5px 10px;
    position: relative;
  }
</style>