<template>
  <header>
    <nuxt-link to="/" class="logo-wrapper">
      <img :src="require('~/static/logo.png')" />
    </nuxt-link>
    <nuxt-link to="/" class="logo-wrapper-small">
      <img :src="require('~/static/logo_small.png')" />
    </nuxt-link>
    <nav>
      <ul>
        <li>
          <div class="searchBox">
            <input
              v-if="openSearch"
              v-model="searchText"
              class="searchInput"
              type="text"
              name=""
              placeholder="Enter Keyword"
              @keyup.enter="goToSearchPage"
            />
            <button v-if="openSearch" class="searchButton active">
              <search-icon class="svg30" @click="goToSearchPage" />
            </button>

            <button v-if="!openSearch" class="searchButton">
              <search-icon class="svg30" @click="openSearch = !openSearch" />
            </button>
          </div>
        </li>
        <li v-for="link in links" :key="link.slug">
          <nuxt-link :to="{ name: link.slug }">
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import SearchIcon from '@/assets/icons/search.svg?inline'

export default {
  components: { SearchIcon },
  data() {
    return {
      links: [
        {
          name: 'Home',
          slug: 'index'
        }
      ],
      openSearch: false,
      searchText: ''
    }
  },
  methods: {
    goToSearchPage() {
      if (this.searchText.length > 3) {
        this.$router.push({
          name: 'search-slug',
          params: { slug: this.searchText }
        })
      } else {
        this.openSearch = !this.openSearch
      }
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo-wrapper {
    margin: 0 0.5rem;
    svg {
      width: 3rem;
      height: 100%;
    }
    @media (max-width: $screen-md) {
      display: none;
    }
  }
  .logo-wrapper-small {
    margin: 0 0.5rem;
    svg {
      width: 3rem;
      height: 100%;
    }
    @media (min-width: $screen-md) {
      display: none;
    }
  }
  nav {
    letter-spacing: $-ls2;
    font-weight: $display-font-weight;
    text-transform: uppercase;
    ul {
      display: flex;
      li {
        margin: 0 0.5rem;
        a {
          box-shadow: $small-shadow;
          padding: 0.25rem 1rem;
          border-radius: 0.5rem;
          user-select: none;
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
        .svg30 {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
.searchBox {
  background: #2f3640;
  border-radius: 30px;
}

// .searchBox:hover > .searchInput {
//   width: 240px;
//   padding: 0 6px;
// }

// .searchBox:hover > .searchButton {
//   background: #8e8e8e;
//   color: #2f3640;
// }

.searchButton {
  color: white;
  float: right;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.searchButton.active {
  background: #8e8e8e;
  color: #2f3640;
}

.searchInput {
  padding: 0 6px;
  width: 240px;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  float: left;
  font-size: 16px;
  transition: 0.4s;
  line-height: 35px;
}

@media screen and (max-width: 620px) {
  .searchInput {
    width: 150px;
    padding: 0 6px;
  }
}
</style>
