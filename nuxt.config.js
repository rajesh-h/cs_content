export default {
  mode: 'universal',
  head: {
    title: 'CookingShooking',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'CookingShooking'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Inter:400,500,600&display=swap'
      }
    ]
  },
  loading: false, // disable loading bar
  css: [
    '~/assets/styles/reset.scss',
    '~/assets/styles/base.scss',
    '~/assets/styles/highlight.scss',
    '~/assets/styles/app.scss'
  ],
  styleResources: {
    scss: ['~/assets/styles/tokens.scss']
  },
  plugins: [
    '~/plugins/vue-placeholders.js',
    '~/plugins/vue-observe-visibility.client.js',
    '~/plugins/filters.js'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/style-resources',
    '~/modules/generateContent'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxt/content',
    // 'nuxt-ackee',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCjLE7YttfE5aE6eKSQpJPhhadf_PsGi2E',
          authDomain: 'cscom-2019.firebaseapp.com',
          databaseURL: 'https://cscom-2019.firebaseio.com',
          projectId: 'cscom-2019',
          storageBucket: 'cscom-2019.appspot.com',
          messagingSenderId: '13136201488'
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore: true,
          storage: true
        }
      }
    ]
  ],
  // ackee: {
  //   server: 'https://ackee.nuxtjs.com',
  //   domainId: '6336379b-8d3e-4069-9d2e-897be6a7ed4e'
  // }
  // Configure polyfills:
  // polyfill: {
  //   features: [
  //     {
  //       require: 'intersection-observer',
  //       detect: () => 'IntersectionObserver' in window
  //     }
  //   ]
  // },
  generate: {
    concurrency: 100,
    fallback: true,
    exclude: [/^\/admin/] // exclude every URL starting with "/admin"
    //   async routes() {
    //     const { StoreDB } = require('./services/fireinit')
    //     const qs = await StoreDB.collection('recipes')
    //       .where('publish', '==', true)
    //       .orderBy('updated', 'desc')
    //       .limit(10)
    //       .get()
    //     return qs.docs.map((x) => `/${x.data().slug}`)
    //   }
  },
  target: 'static',
  ssr: true,
  content: {
    nestedProperties: ['categories.slug']
  },
  pwa: {
    manifest: {
      name: 'CookingShooking',
      lang: 'en'
    }
  },
  hooks: {
    // generate: {
    //   before(generator) {
    //     const dateOffset = 24 * 60 * 60 * 1000 * 5 // 5 days
    //     const goBackTill = Date.now() - dateOffset
    //     // eslint-disable-next-line no-console
    //     console.log('Before Build Script')
    //     // eslint-disable-next-line no-console
    //     console.log(goBackTill)
    //     const { StoreDB } = require('./services/fireinit')
    //     StoreDB.collection('recipes')
    //       .where('publish', '==', true)
    //       .where('updated', '>', goBackTill)
    //       .orderBy('updated', 'desc')
    //       .limit(10)
    //       .get()
    //       .then((res) => {
    //         // eslint-disable-next-line no-console
    //         res.docs.map((x) => console.log(`${x.data().slug}`))
    //       })
    //   }
    // }
  }
}
