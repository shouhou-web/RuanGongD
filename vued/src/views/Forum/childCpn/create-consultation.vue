<template>
  <div data-app="true">
    <v-dialog v-model="display" persistent max-width="900">
      <v-card elevation="3">
        <v-card-title class="card-title">发送咨询消息</v-card-title>
        <v-card-text>
          <v-form v-model="createConsultationFormValid">
            <div class="form-item">
              <div class="form-label">
                动态内容
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
    }
  },
  methods: {
    submit() {
      // for test
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
          if (res.data.result == "true") {
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
  computed: {
    getSectorTags: function() {
      let sectorId = this.createConsultationForm.sectorId;
      for (let i = 0; i < this.sectorList.length; i++) {
        // console.log(this.sectorList[i]);
        if (this.sectorList[i].sectorId == sectorId)
          return this.sectorList[i].sectorTags;
      }
      return [];
    }
  },
  watch: {
    "createConsultationForm.postTags"(val) {
      if (val.length > 5) {
        // 限制最多可选 5 个标签
        this.$nextTick(() => this.createConsultationForm.postTags.pop());
      }
    },
    "createConsultationForm.sectorId"(val, oldVal) {
      // 切换分区清空已选标签
      if (val != oldVal)
        this.createConsultationForm.postTags.splice(
          0,
          this.createConsultationForm.postTags.length
        );
    }
  },
  created() {
    this.userId = this.$store.state.user.userID; // TODO 等待统一
    this.createConsultationForm.userId = this.userId;
    this.createConsultationForm.citeId = "-1";
    // 获取所有分区，以及每个分区下的 tag
    getAllTags()
      .then(res => {
        console.log("getAllTags");
        console.log(res);
        this.sectorList = res.data.sectorList;
      })
      .catch(err => {
        console.log(err);
      });
    getMyLiterature(this.userId)
      .then(res => {
        console.log("getMyLiterature");
        console.log(res);
        var tmpLiterature = Object;
        for (var literature of res.data.myLiteratureList) {
          // for (var literature of tmpList) {
          tmpLiterature.literatureID = literature.literatureID;
          tmpLiterature.title = literature.title;
          tmpLiterature.authors = [];
          for (var author of literature.authors) {
            tmpLiterature.authors.push(author.userName);
          }
          this.myLiteratureList.push({ ...tmpLiterature });
        }
        console.log(this.myLiteratureList);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
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
