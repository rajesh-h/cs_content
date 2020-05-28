<template>
  <div class="page-wrapper">
    <template v-if="$fetchState.pending && !articles.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="article-cards-wrapper">
        <article-card-block
          v-for="(article, i) in articles"
          :key="article.id"
          v-observe-visibility="
            i === articles.length - 1 ? lazyLoadArticles : false
          "
          :article="article"
          class="article-card-block"
        />
      </div>
    </template>
    <template v-if="$fetchState.pending && articles.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 30"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <div v-if="noFurtherResult" class="no-more-results">
      There are no more Recipes
    </div>
  </div>
</template>

<script>
import ArticleCardBlock from '@/components/blocks/ArticleCardBlock'
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'

export default {
  components: {
    ArticleCardBlock,
    InlineErrorBlock
  },
  props: {
    queryType: {
      type: String,
      default: 'index'
    }
  },
  async fetch() {
    let qry
    switch (this.queryType) {
      case 'index':
        qry = this.$content()
        break
      case 'category':
        qry = this.$content().where({
          searchTags: { $contains: 'Falooda' }
        })
        break
      default:
        qry = this.$content()
    }

    const recipes = await qry
      .only([
        'slug',
        'featuredImage',
        'title',
        'serves',
        'totalTime',
        'updated',
        'categories'
      ])
      .sortBy('updated', 'desc')
      .skip(this.skipCnt)
      .limit(this.limitCnt)
      .fetch()

    if (recipes.length !== 0) {
      this.articles.push(...recipes)
    } else {
      this.noFurtherResult = true
    }
  },
  data() {
    return {
      lastVisible: null,
      articles: [],
      skipCnt: 0,
      limitCnt: 10,
      noFurtherResult: false
    }
  },
  // activated() {
  //   // Call fetch again if last fetch more than 60 secs ago
  //   if (this.$fetchState.timestamp <= Date.now() - 60000) {
  //     this.$fetch()
  //   }
  // },
  methods: {
    lazyLoadArticles(isVisible) {
      if (isVisible) {
        if (!this.noFurtherResult) {
          this.skipCnt += this.limitCnt
          this.$fetch()
        }
        // }
      }
    }
  },
  head() {
    return {
      title: 'CookingShooking'
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
