<template>
  <div class="layout">
    <Header />
    <Nuxt />
    <ToastContainer />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  max-width: 42rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
</style>
