<template>
  <nuxt-link
    :to="{
      name: 'admin-edit-slug',
      params: { slug: article.slug }
    }"
    tag="article"
  >
    <div class="image-wrapper">
      <img
        v-if="article.featuredImage"
        :src="article.featuredImage"
        :srcset="article.featuredImage | getSrcSet"
        sizes="(min-width: 640px) 25vw, 100vw"
        :alt="article.title"
      />
      <img v-else :src="article.social_image" :alt="article.title" />
    </div>
    <div class="content">
      <nuxt-link
        :to="{
          name: 'admin-edit-slug',
          params: { slug: article.slug }
        }"
      >
        <h1>{{ article.title }}</h1>
      </nuxt-link>
      <div class="meta">
        <div class="scl">
          <span class="comments">
            <time-icon class="svg24" /> Published?
            {{ article.publish }}
          </span>
          <span class="comments">
            <time-icon class="svg24" /> Featured?
            {{ article.featuredRecipe }}
          </span>
        </div>
        <nuxt-link
          :to="{
            name: 'admin-edit-slug',
            params: { slug: article.slug }
          }"
        >
          <h3>EDIT</h3>
        </nuxt-link>
        <time>{{ article.updated | FormatDate }}</time>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import TimeIcon from '@/assets/icons/time.svg?inline'

export default {
  components: {
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
