<template>
  <div class="login-button--all">
    <button :class="[ buttonType ? 'login-button--' + buttonType : '' ]" @click="handleClick">{{ words }}</button>
  </div>
</template>

<script>
export default {
  name: "LLoginButton",
  props: {
    buttonType: {
      type: String,
      default: "default"
    },
    words: {
      type: String,
      default: "Confirm, sign up now !"
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

<style scoped>
.login-button--all {
  margin: 10px auto;
  position: relative;
  width: 80%;
}

.login-button--default {
  border: 2px solid var(--color-tint);
  border-radius: 8px;
  color: #6b757b;
  font-family: Georgia;
  font-size: 17px;
  height: 50px;
  outline: 0;
  transition: 0.3s;
  width: 100%;
  -webkit-user-select: none;
}

.login-button--default:hover {
  background-color: var(--color-tint);
  color: #ffffff;
  transition: 0.3s;
}

.login-button--white {
  border: 2px solid #6b757b;
  border-radius: 8px;
  color: #6b757b;
  font-family: Georgia;
  font-size: 17px;
  height: 50px;
  outline: 0;
  transition: 0.3s;
  width: 100%;
  -webkit-user-select: none;
}

.login-button--white:hover {
  background-color:#6b757b;
  color: #ffffff;
  transition: 0.3s;
}
</style>
