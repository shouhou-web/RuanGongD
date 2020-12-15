<template>
  <div data-app>
    <v-dialog v-model="display" persistent max-width="600">
      <v-card elevation="3">
        <v-card-title class="card-title">{{
          consultationTitleText
        }}</v-card-title>

        <v-card-text>
          <el-form
            :model="createConsultationForm"
            ref="createConsultationForm"
            label-width="80px"
            :rules="consultationRule"
          >
            <el-form-item label="内容" prop="text">
              <el-input
                class="post-content"
                type="textarea"
                v-model="createConsultationForm.text"
                clearable
                placeholder="请输入消息内容"
                :autosize="{ minRows: 5, maxRows: 10 }"
                resize="none"
                maxlength="501"
              ></el-input>
            </el-form-item>
          </el-form>
        </v-card-text>

        <v-card-actions>
          <div class="footer">
            <v-btn @click="submit()" dark color="#4F6EF2">
              <div>发送</div>
            </v-btn>
            <v-btn @click="close">取消</v-btn>
          </div>
        </v-card-actions>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createConsultation } from "network/forum.js";
export default {
  name: "CreateConsultation",
  props: {
    display: { type: Boolean, default: false },
    senderId: String,
    receiverId: String
    //messageId: { type: String, default: "" }
  },
  data() {
    return {
      consultationRule: {
        text: [
          {
            required: true,
            message: "内容不可为空",
            trigger: "blur"
          },
          {
            min: 5,
            max: 500,
            message: "内容长度在5-500个字符之间",
            trigger: "blur"
          }
        ]
      },
      createConsultationForm: { text: "" }
    };
  },
  watch: {
    display(newVal) {
      console.log("display: " + newVal);
      this.display = newVal;
    },
    senderId(newVal) {
      console.log("senderId: " + newVal);
      this.senderId = newVal;
    },
    receiverId(newVal) {
      console.log("receiverId: " + newVal);
      this.receiverId = newVal;
    }
    /*messageId(newVal) {
      console.log("messageId: " + newVal);
      this.messageId = newVal;
    }*/
  },
  computed: {
    consultationTitleText() {
      return "发送咨询消息";
      //return this.messageId == "" ? "发送咨询消息" : "回复咨询消息";
    }
  },
  methods: {
    submit() {
      let pass = true;
      this.$refs["createConsultationForm"].validate(valid => {
        if (!valid) {
          pass = false;
        }
      });
      if (!pass) {
        return;
      }
      console.log("发送人: " + this.senderId);
      console.log("接收人: " + this.receiverId);
      //console.log("回复的消息: " + this.messageId);
      console.log("消息内容: " + this.createConsultationForm.text);
      createConsultation(
        this.senderId,
        this.receiverId,
        this.createConsultationForm.text
        //this.messageId
      )
        .then(res => {
          console.log("createConsultation");
          if (res.data.result) {
            this.$notify({
              title: "操作成功",
              message: "咨询消息发送成功",
              type: "success"
            });
          } else {
            this.$notify.error({
              title: "操作失败",
              message: "咨询消息发送失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify.error({
            title: "操作失败",
            message: "咨询消息发送失败"
          });
        });
    },
    close() {
      //console.log("tryClosing");
      this.$emit("closeDialog");
    }
  },
  components: {}
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding-bottom: 10px;
  width: 30%;
}

.hintText {
  display: flex;
  justify-content: flex-end;
}

.post-name {
  font-weight: bold;
}

.el-input__inner,
.el-textarea__inner {
  border-color: rgba(158, 158, 158);
}

.el-input__inner:hover,
.el-textarea__inner:hover {
  border-color: rgba(36, 36, 36);
}

.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: rgba(64, 158, 255);
  border-width: 2px;
}
</style>
