<template>
  <div class="header">
    <HowTo />
    <div class="title">
      <Logo />
      <h1>Wordle</h1>
    </div>
    <Preferences />
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
  padding: 10px 20px;
  border-bottom: 1px solid #d3d3d4;
}

.title {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

h1 {
  color: #003543;
  font-size: 28px;
  font-weight: 700;
}
</style>
