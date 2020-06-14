<template>
  <aside>
    <template v-if="$fetchState.pending">
      <div class="widget-heading loading">
        <content-placeholders>
          <content-placeholders-heading />
        </content-placeholders>
      </div>
      <div class="info">
        <content-placeholders>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="widget-heading">
        <h5>{{ widgetDataFR.header }}</h5>
      </div>
      <nuxt-link
        v-for="link in widgetDataFR.details"
        :key="link.slug"
        :to="{
          name: 'slug',
          params: { slug: link.slug }
        }"
        class="text"
      >
        {{ link.title }}
      </nuxt-link>
      <br />
      <div class="widget-heading">
        <h5>{{ widgetDataLR.header }}</h5>
      </div>
      <nuxt-link
        v-for="link in widgetDataLR.details"
        :key="link.title"
        :to="{
          name: 'slug',
          params: { slug: link.slug }
        }"
        class="text"
      >
        {{ link.title }}
      </nuxt-link>
    </template>
  </aside>
</template>

<script>
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'

export default {
  components: {
    InlineErrorBlock
  },
  async fetch() {
    const recipesFeatured = await this.$content()
      .where({
        featuredRecipe: true
      })
      .only(['slug', 'title'])
      .sortBy('updated', 'desc')
      .limit(5)
      .fetch()
    this.widgetDataFR = {
      header: 'Featured Recipes',
      details: recipesFeatured
    }
    const recipesLatest = await this.$content()
      .only(['slug', 'title'])
      .sortBy('updated', 'desc')
      .limit(5)
      .fetch()
    this.widgetDataLR = {
      header: 'Latest Recipes',
      details: recipesLatest
    }
  },
  data() {
    return {
      widgetDataFR: {},
      widgetDataLR: {}
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  padding: 1rem;
  background-color: $elevated-surface-color;
  border-radius: 1rem;
  .widget-heading {
    display: flex;
    margin-bottom: 0.5rem;
    font-size: $text-sm;
    &:hover {
      color: $primary-color;
    }
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 1rem;
    }

    &.loading {
      display: block;
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: $text-ss;
    text-overflow: ellipsis;
    white-space: pre-line;
    overflow: hidden;
    cursor: pointer;
    color: #282894;

    &:hover {
      background: $hovered-surface-color;
    }

    h5 {
      font-size: $text-ss;
    }
  }
  .f-button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: $small-shadow;
    text-transform: uppercase;
    text-align: center;
    font-weight: $display-font-weight;
    letter-spacing: $-ls2;
    margin-bottom: 1rem;
    &:hover {
      background: $hovered-surface-color;
    }
    &:active {
      background: transparent;
      box-shadow: $small-inner-shadow;
    }
  }
  .info {
    > div {
      margin-bottom: 0.5rem;
    }
    .title {
      font-size: $text-ss;
      letter-spacing: $-ls1;
      font-weight: $bold-body-font-weight;
      color: $gray-color;
      text-transform: uppercase;
      margin-bottom: 0.1rem;
    }
    .content {
      font-size: $text-sm;
      line-height: 1.4;
    }
  }
}
</style>
