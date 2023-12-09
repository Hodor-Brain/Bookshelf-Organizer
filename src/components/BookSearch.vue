<template>
  <div>
    <h2>Our Library</h2>
    <router-link to="/">
      <button class="btn btn-primary mb-3">My Bookshelf</button>
    </router-link>
    <form @submit.prevent="searchBooks">
      <label style="margin-right: 10px;">
        Search:
        <input v-model="searchQuery" :maxlength="50" required />
      </label>
      <label style="margin-left: 10px; margin-right: 10px;">
        Language:
        <select v-model="searchLanguage">
          <option value="uk">Ukrainian</option>
          <option value="en">English</option>
        </select>
      </label>
      <button type="submit" class="btn btn-success" style="margin-left: 10px;">Search</button>
    </form>
    <div v-if="searchResults.length > 0" class="search-results">
      <h3>Search Results</h3>
      <div v-for="result in searchResults" :key="result.id" class="card mb-3" style="width: 95%; margin-left: auto; margin-right: auto;">
        <div class="card-body d-flex justify-content-between align-items-center" style="background-image: linear-gradient(to right, #bab2b5a7, #979294c7);">
          <div class="book-info">
            <h4>{{ result.volumeInfo.title }}</h4>
            <p v-if="result.volumeInfo.authors">By: {{ result.volumeInfo.authors.join(', ') }}</p>
            <p v-if="result.volumeInfo.publishedDate">Published: {{ result.volumeInfo.publishedDate }}</p>
            <div class="d-flex" style="gap: 20px; justify-content: center; margin: auto;">
              <p v-if="result.volumeInfo.description" style="text-align: justify;">{{ result.volumeInfo.description }}</p>
              <div class="book-thumbnail">
                <img v-if="result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.thumbnail" 
                  :src="result.volumeInfo.imageLinks.thumbnail" 
                  alt="Book Cover" />
              </div>
            </div>
            <div class="button-container">
              <a :href="result.volumeInfo.infoLink" target="_blank" class="btn btn-primary btn-sm">Learn More</a>
              <button @click="addBook(result)" class="btn btn-success btn-sm">Add to Bookshelf</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="duplicateBook" class="alert alert-danger">
      <p>You already have this book in your bookshelf.</p>
    </div>
    <div v-if="nonDuplicateBook" class="alert alert-success">
      <p>Successfully added to your bookshelf.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      searchLanguage: 'uk', // Default language
      searchResults: [],
      duplicateBook: false,
      nonDuplicateBook: false,
    };
  },
  methods: {
    async searchBooks() {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${this.searchQuery}&langRestrict=${this.searchLanguage}`
        );
        this.searchResults = response.data.items;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    addBook(book) {
      const storedBooks = localStorage.getItem('bookshelf');
      const books = storedBooks ? JSON.parse(storedBooks) : [];

      // Check if the book already exists in the bookshelf
      if (books.some((b) => b.id === book.id)) {
        this.duplicateBook = true;
        setTimeout(() => {
          this.duplicateBook = false;
        }, 3000);
        return;
      }

      books.push(book);
      localStorage.setItem('bookshelf', JSON.stringify(books));
      this.nonDuplicateBook = true;
        setTimeout(() => {
          this.nonDuplicateBook = false;
        }, 3000);
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.book-info {
  flex: 1;
  margin-right: 10px;
}

.book-thumbnail img {
  max-width: 100px;
}

.search-results {
  margin-top: 45px;
}

.button-container {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.alert {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
  z-index: 1000; /* Adjust the z-index as needed */
}

</style>