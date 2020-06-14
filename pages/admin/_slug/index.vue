<template>
  <div class="page-wrapper">
    <div class="article-content-wrapper">
      <article-block class="article-block" />
      <div class="aside-widget-wrapper">
        <aside-block class="aside-widget-block" />
      </div>
    </div>
    <!-- <comments-block class="comments-block" /> -->
  </div>
</template>

<script>
import ArticleBlock from '@/components/blocks/ArticleBlock'
// import CommentsBlock from '@/components/blocks/CommentsBlock'
import AsideBlock from '@/components/blocks/AsideBlock'

export default {
  components: {
    ArticleBlock,
    // CommentsBlock,
    AsideBlock
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
}

.article-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 2rem;
  @media (min-width: $screen-lg) {
    align-items: normal;
    flex-direction: row;
  }
  .article-block {
    width: 100%;
    max-width: 880px;
    @media (min-width: $screen-lg) {
      margin-right: 1rem;
      width: 66.66666%;
      margin-bottom: 2rem;
    }
  }
  .aside-widget-wrapper {
    max-width: 880px;
    width: 100%;
    @media (min-width: $screen-lg) {
      display: block;
      width: 33.33333%;
    }
    position: relative;
    .aside-widget-block {
      position: sticky;
      top: 1rem;
      // margin: 0.5rem;
    }
  }
}

.comments-block {
  @media (min-width: $screen-xl) {
    margin: 0.5rem;
  }
}
</style>
