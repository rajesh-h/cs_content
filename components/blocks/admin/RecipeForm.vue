<template>
  <div class="page-wrapper">
    <div class="form-box">
      <h2>{{ pageTitle }}</h2>
      <form>
        <div class="left-box">
          <div class="field-box">
            <input
              v-model="recipeObject.title"
              type="text"
              name=""
              required=""
            />
            <label>Title</label>
          </div>
          <div class="field-box">
            <input
              v-model="createSlug"
              type="text"
              name=""
              required=""
              disabled
              placeholder="Slug AutoFill"
            />
          </div>
          <div class="intro-box-all">
            <recipe-intros
              ref="recipeIntrosComponent"
              :recipe-intros="recipeObject.recipeIntros"
            />
          </div>
          <div class="field-box" style="margin-top: 20px;">
            <input
              v-model="recipeObject.youtubeUrl"
              type="text"
              name=""
              required=""
            />
            <label>YouTube URL</label>
          </div>
          <div style="display: flex;">
            <div class="field-box small">
              <input
                v-model="recipeObject.serves"
                type="text"
                name=""
                required=""
              />
              <label>Serves</label>
            </div>
            <div class="field-box small">
              <input
                v-model="recipeObject.prepTime"
                type="text"
                name=""
                required=""
              />
              <label>Prep Time</label>
            </div>
            <div class="field-box small">
              <input
                v-model="recipeObject.cookTime"
                type="text"
                name=""
                required=""
              />
              <label>Cook Time</label>
            </div>
            <div class="field-box small">
              <input
                v-model="recipeObject.totalTime"
                type="text"
                name=""
                required=""
              />
              <label>Total Time</label>
            </div>
          </div>
          <div style="font-size: 16px;">
            Recipe Ingredients
          </div>
          <div class="ingredient-box-all">
            <recipe-ingredients
              :recipe-ingredients="recipeObject.recipeIngredients"
            />
          </div>
          <div style="font-size: 16px;">
            Recipe Steps
          </div>
          <div class="step-box-all">
            <recipe-steps :recipe-steps="recipeObject.recipeSteps" />
          </div>

          <div class="field-box" style="margin-top: 20px;">
            <textarea
              id="notes"
              v-model="recipeObject.recipeNotes"
              name="notes"
              rows="4"
            />
            <label>Recipe Notes</label>
          </div>
        </div>
        <div class="right-box">
          <div class="check-box">
            <input
              v-model="recipeObject.publish"
              type="checkbox"
              name=""
              required=""
            />
            <label style="font-size: 16px;"> Publish</label>
          </div>
          <div class="check-box">
            <input
              v-model="recipeObject.featuredRecipe"
              type="checkbox"
              name=""
              required=""
            />
            <label style="font-size: 16px;"> Featured Recipe</label>
          </div>
          <div style="font-size: 16px;">
            <br />
            Featured Image
          </div>
          <div class="image-box">
            <image-upload
              ref="featuredImgUpload"
              :picture="recipeObject.featuredImage"
              @imageUploaded="recipeObject.featuredImage = $event"
              @imageDeleted="updatePicture"
            />
          </div>
          <div class="category-box">
            <br />
            <div style="font-size: 16px;">Categories</div>
            <ul>
              <li
                v-for="cat in categoriesList.categories"
                :key="cat.category"
                style="display: inline; font-size: 10px;"
              >
                <input
                  :id="cat.category"
                  v-model="recipeObject.categories"
                  type="checkbox"
                  :value="cat"
                />
                <label :for="cat.category">{{ cat.category }}</label>
              </li>
            </ul>
          </div>
        </div>
        <div class="button-box">
          <a @click="onSubmit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImageUpload from '@/components/blocks/admin/ImageUpload'
import RecipeSteps from '@/components/blocks/admin/RecipeSteps'
import RecipeIngredients from '@/components/blocks/admin/RecipeIngredients'
import RecipeIntros from '@/components/blocks/admin/RecipeIntros'

export default {
  name: 'RecipeForm',
  components: {
    ImageUpload,
    RecipeSteps,
    RecipeIngredients,
    RecipeIntros
  },
  props: {
    editPage: {
      type: Boolean,
      default: false
    },
    editSlug: {
      type: Boolean,
      default: false
    },
    recipeObject: {
      type: Object,
      default() {
        return {
          title: '',
          slug: '',
          recipeIntros: [
            {
              text: '',
              imageUrl: ''
            }
          ],
          youtubeUrl: '',
          serves: '',
          prepTime: '',
          cookTime: '',
          totalTime: '',
          recipeIngredients: [
            {
              group: {
                name: '',
                ingredients: [
                  { ingredient: '', quantity: '' },
                  { ingredient: '', quantity: '' }
                ]
              }
            }
          ],
          recipeSteps: [
            {
              group: {
                name: '',
                steps: [
                  { text: '', stepImageUrl: '' },
                  { text: '', stepImageUrl: '' }
                ]
              }
            }
          ],
          recipeNotes: '',
          publish: false,
          featuredRecipe: false,
          featuredImage: '',
          categories: [],
          searchTags: [],
          created: '',
          updated: '',
          author: 'Yaman Agarwal'
        }
      }
    }
  },
  async fetch() {
    // eslint-disable-next-line no-console
    await this.$fireStore
      .collection('categories')
      .doc('categories')
      .get()
      .then((res) => {
        // eslint-disable-next-line no-console
        this.categoriesList = res.data()
        // eslint-disable-next-line no-console
        // console.log(this.categoriesList)
        this.showCategories = true
      })
  },
  data() {
    return {
      postTag: '',
      pageTitle: this.recipeObject.title || 'Add New Recipe',
      valid: true,
      categoriesList: {},
      showCategories: false,
      textFieldRules: [
        (v) => !!v || 'Required',
        (v) => (v && v.length <= 150) || 'Must be less than 150 characters'
      ]
    }
  },
  computed: {
    createSlug() {
      if (!this.editSlug && this.recipeObject.title) {
        return this.recipeObject.title
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-')
      } else {
        return this.recipeObject.slug
      }
    }
  },

  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.recipeObject)
  },
  methods: {
    updatePicture() {
      this.recipeObject.featuredImage = ''
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      // Reset Steps images
      this.$refs.recipeIntrosComponent.resetImageUploadOnsteps()
      this.$refs.recipeStepsComponent.resetImageUploadOnsteps()
      this.$refs.imgUpload.resetImageUpload()
      this.recipeObject = {
        title: '',
        slug: '',
        recipeIntros: [
          {
            text: '',
            imageUrl: ''
          }
        ],
        serves: '',
        prepTime: '',
        cookTime: '',
        totalTime: '',
        recipeIngredients: [
          {
            group: {
              name: '',
              ingredients: [
                { ingredient: '', quantity: '' },
                { ingredient: '', quantity: '' }
              ]
            }
          }
        ],
        recipeSteps: [
          {
            group: {
              name: '',
              steps: [
                { text: '', stepImageUrl: '' },
                { text: '', stepImageUrl: '' }
              ]
            }
          }
        ],
        recipeNotes: '',
        publish: false,
        featuredRecipe: false,
        featuredImage: '',
        categories: [],
        searchTags: [],
        created: '',
        updated: '',
        author: 'Yaman Agarwal'
      }
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    ...mapActions({
      addRecipe: 'recipes/addRecipe',
      editRecipe: 'recipes/editRecipe'
    }),
    onSubmit(e) {
      // eslint-disable-next-line no-console

      if (!this.editSlug) {
        this.recipeObject.slug = this.createSlug
      }
      if (!this.recipeObject.created) {
        this.recipeObject.created = Date.now()
      }
      this.recipeObject.updated = Date.now()
      e.preventDefault()
      this.$fireStore
        .collection('recipes')
        .doc(this.recipeObject.slug)
        .set(this.recipeObject, { merge: true })
        .then(() => {
          alert('Recipe Added/Edited')
        })
      // eslint-disable-next-line no-console
      console.log(this.recipeObject)
      // this.reset()
    },
    addTag(tag) {
      this.recipeObject.searchTags.push(tag)
      this.postTag = ''
    },
    removeTag(idx) {
      this.recipeObject.searchTags.splice(idx)
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

.form-box {
  width: 1200px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  position: absolute;

  h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
  }

  .left-box {
    display: inline;
    float: left;
    width: 700px;
    .intro-box-all {
      border: 2px dotted black;
    }
    .ingredient-box-all {
      border: 2px dotted black;
    }
    .step-box-all {
      border: 2px dotted black;
    }
  }
  .right-box {
    float: right;
    width: 400px;
  }
  .field-box {
    display: flex;
    position: relative;
    &.small {
      width: 24%;
      display: inline-flex;
    }
    label {
      top: 0;
      left: 0;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      pointer-events: none;
      transition: 0.5s;
      position: absolute;
    }
    textarea {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
      background: transparent;

      &:focus {
        ~ {
          label {
            top: -20px;
            left: 0;
            color: #000000;
            font-size: 12px;
          }
        }
      }
      &:valid {
        ~ {
          label {
            top: -20px;
            left: 0;
            color: #000000;
            font-size: 12px;
          }
        }
      }
    }
    input {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
      background: transparent;
      &:focus {
        ~ {
          label {
            top: -20px;
            left: 0;
            color: #000000;
            font-size: 12px;
          }
        }
      }
      &:valid {
        ~ {
          label {
            top: -20px;
            left: 0;
            color: #000000;
            font-size: 12px;
          }
        }
      }
      #checkbox {
        color: red;
      }
    }
  }
  form {
    a {
      position: relative;
      display: inline-block;
      padding: 10px 20px;
      color: #000000;
      font-size: 16px;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      transition: 0.5s;
      margin-top: 40px;
      letter-spacing: 4px;
    }
  }
  a {
    &:hover {
      background: #000000;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px #000000, 0 0 25px #000000, 0 0 50px #000000,
        0 0 100px #000000;
    }
    span {
      position: absolute;
      display: block;
      &:nth-child(1) {
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #000000);
        animation: btn-anim1 1s linear infinite;
      }
      &:nth-child(2) {
        top: -100%;
        right: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #000000);
        animation: btn-anim2 1s linear infinite;
        animation-delay: 0.25s;
      }
      &:nth-child(3) {
        bottom: 0;
        right: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(270deg, transparent, #000000);
        animation: btn-anim3 1s linear infinite;
        animation-delay: 0.5s;
      }
      &:nth-child(4) {
        bottom: -100%;
        left: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(360deg, transparent, #000000);
        animation: btn-anim4 1s linear infinite;
        animation-delay: 0.75s;
      }
    }
  }
}
@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
footer {
  display: none;
}
</style>
