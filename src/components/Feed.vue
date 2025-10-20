<template>
  <div>
    <h2>Muro</h2>
    <textarea v-model="newText" placeholder="Escribe algo..."></textarea><br>
    <input type="file" @change="handleImage" /><br><br>
    <button @click="addPost">Publicar</button>

    <div id="feed">
      <Post
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        :index="index"
        @update="savePosts"
      />
    </div>
  </div>
</template>

<script>
import Post from './Post.vue'

export default {
  name: 'Feed',
  components: { Post },
  data() {
    return {
      posts: JSON.parse(localStorage.getItem("posts")) || [],
      newText: '',
      newImage: null
    }
  },
  methods: {
    handleImage(e) {
      this.newImage = e.target.files[0]
    },
    addPost() {
      if (!this.newText && !this.newImage) return alert("Agrega texto o imagen")

      let newPost = {
        text: this.newText,
        image: null,
        date: new Date().toLocaleDateString(),
        likes: 0,
        comments: []
      }

      if (this.newImage) {
        const reader = new FileReader()
        reader.onload = (e) => {
          newPost.image = e.target.result
          this.posts.unshift(newPost)
          this.savePosts()
        }
        reader.readAsDataURL(this.newImage)
      } else {
        this.posts.unshift(newPost)
        this.savePosts()
      }

      this.newText = ''
      this.newImage = null
    },
    savePosts() {
      localStorage.setItem("posts", JSON.stringify(this.posts))
    }
  }
}
</script>
