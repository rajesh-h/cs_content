<template>
  <div class="page-wrapper">
    <admin-header />
    <div v-if="notFound">This Recipe Not Available</div>
    <div v-if="!notFound">
      <div v-if="addNew">
        <recipe-form />
      </div>
      <div v-if="!addNew">
        <recipe-form :recipe-object="recipeObject" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/blocks/admin/Header'
import RecipeForm from '@/components/blocks/admin/RecipeForm'
export default {
  components: { AdminHeader, RecipeForm },
  props: {},
  async fetch() {
    if (this.$route.params.slug === 'addnew') {
      this.addNew = true
    } else {
      const response = this.$fireStore
        .collection('recipes')
        .doc(this.$route.params.slug)
      await response.get().then((querySnapshot) => {
        // eslint-disable-next-line no-console
        // console.log(querySnapshot.data())
        if (querySnapshot.data() === undefined) {
          this.notFound = true
        } else {
          this.recipeObject = querySnapshot.data()
          // eslint-disable-next-line no-console
          // console.log(this.recipeObject)
        }
      })
    }
  },

  data() {
    return {
      categoriesList: [],
      recipeObject: undefined,
      addNew: false,
      notFound: false
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
