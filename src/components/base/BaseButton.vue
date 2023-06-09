<template>
  <button  v-if="!isLink" :class="mode">
    <slot></slot>
  </button>
  <router-link  v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },

    isLink: {
      type: Boolean,
      required: false,
      default: false,
    },

    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;

  border: 1px solid #ffffff;
  color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}


.full-button {
  background-color: #321d99;
}

.outline-button {
  /* background-color: transparent; */
  background-color: #3f31bf;
  
}

.register-button {
  border: none;
  background-color: #3f31bf;
}

.register-button:hover,
.register-button:active{
  border: 1px solid white;
}

.full-button:hover,
.full-button:active {
  background-color: #3f31bf;
}

.outline-button:hover,
.outline-button:active {
  background-color: #321d99;
}

/* .flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #321d99;
}


.active:hover,
.active:active {
  background-color: #321d99;
}
 */
/* .delete {
  background-color: rgb(225, 37, 37);
  border: none;
 
}

.edit {
  background-color: rgb(255, 204, 0);
  border: none;
}
 */


    
</style>