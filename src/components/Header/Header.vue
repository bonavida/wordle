<template>
  <div class="header">
    <h1>Wordle</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {},
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 20px;
  border-bottom: 1px solid #d3d3d4;
}

h1 {
  color: #003543;
  font-size: 28px;
  font-weight: 700;
}
</style>
