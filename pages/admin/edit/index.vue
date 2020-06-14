<template>
  <div class="page-wrapper">
    <admin-header />
    <recipe-form :recipe-object="recipeObject" />
  </div>
</template>

<script>
import AdminHeader from '@/components/blocks/admin/Header'
import RecipeForm from '@/components/blocks/admin/RecipeForm'
export default {
  components: { AdminHeader, RecipeForm },
  props: {},
  async fetch() {
    // if (this.$route.params.slug === null) {
    //   this.recipeObject = {}
    // } else {
    //   const response = this.$fireStore
    //     .collection('recipes')
    //     .doc(this.$route.params.slug)
    //   await response.get().then((querySnapshot) => {
    //     if (querySnapshot.empty) {
    //       return this.$nuxt.error({
    //         statusCode: 404,
    //         message: 'No Recipes Found'
    //       })
    //     } else {
    //       this.recipeObject = querySnapshot.data()
    //     }
    //   })
    // }
  },

  data() {
    return {
      categoriesList: [],
      recipeObject: {}
    }
  },

  methods: {},
  head() {
    return {
      title: 'Add New'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  min-height: 100vh;
}

.article-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .article-card-block {
    width: calc(100% - 2 * 1rem);
    margin: 1rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    @media (min-width: $screen-sm) {
      width: calc(50% - 2 * 1rem);
    }
    @media (min-width: $screen-lg) {
      width: calc(33.33333% - 2 * 1rem);
    }
  }
}

.no-more-results {
  text-align: center;
  color: grey;
  margin: 1rem;
  overflow: hidden;
  box-shadow: -9px -9px 16px #f8fafe, 9px 9px 16px #ced2db;
}
</style>
