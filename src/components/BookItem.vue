<template>
  <div class="card">
    <div class="card-body" style="background-image: linear-gradient(to right, #bab2b5a7, #979294c7);">
      <img v-if="book.imageLinks && book.imageLinks.thumbnail" :src="book.imageLinks.thumbnail" class="img-fluid" alt="Book Cover" />
      <h5 class="card-title">{{ book.title }}</h5>
      <p class="card-text">{{ truncatedAuthors }}</p>
      <p class="card-text" v-if="book.description">{{ truncateDescription(book.description) }}</p>
      <div class="button-container">
        <a :href="book.infoLink" target="_blank" class="btn btn-primary btn-sm mr-2">Learn More</a>
        <button @click="deleteBook" class="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    deleteBook: Function,
  },
  computed: {
    truncatedAuthors() {
      const maxLength = 150;
      return this.book.authors
        ? 'By ' + (this.book.authors.join(', ').length > maxLength
          ? this.book.authors.join(', ').slice(0, maxLength) + '...'
          : this.book.authors.join(', '))
        : 'Unknown Author';
    },
  },
  methods: {
    truncateDescription(description) {
      const maxLength = 400;
      return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
}

.img-fluid {
  margin-bottom: 15px;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
}

.btn-primary,
.btn-danger {
  flex: 1;
}

.btn-sm {
  max-width: 120px;
}
</style>