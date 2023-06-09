<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  overflow-wrap: break-word;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 35rem;
  background-color: #3f31bf;
  max-height: 800px;
}

  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: #3f31bf;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #3f31bf;
    border-radius: 10px;
    border: 1px solid #ffffff;
  }
</style>