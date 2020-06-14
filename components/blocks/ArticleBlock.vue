<template>
  <article>
    <template v-if="$fetchState.pending">
      <content-placeholders rounded>
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-text :lines="50" />
      </content-placeholders>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <header>
        <h1>{{ article.title }}</h1>
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
        <div v-if="article.featuredImage" class="image-wrapper">
          <img
            :src="article.featuredImage"
            :srcset="article.featuredImage | getSrcSet"
            sizes="(min-width: 640px) 50vw, 100vw"
            :alt="article.title"
          />
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
      </header>
      <!-- eslint-disable-next-line -->
      <div class="content">
        <div v-for="(intro, i) in article.recipeIntros" :key="i">
          <p style="white-space: pre-line;">
            {{ intro.text }}
          </p>
          <div v-if="intro.imageUrl" class="image-wrapper">
            <img :src="intro.imageUrl" :alt="article.title" />
          </div>
        </div>

        <div v-if="article.youtubeUrl">
          <h4>RECIPE VIDEO</h4>
          <div class="video-container">
            <iframe
              width="853"
              height="480"
              :src="article.youtubeUrl"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <h4>RECIPE CARD</h4>
      </div>

      <recipe-step-block :article="article" />
    </template>
    <div class="bottom-navigation">
      <nuxt-link
        v-if="prevRecipe.slug"
        style="float: left;"
        :to="{
          name: 'slug',
          params: { slug: prevRecipe.slug }
        }"
      >
        {{ prevRecipe.title }}
      </nuxt-link>

      <nuxt-link
        v-if="nextRecipe.slug"
        style="float: right;"
        :to="{
          name: 'slug',
          params: { slug: nextRecipe.slug }
        }"
      >
        {{ nextRecipe.title }}
      </nuxt-link>
    </div>
  </article>
</template>

<script>
import ServesIcon from '@/assets/icons/serves.svg?inline'
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'
import TimeIcon from '@/assets/icons/time.svg?inline'
import RecipeStepBlock from '@/components/blocks/RecipeStepBlock'

export default {
  components: {
    ServesIcon,
    InlineErrorBlock,
    TimeIcon,
    RecipeStepBlock
  },
  props: [],
  async fetch() {
    try {
      const recipe = await this.$content(this.$route.params.slug).fetch()
      if (recipe) {
        this.article = recipe
      } else {
        // use throw new Error()
        throw new Error('Recipe not found')
      }
    } catch {
      // if (process.server) {
      //   this.$nuxt.context.res.statusCode = 404
      // }
      throw new Error('Recipe Not Found')
    }

    const [prev, next] = await this.$content()
      .only(['title', 'slug'])
      .sortBy('updated', 'desc')
      .surround(this.$route.params.slug)
      .fetch()
    this.prevRecipe = prev
    this.nextRecipe = next
  },
  data() {
    return {
      article: {},
      prevRecipe: {},
      nextRecipe: {}
    }
  },
  computed: {
    // article() {
    //   return this.$store.getters.getArticleBySlug(this.$route.params.slug)
    // }
  },
  activated() {
    // Call fetch again if last fetch more than 60 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  },
  methods: {
    scrollToComments() {
      const el = document.querySelector('#comments')
      if (el) {
        const scrollTo = el.getBoundingClientRect().top
        window.scrollBy({ top: scrollTo - 20, left: 0, behavior: 'smooth' })
      }
    }
  },
  head() {
    return {
      title: this.article.title
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 0.5rem;
  border-radius: 1rem;
}

header {
  margin-bottom: 1rem;
  h1 {
    font-size: $text-2xl;
    letter-spacing: $-ls2;
    margin-bottom: 1rem;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
    .tag {
      font-size: $text-sm;
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
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $primary-dark;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    @media (min-width: $screen-md) {
      margin-bottom: 1.5rem;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .meta {
    line-height: 1;
    font-size: $text-sm;
    text-transform: uppercase;
    font-weight: $bold-body-font-weight;
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
      .comments {
        cursor: pointer;
      }
    }
  }
}

::v-deep .content {
  .ltag__user {
    display: none;
  }
  iframe {
    max-width: 100%;
  }
  h1 {
    font-size: $text-3xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h2 {
    font-size: $text-2xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h3 {
    font-size: $text-xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h4 {
    font-size: $text-sm;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  a {
    color: $primary-color;
  }
  p {
    font-size: $text-sm;
    margin-bottom: 1rem;
    line-height: 1.4;
    letter-spacing: $-ls2;
    code {
      background-color: #d2f3e1;
      border-radius: 0.25rem;
      padding: 0.25rem;
    }
    .extra-space-on-top {
      margin-top: 1rem !important;
    }
  }
  img {
    width: 100%;
    border-radius: 0.5rem;
  }
  .highlight {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
  ul {
    list-style: numeral;
    margin-bottom: 1rem;
    li p {
      margin-bottom: 0;
    }
  }
  ol {
    margin-bottom: 1rem;
  }
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bottom-navigation {
  padding-top: 1rem;
  font-size: $text-ss;
  a {
    box-shadow: $shadow;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    user-select: none;
    color: #282894;
    &:hover {
      background: $hovered-surface-color;
    }
    &.nuxt-link-exact-active {
      cursor: default;
      background: transparent;
      box-shadow: $small-inner-shadow;
    }
    &:active {
      background: transparent;
      box-shadow: $small-inner-shadow;
    }
  }
}
</style>
