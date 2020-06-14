<template>
  <div>
    <div v-for="(intro, index) in recipeIntros" :key="index" class="intro-box">
      <div class="field-box">
        <textarea
          id=""
          v-model="intro.text"
          name=""
          cols=""
          rows="3"
        ></textarea>
        <label>IntroText_{{ index + 1 }}</label>
      </div>
      <div class="image-box">
        <image-upload
          ref="introImgUpload"
          :picture="intro.imageUrl"
          @imageUploaded="intro.imageUrl = $event"
          @imageDeleted="updatePicture(index)"
        />
      </div>
      <input
        id="button"
        class="remove-intro"
        type="button"
        value="-"
        @click="removeIntro(index)"
      />
    </div>
    <input
      id="button"
      class="add-intro"
      type="button"
      value="+"
      @click="addIntro"
    />
  </div>
</template>

<script>
import ImageUpload from '@/components/blocks/admin/ImageUpload'

export default {
  name: 'RecipeIntros',
  components: {
    ImageUpload
  },
  props: {
    recipeIntros: {
      type: Array,
      default() {
        return [
          {
            text: '',
            imageUrl: ''
          }
        ]
      }
    }
  },
  data: () => ({}),
  methods: {
    updatePicture(index) {
      this.recipeIntros[index].imageUrl = ''
    },
    addIntro() {
      this.recipeIntros.push({
        text: '',
        imageUrl: ''
      })
    },
    removeIntro(index) {
      if (index > 0) {
        this.recipeIntros.splice(index, 1)
      }
    },
    resetImageUploadOnIntros() {
      this.recipeIntros.forEach((intro, index) => {
        this.$refs.introImgUpload[index].resetImageUpload()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.intro-box {
  display: flex;
  margin-bottom: 30px;
  padding: 10px;
  .field-box {
    position: relative;
    width: 67%;
    max-width: 67%;
    display: flex;
    float: left;
    label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      pointer-events: none;
      transition: 0.5s;
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
      position: absolute;
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
  }
  .image-box {
    position: relative;
    padding-left: 10px;
    padding-top: 10px;
    display: inline-block;
    margin-bottom: 10px;
  }
  #button {
    color: red;
    float: right;
    line-height: 12px;
    width: 18px;
    font-family: tahoma;
    margin-top: 30px;
    margin-right: 2px;
    padding: 2px;
    height: 18px;
    position: absolute;
    right: 470px;
  }
}
#button {
  color: green;
  float: right;
  line-height: 12px;
  width: 18px;
  font-family: tahoma;
  height: 18px;
  margin-right: 2px;
  padding: 2px;
  margin-top: -25px;
}
</style>
