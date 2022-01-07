<template>
  <div class="layout">
    <Header />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  max-width: 700px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.content {
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 30px auto;
}
</style>
