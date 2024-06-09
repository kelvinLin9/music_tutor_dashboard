<template>
  <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editUserModalLabel">編輯個人資料</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm class="mx-auto"
                  v-slot="{ errors }"
                  @submit="saveUserInfo()">
            <div class="mb-3 w-50">
              <label for="displayName" class="form-label ">
                姓名：
              </label>
              <VField
                name="姓名"
                id="displayName"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                v-model="userInfo.name"
              />
              <ErrorMessage class="invalid-feedback" name="姓名"/>
            </div>
            <!-- <div class="mb-3 w-50">
              <label for="phone" class="form-label ">
                手機：
              </label>
              <VField
                name="手機"
                id="phone"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['手機'] }"
                placeholder="請輸入手機"
                v-model="userInfo.phoneNumber"
              />
              <ErrorMessage class="invalid-feedback" name="手機"/>
            </div> -->
            <!-- <div class="mb-3 w-50">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="bi bi-gender-male text-blue"
                v-model="userInfo.gender">
                <label class="form-check-label" for="inlineRadio1">男</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="bi bi-gender-female text-pink"
                v-model="userInfo.gender">
                <label class="form-check-label" for="inlineRadio2">女</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="bi bi-gender-ambiguous text-teal"
                v-model="userInfo.gender">
                <label class="form-check-label" for="inlineRadio3">雙性</label>
              </div> 
            </div>
            <div class="mb-3 w-100">
              <label for="Facebook" class="form-label ">
                Facebook：
              </label>
              <input
                name="Facebook"
                id="Facebook"
                type="text"
                class="form-control"
                placeholder="請輸入Facebook網址"
                v-model="userInfo.facebook"
              />
            </div>
            <div class="mb-3 w-100">
              <label for="instagram" class="form-label ">
                Instagram：
              </label>
              <input
                name="instagram"
                id="instagram"
                type="text"
                class="form-control"
                placeholder="請輸入Instagram網址"
                v-model="userInfo.instagram"
              />
            </div>
            <div class="mb-3 w-100">
              <label for="discord" class="form-label ">
                Discord：
              </label>
              <input
                name="discord"
                id="discord"
                type="text"
                class="form-control"
                placeholder="請輸入Discord網址"
                v-model="userInfo.discord"
              />
            </div> -->
            <div class="mb-3">
              <label for="teacherIntro" class="form-label">
                自我介紹(限定150字元內)：
              </label>
              <!-- <VField 
                  name="自我介紹"
                  class="form-control" 
                  id="teacherIntro" 
                  as="textarea"
                  rows="5"
                  rules="max:300"
                  :class="{ 'is-invalid': errors['自我介紹'] }"
                  placeholder="限定150字元內"
                  v-model="userInfo.teacherIntro"
                  >
              </VField> -->
              <ErrorMessage class="invalid-feedback" name="自我介紹"/>
  
              <button type="button" class="btn btn-secondary me-3 mt-3" data-bs-dismiss="modal">
                取消
              </button>
              <button type="submit" class="btn btn-primary mt-3" data-bs-dismiss="modal">
                確認
              </button>
            </div>
  
            <!-- <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Recipient:</label>
              <input type="text" class="form-control" id="recipient-name">
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">Message:</label>
              <textarea class="form-control" id="message-text"></textarea>
            </div> -->
          {{ props.userInfo }}
  
  
          </VForm>
        </div>
        <!-- <div class="modal-footer">
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
const props = defineProps({
  userInfo: {
    type: Object,
  }
})

const emit = defineEmits(['update:userInfo']);

function saveUserInfo() {
  emit('update:userInfo', props.userInfo);
}
</script>