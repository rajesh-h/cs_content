<template>
  <div class="page-wrapper">
    <div class="form-box">
      <div v-if="authenticatedUser">
        <form>
          <p>You are logged in as {{ authenticatedUser.email }}.</p>

          <div class="button-box">
            <a @click.prevent="logout">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Logout
            </a>
          </div>
        </form>
      </div>

      <div v-else>
        <form>
          <div class="field-box">
            <input
              id="hasAccount"
              v-model="needsAccount"
              type="radio"
              :value="false"
            />
            <label for="hasAccount">I have an account</label>
          </div>
          <br />
          <div class="field-box">
            <input
              id="needsAcctouns"
              v-model="needsAccount"
              type="radio"
              :value="true"
            />
            <label for="needsAcctouns">I need an account</label>
          </div>

          <div class="field-box">
            <input
              v-model="email"
              type="email"
              placeholder="Your email address"
            />
          </div>
          <div class="field-box">
            <input
              v-model="password"
              type="password"
              placeholder="Your password"
            />
          </div>
          <div class="field-box">
            <input
              v-if="needsAccount"
              v-model="registrationPassword"
              type="password"
              placeholder="Re-enter Password"
            />
          </div>

          <div class="button-box">
            <a
              @click.prevent="loginOrRegister"
              v-text="needsAccount ? 'Register' : 'Login'"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  asyncData() {
    return {
      authenticatedUser: null,
      email: '',
      password: '',
      registrationPassword: '',
      needsAccount: false
    }
  },
  created() {
    this.$fireAuth.onAuthStateChanged((user) => (this.authenticatedUser = user))
  },
  methods: {
    register() {
      if (this.password === this.registrationPassword) {
        this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password)
      } else {
        // display error message
      }
    },
    login() {
      // eslint-disable-next-line no-console
      // console.log(this.email, this.password)
      this.$fireAuth.signInWithEmailAndPassword(this.email, this.password)
    },
    loginOrRegister() {
      if (this.needsAccount) {
        this.register()
      } else {
        this.login()
      }
    },
    logout() {
      this.$fireAuth.signOut()
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
</style>
