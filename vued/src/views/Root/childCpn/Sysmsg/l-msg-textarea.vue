<template>
  <div class="msg-input--all">
    <textarea class="msg-input" @input="handleInput"></textarea>
    <span class="msg-input--notice">{{ notice }}</span>
  </div>
</template>

<script>
export default {
  name: "LMsgText",
  props: {
    notice: {
      type: String,
      default: "message"
    }
  },
  data() {
    return {
      onShow: false,
      type: ""
    };
  },
  methods: {
    handleInput(evt) {
      this.$emit("input", evt.target.value);
    }
  }
};
</script>

<style scoped>
.msg-input--all {
  margin: 10px auto;
  position: relative;
  width: 90%;
}

.msg-input {
  border: 2px solid #6b757b;
  border-radius: 8px;
  color: #6b757b;
  font-size: 17.5px;
  height: 500px;
  outline: none;
  padding: 20px;
  resize: none;
  transition: 0.5s;
  width: 100%;
}

.msg-input::-webkit-scrollbar {
  width: 4px;
}

.msg-input::-webkit-scrollbar-track {
  background-color: transparent;
}

.msg-input::-webkit-scrollbar-thumb {
  background-color: #d4dadd;
  border-radius: 2px;
}

.msg-input--password {
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

.msg-input--all:hover .msg-input--notice {
  color: var(--color-tint);
  transition: 0.5s;
}

.msg-input--all:hover .msg-input {
  border-color: var(--color-tint);
  transition: 0.5s;
}

.msg-input:focus {
  border-color: var(--color-tint);
  transition: 0.5s;
}

.msg-input:focus + .msg-input--notice {
  color: var(--color-tint);
  transition: 0.5s;
}

.msg-input--notice {
  background-color: #ffffff;
  color: #6b757b;
  font-size: 13px;
  left: 16px;
  top: -8px;
  padding: 0px 5px;
  position: absolute;
  transition: 0.5s;
}

.msg-input--pic {
  cursor: pointer;
  height: 17px;
  position: absolute;
  right: 10px;
  top: 17px;
  width: 17px;
}
</style>
