<template>
  <li>
    <div>
      <a :href="linkEmail">{{ email }} </a>
    </div>

    <p>{{ content }}</p>
  </li>
</template>

<script>
export default {
  props: ["email", "content"],

  computed: {
    linkEmail() {
      return "mailto:" + this.email;
    },
  },
};
</script>

<style scoped>
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

li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
  overflow-wrap: break-word;
  max-height: 10rem;
  overflow: auto;
}

a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8bd3e6;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
