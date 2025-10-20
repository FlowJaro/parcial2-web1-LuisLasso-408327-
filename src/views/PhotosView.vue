<template>
  <div>
    <h2>Photos</h2>
    <div class="photos-grid">
      <img v-for="(src, index) in staticPhotos" :key="index" :src="src" />
      <img v-for="(post, i) in posts" v-if="post.image" :key="'dyn'+i" :src="post.image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: JSON.parse(localStorage.getItem("posts")) || [],
      staticPhotos: [
        'assets/Metallica.jpeg',
        'assets/Omen.jpeg',
        'assets/descarga.jpeg',
        'assets/solo leveling Arise.jpeg',
        'assets/Pirlo 4_20 la rata.jpeg',
        'assets/Tokio.jpeg'
      ]
    }
  }
}
</script>
