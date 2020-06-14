<template>
  <div>
    <div
      v-for="(recipeStep, g_index) in recipeSteps"
      :key="g_index"
      class="step-group-box"
    >
      <div class="field-box">
        <input v-model="recipeStep.group.name" type="text" name="" />
        <label>StepGroupName_{{ g_index + 1 }}</label>
      </div>

      <div
        v-for="(step, s_index) in recipeStep.group.steps"
        :key="s_index"
        class="step-row"
      >
        <div class="field-box">
          <textarea
            id=""
            v-model="step.text"
            name=""
            cols=""
            rows="3"
          ></textarea>
          <label>Step_{{ s_index + 1 }}</label>
        </div>
        <div class="image-box">
          <image-upload
            ref="stepImgUpload"
            :picture="step.stepImageUrl"
            @imageUploaded="step.stepImageUrl = $event"
            @imageDeleted="updatePicture(g_index, s_index)"
          />
        </div>
        <span>
          <input
            id="button-remove"
            type="button"
            value="-"
            @click="removeStep(g_index, s_index)"
          />
        </span>
      </div>
      <div>
        <input
          id="button-add"
          type="button"
          style="margin-top: 0; margin-right: 80px;"
          value="+"
          @click="addExtraStep(g_index)"
        />
      </div>
      <div>
        <input
          id="button-remove"
          type="button"
          value="--"
          style="
            margin-top: 0;
            position: relative;
            margin-right: 50px;
            right: 0;
            width: 24px;
            height: 24px;
          "
          @click="removeStepGroup(g_index)"
        />
      </div>
    </div>
    <div>
      <input
        id="button-add"
        type="button"
        value="++"
        style="
          width: 24px;
          height: 24px;
          margin-top: -10px;
          margin-right: 10px;
        "
        @click="addAdditionalStepGroup"
      />
    </div>
  </div>
</template>
<script>
import ImageUpload from '@/components/blocks/admin/ImageUpload'
export default {
  name: 'RecipeSteps',
  components: {
    ImageUpload
  },
  props: {
    editPage: {
      type: Boolean,
      default: false
    },
    recipeSteps: {
      type: Array,
      default() {
        return [
          {
            group: {
              name: '',
              steps: [
                { text: '', stepImageUrl: '' },
                { text: '', stepImageUrl: '' }
              ]
            }
          }
        ]
      }
    }
  },
  data: () => ({}),
  methods: {
    updatePicture(gIndex, sIndex) {
      this.recipeSteps[gIndex].group.steps[sIndex].stepImageUrl = ''
    },
    addAdditionalStepGroup() {
      this.recipeSteps.push({
        group: {
          name: '',
          steps: [
            { text: '', stepImageUrl: '' },
            { text: '', stepImageUrl: '' }
          ]
        }
      })
    },
    removeStepGroup(index) {
      if (confirm('are you sure to delete the Entire Group?'))
        this.recipeSteps.splice(index, 1)
    },
    addExtraStep(index) {
      this.recipeSteps[index].group.steps.push({ text: '', stepImageUrl: '' })
    },
    removeStep(gIndex, sIndex) {
      this.recipeSteps[gIndex].group.steps.splice(sIndex, 1)
    },
    resetImageUploadOnsteps() {
      this.recipeSteps.forEach((rstep, idx) => {
        rstep.group.steps.forEach((step, index) => {
          this.$refs.stepImgUpload[index].resetImageUpload()
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.step-group-box {
  padding: 10px;
  display: flex;
  flex-direction: column;
  .field-box {
    position: relative;
    width: 100%;
    max-width: 100%;
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
  .step-row {
    margin-bottom: 30px;
    display: flex;
    .field-box {
      position: relative;
      width: 67%;
      max-width: 67%;
      display: flex;
      float: left;
      &.medium {
        width: 40%;
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
  float: right;
  line-height: 12px;
  width: 18px;
  font-family: tahoma;
  height: 18px;
  margin-right: 2px;
  padding: 2px;
  margin-top: -25px;
  margin-right: 30px;
}
#button-remove {
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
</style>
