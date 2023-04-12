<template>
  <div class="publish-page">
    <h1>Publish Property</h1>
    <form class="publish-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" />
        <span v-if="!titleValid">Please enter a title</span>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" id="price" v-model.number="price" />
        <span v-if="!priceValid">Please enter a valid price</span>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description"></textarea>
        <span v-if="!descriptionValid">Please enter a description</span>
      </div>
      <button class="btn btn-primary">Publish</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PublishPage",
  data() {
    return {
      title: "",
      price: 0,
      description: "",
    };
  },
  computed: {
    titleValid() {
      return this.title.trim().length > 0;
    },
    priceValid() {
      return this.price > 0;
    },
    descriptionValid() {
      return this.description.trim().length > 0;
    },
    formValid() {
      return this.titleValid && this.priceValid && this.descriptionValid;
    },
  },
  methods: {
    submitForm() {
      if (!this.formValid) {
        return;
      }
      // TODO: submit form data
      console.log("Form submitted");
    },
  },
};
</script>

<style scoped>
.publish-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.publish-form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

input,
textarea {
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #3f51b5;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #1a237e;
}

span {
  color: red;
}
</style>
