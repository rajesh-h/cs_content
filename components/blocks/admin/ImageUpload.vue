<template>
  <div>
    <div v-if="picture == ''">
      <input type="file" accept="image/*" @change="previewImage" />
    </div>
    <div v-if="picture == ''">
      <p>
        <progress id="progress" :value="uploadValue" max="100"></progress>
      </p>
    </div>
    <div v-if="picture != ''">
      <template v-if="picture != undefined">
        <ul>
          <li><img class="preview" :src="picture" /></li>
          <li class="delete-mark" @click="deleteImage(picture)">X</li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'ImageUpload',
  props: {
    picture: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageData: null,
      pictureUrl: null,
      uploadValue: 0,
      imgDeleted: false
    }
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0
      this.pictureUrl = null
      this.imageData = event.target.files[0]
      this.onUpload()
    },
    onUpload() {
      const todayDate = dayjs().format('YYYY/MM/DD')
      const timeNow = dayjs().format('HHmmss')
      this.pictureUrl = null
      const storageRef = this.$fireStorage
        .ref(`uploads/${todayDate}/${timeNow}_${this.imageData.name}`)
        .put(this.imageData)
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // eslint-disable-next-line no-console
          console.log(error.message)
        },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.pictureUrl = url
            this.$emit('imageUploaded', this.pictureUrl)
          })
        }
      )
    },
    deleteImage(fileUrl) {
      const storageReference = this.$fireStorage.refFromURL(fileUrl)
      storageReference
        .delete()
        .then(() => {
          this.imageData = null
          this.pictureUrl = null
          this.uploadValue = 0
          this.$emit('imageDeleted')
          // eslint-disable-next-line no-console
          console.log('Image deleted')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('file delete error occured: ' + JSON.stringify(error))
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 100px;
  font-size: 75%;
}
progress {
  width: 120px;
}
img.preview {
  width: 150px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
}
li {
  display: inline-block;

  vertical-align: middle;
}
.delete-mark {
  color: red;
  width: auto;
  cursor: pointer;
}
</style>
