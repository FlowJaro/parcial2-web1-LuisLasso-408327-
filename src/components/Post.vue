<template>
  <div class="post">
    <p><strong>Usuario</strong> - {{ post.date }}</p>
    <p>{{ post.text }}</p>
    <div class="post-content">
      <img v-if="post.image" :src="post.image" style="max-width:200px;" />
    </div>
    <button @click="likePost">👍 Me gusta</button> <span>{{ post.likes }}</span>
    <button @click="addComment">💬 Comentar</button>
    <div class="comments">
      <p v-for="c in post.comments" :key="c">💬 {{ c }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post', 'index'],
  emits: ['update'],
  methods: {
    likePost() {
      this.post.likes++
      this.$emit('update')
    },
    addComment() {
      const comment = prompt("Escribe tu comentario:")
      if (comment) {
        this.post.comments.push(comment)
        this.$emit('update')
      }
    }
  }
}
</script>
