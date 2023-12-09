<template>
  <div>
    <h2>My Bookshelf</h2>
    <router-link to="/search">
      <button class="btn btn-primary mb-3">Search for Books</button>
    </router-link>
    <div v-for="(book, index) in books" :key="book.volumeInfo.id" class="mb-3" style="display: flex; justify-content: center;">
      <div class="card" style="width: 95%;">
        <BookItem :book="book.volumeInfo" :deleteBook="() => deleteBookAtIndex(index)" />
      </div>
    </div>
  </div>
</template>
  
  <script>
  import BookItem from '../components/BookItem.vue';
  
  export default {
    components: {
      BookItem,
    },
    data() {
      return {
        books: this.loadBooksFromStorage(),
      };
    },
    methods: {
      loadBooksFromStorage() {
        const storedBooks = localStorage.getItem('bookshelf');
        return storedBooks ? JSON.parse(storedBooks) : [];
      },
      deleteBookAtIndex(index) {
        const newBooks = [...this.books];
        newBooks.splice(index, 1);
        this.books = newBooks;
        this.saveBooksToStorage();
      },
      saveBooksToStorage() {
        localStorage.setItem('bookshelf', JSON.stringify(this.books));
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    height: 100%; /* Make all cards the same height */
  }
  
  /* Add any additional styling as needed */
  </style>