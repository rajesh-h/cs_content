<template>
  <div>
    <div
      v-for="(recipeIngredient, g_index) in recipeIngredients"
      :key="g_index"
      class="ingredient-group-box"
    >
      <div class="field-box">
        <input v-model="recipeIngredient.group.name" type="text" name="" />
        <label>IngredientGroupName_{{ g_index + 1 }}</label>
      </div>

      <div
        v-for="(ingredient, s_index) in recipeIngredient.group.ingredients"
        :key="s_index"
        class="ingredient-row"
      >
        <div class="field-box medium">
          <input
            v-model="ingredient.ingredient"
            type="text"
            name=""
            required=""
          />
          <label>Ingredient_{{ s_index + 1 }}</label>
        </div>
        <div class="field-box medium">
          <input
            v-model="ingredient.quantity"
            type="text"
            name=""
            required=""
          />
          <label>Quantity_{{ s_index + 1 }}</label>
        </div>
        <span>
          <input
            id="button-remove"
            type="button"
            value="-"
            @click="removeIngredient(g_index, s_index)"
          />
        </span>
      </div>
      <div>
        <input
          id="button-add"
          style="float: right; margin-right: 80px;"
          type="button"
          value="+"
          @click="addExtraIngredient(g_index)"
        />
      </div>
      <div>
        <input
          id="button-remove"
          type="button"
          value="--"
          style="
            float: right;
            width: 24px;
            height: 24px;
            margin-top: 0px;
            margin-right: 50px;
          "
          @click="removeIngredientGroup(g_index)"
        />
      </div>
    </div>

    <input
      id="button-add"
      type="button"
      value="++"
      style="
        float: right;
        width: 24px;
        height: 24px;
        margin-top: -10px;
        margin-right: 10px;
      "
      @click="addAdditionalIngredientGroup"
    />
  </div>
</template>
<script>
export default {
  name: 'RecipeIngredients',
  props: {
    recipeIngredients: {
      type: Array,
      default() {
        return [
          {
            group: {
              name: '',
              ingredients: [
                { ingredient: '', quantity: '' },
                { ingredient: '', quantity: '' }
              ]
            }
          }
        ]
      }
    }
  },
  data: () => ({}),
  methods: {
    addAdditionalIngredientGroup() {
      this.recipeIngredients.push({
        group: {
          name: '',
          ingredients: [
            { ingredient: '', quantity: '' },
            { ingredient: '', quantity: '' }
          ]
        }
      })
    },
    removeIngredientGroup(index) {
      if (confirm('are you sure to delete the Entire Group?'))
        this.recipeIngredients.splice(index, 1)
    },
    addExtraIngredient(index) {
      this.recipeIngredients[index].group.ingredients.push({
        ingredient: '',
        quantity: ''
      })
    },
    removeIngredient(gIndex, sIndex) {
      this.recipeIngredients[gIndex].group.ingredients.splice(sIndex, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.ingredient-group-box {
  padding: 10px;
  display: flex;
  flex-direction: column;
  .field-box {
    position: relative;
    width: 100%;
    max-width: 100%;
    float: left;
    margin-bottom: 30px;
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

    input {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
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
  }
  .ingredient-row {
    margin-bottom: 30px;
    .field-box {
      position: relative;
      width: 67%;
      max-width: 67%;
      display: flex;
      float: left;
      &.medium {
        width: 40%;
        margin-bottom: 0px;
      }
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
      input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
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
    }
    .image-box {
      position: relative;
      padding-left: 10px;
      padding-top: 10px;
      display: inline-block;
      margin-bottom: 10px;
    }
  }
}
#button-add {
  color: green;
  line-height: 12px;
  width: 18px;
  font-family: tahoma;
  height: 18px;
  margin-right: 2px;
  padding: 2px;
  margin-top: -25px;
}
#button-remove {
  color: red;
  padding-left: 20px;
  line-height: 12px;
  width: 18px;
  font-family: tahoma;
  margin-top: 10px;
  padding: 2px;
  height: 18px;
}
</style>
