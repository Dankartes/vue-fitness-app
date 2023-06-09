<template>
  <div>
    <base-window
      :visible="!!error"
      title="An error has occurred!"
      @close="resolveError"
    >
      <p>{{ error }}</p>
    </base-window>

    <section>
      <base-card>
        <header>
          <h2>My messages</h2>
        </header>
        <base-loading v-if="isLoading"></base-loading>

        <ul v-else-if="hasMessages && !isLoading">
          <message-item
            v-for="msg in receivedMessages"
            :key="msg.id"
            :email="msg.email"
            :content="msg.content"
          ></message-item>
        </ul>

        <h3 v-else>No messages!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import MessageItem from "../../components/messages/MessageItem.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  components: {
    MessageItem,
  },

  computed: {
    receivedMessages() {
      return this.$store.getters["messages/getMessages"];
    },

    hasMessages() {
      return this.$store.getters["messages/hasMessages"];
    },
  },

  created() {
    this.loadMessages();
  },
  methods: {
    async loadMessages() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("messages/loadMessagesFirebase");
      } catch (error) {
        this.error = error.message || "A aparut o eroare!";
      }
      this.isLoading = false;
    },

    resolveError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
