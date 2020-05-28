<template>
  <nuxt-link
    :to="{
      name: 'slug',
      params: { slug: article.slug }
    }"
    tag="article"
  >
    <div class="image-wrapper">
      <img
        v-if="article.featuredImage"
        :src="article.featuredImage"
        :alt="article.title"
      />
      <img v-else :src="article.social_image" :alt="article.title" />
    </div>
    <div class="content">
      <nuxt-link
        :to="{
          name: 'slug',
          params: { slug: article.slug }
        }"
      >
        <h1>{{ article.title }}</h1>
      </nuxt-link>
      <div class="tags">
        <nuxt-link
          v-for="category in article.categories"
          :key="category.slug"
          :to="{ name: 'category-slug', params: { slug: category.slug } }"
          class="tag"
        >
          #{{ category.category }}
        </nuxt-link>
      </div>
      <div class="meta">
        <div class="scl">
          <span v-if="article.serves">
            <serves-icon class="svg24" />
            {{ article.serves }}
          </span>
          <span v-if="article.totalTime" class="comments">
            <time-icon class="svg24" />
            {{ article.totalTime }}
          </span>
        </div>
        <time>{{ article.updated | FormatDate }}</time>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import ServesIcon from '@/assets/icons/serves.svg?inline'
import TimeIcon from '@/assets/icons/time.svg?inline'

export default {
  components: {
    ServesIcon,
    TimeIcon
  },
  props: {
    article: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: $shadow;
  cursor: pointer;
  &:hover {
    box-shadow: $small-shadow;
    h1 {
      color: $primary-color;
    }
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $elevated-surface-color;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    padding: 1rem;
    h1 {
      font-size: $text-lg;
      letter-spacing: $-ls2;
      margin-bottom: 1rem;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      .tag {
        font-size: $text-ss;
        font-weight: $bold-body-font-weight;
        line-height: 1;
        padding: 0.5rem 0.5rem;
        margin: 0 0.5rem 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: $small-shadow;
        &:hover {
          background: $hovered-surface-color;
        }
        &:active {
          background: transparent;
          box-shadow: $small-inner-shadow;
        }
      }
    }
    .meta {
      font-size: $text-xs;
      letter-spacing: $-ls2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .scl {
        display: flex;
        span {
          display: flex;
          align-items: center;
          margin-right: 1rem;
          svg {
            margin-right: 0.25rem;
          }
          .svg24 {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>
