<template>
  <div data-app="true">
    <v-dialog
      class="consultationDialog"
      v-model="display"
      persistent
      max-width="800"
    >
      <v-card elevation="3">
        <v-card-title class="card-title">发送咨询消息</v-card-title>
        <v-card-text>
          <v-form v-model="createConsultationFormValid">
            <div class="form-item">
              <div class="form-label">
                消息内容
              </div>
              <v-textarea
                class="textarea"
                v-model="createConsultationForm.text"
                placeholder="请输入消息内容"
                counter
                outlined
                required
                rows="5"
                auto-grow
                color="var(--color-main)"
                :rules="rules.consultationTextRule"
                dense
              ></v-textarea>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="footer">
            <v-btn
              @click="submit()"
              color="var(--color-main)"
              :disabled="!createConsultationFormValid"
            >
              <font color="white">发送</font>
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
import { createConsultation } from "@/network/forum";
export default {
  name: "CreateConsultation",
  props: {
    display: { type: Boolean, default: false },
    senderId: String,
    receiverId: String
  },
  data() {
    return {
      dialog: false, // 是否展示悬浮窗
      createConsultationFormValid: false,
      rules: {
        consultationTextRule: [
          v => !!v,
          v =>
            (v.length <= 500 && v.length >= 5) || "内容长度在 5-500 个字符之间"
        ]
      },
      createConsultationForm: {
        text: ""
      }
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
    },
    "createConsultationForm.text"(val) {
      let len = 500;
      if (val.length >= len)
        this.$nextTick(
          () => (this.createConsultationForm.text = val.slice(0, len))
        );
    }
  },
  methods: {
    submit() {
      // for test
      console.log("发送人: " + this.senderId);
      console.log("接收人: " + this.receiverId);
      //console.log("回复的消息: " + this.messageId);
      console.log("消息内容: " + this.createConsultationForm.text);
      if (
        !this.senderId ||
        !this.receiverId ||
        this.senderId === "" ||
        this.receiverId === ""
      ) {
        console.log("咨询消息: senderId 或 receiverId 不合法");
        return;
      }
      createConsultation(
        this.senderId,
        this.receiverId,
        this.createConsultationForm.text
        //this.messageId
      )
        .then(res => {
          console.log("createConsultation");
          if (res.result == "true") {
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
  components: {},
  computed: {},
  created() {}
};
</script>

<style>
/*.consultationDialog {
  
}*/
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

.form-item {
  display: flex;
  margin-bottom: 15px;
}

.form-label {
  display: flex;
  height: 40px;
  width: 100px;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  padding-right: 12px;
  color: rgb(96, 98, 102);
  font-size: 0.9rem;
}

.textarea {
  font-size: 0.9rem;
}

.required-star {
  color: rgb(245, 108, 108);
  padding-right: 3px;
}
</style>
