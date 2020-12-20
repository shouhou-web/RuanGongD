<template>
  <div class="login-input--all">
    <input :type="type ? type : inputType" class="login-input" :class="[ inputType == 'password' ? 'login-input--password' : 'login-input' ]" @input="handleInput"></input>
    <span class="login-input--notice">{{ notice }}</span>
    <img src="@/assets/icons/login/show.svg" class="login-input--pic" v-if="inputType == 'password' && !onShow" @click="resetShow">
    <img src="@/assets/icons/login/hide.svg" class="login-input--pic" v-if="type == 'text' && onShow" @click="resetShow">
  </div>
</template>

<script>
export default {
  name: "LLoginInput",
  props: {
    inputType: {
      type: String,
      default: "text"
    },
    notice: {
      type: String,
      default: "username"
    }
  },
  data() {
    return {
      onShow: false,
      type: ""
    }
  },
  methods: {
    resetShow() {
      if(!this.onShow) {
        this.type = "text";
      } else {
        this.type = 'password';
      }
      this.onShow = !this.onShow;
    },
    handleInput(evt) {
      this.$emit("input", evt.target.value);
    }
  }
}
</script>

<style scoped>
.login-input--all {
  margin: 10px auto;
  position: relative;
  width: 80%;
}

.login-input {
  border: 2px solid #6b757b;
  border-radius: 8px;
  color: #6b757b;
  font-size: 17.5px;
  height: 50px;
  padding: 20px;
  transition: 0.5s;
  width: 100%;
}

.login-input--password {
  border: 2px solid #6b757b;
  border-radius: 8px;
  color: #6b757b;
  font-size: 17.5px;
  height: 50px;
  padding-left: 20px;
  padding-right: 34px;
  width: 100%;
  transition: 0.5s;
}

.login-input--all:hover .login-input--notice {
  color: var(--color-tint);
  transition: 0.5s;
}

.login-input--all:hover .login-input {
  border-color: var(--color-tint);
  transition: 0.5s;
}

.login-input:focus {
  border-color: var(--color-tint);
  transition: 0.5s;
}

.login-input:focus + .login-input--notice {
  color: var(--color-tint);
  transition: 0.5s;
}

.login-input--notice {
  background-color: #ffffff;
  color: #6b757b;
  font-size: 13px;
  left: 16px;
  top: -8px;
  padding: 0px 5px;
  position: absolute;
  transition: 0.5s;
}

.login-input--pic {
  cursor: pointer;
  height: 17px;
  position: absolute;
  right: 10px;
  top: 17px;
  width: 17px;
}
</style>