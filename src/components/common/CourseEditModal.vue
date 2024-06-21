<template>
  <div class="modal fade" id="editCourseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">編輯課程資料</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <VForm class="mx-auto"
                  v-slot="{ errors }"
                  @submit="saveCourseInfo()">
            <div class="row mb-3">
              <div class="col-auto">
                <label for="courseName" class="col-form-label">
                  課程名稱：
                </label>
              </div>
              <div class="col-4">
            <VField
              name="課程名稱"
              id="courseName"
              type="text"
              rules="required|min:3|max:20"
              class="form-control"
              :class="{ 'is-invalid': errors['課程名稱'] }"
              placeholder="請輸入課程名稱"
              v-model="courseTemp.name"
            />
            <ErrorMessage class="invalid-feedback" name="課程名稱"/>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-auto">
                <label for="coursePrice" class="col-form-label">
                  課程費用：
                </label>
              </div>
            <div class="col-4">
              <VField
              name="課程費用"
              id="coursePrice"
              type="number"
              rules="required|min_value:100|max_value:100000"
              class="form-control"
              :class="{ 'is-invalid': errors['課程費用'] }"
              placeholder="請輸入課程費用"
              v-model="courseTemp.price"
              />
              <ErrorMessage class="invalid-feedback" name="課程費用"/>
            </div>
            </div>
            <div class="row mb-3">
              <div class="col-auto">
                <label for="courseCategory" class="col-form-label">
                  教學項目：
                </label>
              </div>
              <div class="col-6">
              <VField name="教學項目" 
                      as="select" 
                      class="form-select" 
                      aria-label="Default select example"
                      id="courseCategory"
                      rules="required"
                      :class="{ 'is-invalid': errors['教學項目'] }"
                      v-model="courseTemp.category">
              <option value="" selected>請選擇教學項目</option>
              <option value="短笛">短笛</option>
              <option value="長笛">長笛</option>
              <option value="單簧管">單簧管</option>
              <option value="雙簧管">雙簧管</option>
              <option value="英國管">英國管</option>
              <option value="巴松管">巴松管</option>
              <option value="薩克斯風">薩克斯風</option>
              <option value="管風琴">管風琴</option>
              <option value="小號">小號</option>
              <option value="短號">短號</option>
              <option value="長號">長號</option>
              <option value="法國號">法國號</option>
              <option value="低音號">低音號</option>
              <option value="巴里東">巴里東</option>
              <option value="上低音號">上低音號</option>
              <option value="小提琴">小提琴</option>
              <option value="中提琴">中提琴</option>
              <option value="大提琴">大提琴</option>
              <option value="低音提琴">低音提琴</option>
              <option value="豎琴">豎琴</option>
              <option value="斑鳩琴">斑鳩琴</option>
              <option value="曼陀林">曼陀林</option>
              <option value="大鍵琴">大鍵琴</option>
              <option value="魯特琴">魯特琴</option>
              <option value="爵士鼓">爵士鼓</option>
              <option value="木箱鼓">木箱鼓</option>
              <option value="木琴">木琴</option>
              <option value="馬林巴琴">馬林巴琴</option>
              <option value="鋼琴">鋼琴</option>
              <option value="數位鋼琴">數位鋼琴</option>
              <option value="傳統電子琴">傳統電子琴</option>
              <option value="電子琴">電子琴</option>
              <option value="電子合成器">電子合成器</option>
              <option value="揚琴">揚琴</option>
              <option value="中國笛">中國笛</option>
              <option value="笙">笙</option>
              <option value="嗩吶">嗩吶</option>
              <option value="蕭">蕭</option>
              <option value="胡琴">胡琴</option>
              <option value="古箏">古箏</option>
              <option value="柳琴">柳琴</option>
              <option value="琵琶">琵琶</option>
              <option value="阮">阮</option>
              <option value="其他中國樂器">其他中國樂器</option>
              <option value="木吉他">木吉他</option>
              <option value="古典吉他">古典吉他</option>
              <option value="電吉他">電吉他</option>
              <option value="烏克麗麗">烏克麗麗</option>
              <option value="電貝斯">電貝斯</option>
              <option value="口琴">口琴</option>
              <option value="手風琴">手風琴</option>
              <option value="手碟鼓">手碟鼓</option>
              <option value="其它樂器">其它樂器</option>
              <option value="編曲">編曲</option>
              <option value="作曲">作曲</option>
              <option value="詞曲創作">詞曲創作</option>
              <option value="配樂">配樂</option>
              <option value="錄音">錄音</option>
              <option value="音效">音效</option>
              <option value="成音工程">成音工程</option>
              <option value="混音">混音</option>
              <option value="樂理">樂理</option>
              <option value="聽寫">聽寫</option>
              <option value="音樂理論">音樂理論</option>
              <option value="流行歌唱">流行歌唱</option>
              <option value="聲樂">聲樂</option>
              <option value="音樂劇">音樂劇</option>
              <option value="和聲">和聲</option>
              <option value="視唱">視唱</option>
              <option value="B-BOX">B-BOX</option>
              <option value="Acappella">Acappella</option>
              <option value="指揮">指揮</option>
              <option value="音樂治療">音樂治療</option>
              <option value="DJ">DJ</option>
              <option value="合奏指導">合奏指導</option>
              <option value="音樂軟體">音樂軟體</option>
              <option value="樂器製作">樂器製作</option>
              <option value="其它非樂器類">其它非樂器類</option>
              </VField>
            <ErrorMessage class="invalid-feedback" name="教學項目"/>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-auto">
                <label for="courseTime" class="col-form-label">
                  授課時間：
                </label>
              </div>
              <div class="col-4">
                <VField
                  name="授課時間"
                  id="courseTime"
                  type="number"
                  rules="required|min_value:30|max_value:600"
                  class="form-control"
                  :class="{ 'is-invalid': errors['授課時間'] }"
                  placeholder="請輸入授課時間(分鐘)"
                  v-model="courseTemp.minutes"
                />
                <ErrorMessage class="invalid-feedback" name="授課時間"/>
              </div>
            </div>
            <!-- <div class="row mb-3">
              <div class="col-auto">
                上課方式：
              </div>
              <div class="col-8">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" 
                        type="checkbox" 
                        id="studentHome" 
                        value="在學生家" 
                        name="courseMethod1" 
                        v-model="courseTemp.courseMethod"> 
                  <label for="studentHome">在學生家</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" 
                        type="checkbox" 
                        id="teacherHome" 
                        value="在老師家" 
                        name="courseMethod2" 
                        v-model="courseTemp.courseMethod">
                  <label for="teacherHome">在老師家</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" 
                        type="checkbox" 
                        id="online" 
                        value="線上" 
                        name="courseMethod3" 
                        v-model="courseTemp.courseMethod">
                  <label for="online">線上</label>
                </div>
              </div>
            </div> -->
            <!-- <div class="row mb-3">
              <div class="col-auto">
                <label for="cityName" class="col-form-label"
                :class="{'d-none' : courseTemp.courseMethod.length == 1 && courseTemp.courseMethod[0] == '線上'}">
                  上課地點：
                </label>
              </div>
              <div class="col-6"
              :class="{'d-none' :courseTemp.courseMethod.length == 1 && courseTemp.courseMethod[0] == '線上'}">
                <VField name="上課地點" 
                        as="select" 
                        class="form-select" 
                        aria-label="Default select example"
                        id="cityName"
                        :class="{ 'is-invalid': errors['上課地點'] }"
                        v-model="courseTemp.cityName">
                  <option value="" selected>請選擇上課地點</option>
                  <option value="台北市">台北市</option>
                  <option value="基隆市">基隆市</option>
                  <option value="新北市">新北市</option>
                  <option value="宜蘭縣">宜蘭縣</option>
                  <option value="桃園市">桃園市</option>
                  <option value="新竹市">新竹市</option>
                  <option value="新竹縣">新竹縣</option>
                  <option value="苗栗縣">苗栗縣</option>
                  <option value="台中市">台中市</option>
                  <option value="彰化縣">彰化縣</option>
                  <option value="南投縣">南投縣</option>
                  <option value="嘉義市">嘉義市</option>
                  <option value="嘉義縣">嘉義縣</option>
                  <option value="雲林縣">雲林縣</option>
                  <option value="台南市">台南市</option>
                  <option value="高雄市">高雄市</option>
                  <option value="澎湖縣">澎湖縣</option>
                  <option value="金門縣">金門縣</option>
                  <option value="屏東縣">屏東縣</option>
                  <option value="台東縣">台東縣</option>
                  <option value="花蓮縣">花蓮縣</option>
                  <option value="連江縣">連江縣</option>
                </VField>
                <ErrorMessage class="invalid-feedback" name="上課地點"/>
              </div>
            </div> -->
            <div class="row mb-3">
              <div class="col-12 col-lg-8">
                <label for="courseIntro" class="form-label">
                  課程介紹：
                </label>
                <VField 
                  name="課程介紹"
                  class="form-control" 
                  id="courseIntro" 
                  as="textarea"
                  rows="5"
                  rules="required|max:500"
                  :class="{ 'is-invalid': errors['課程介紹'] }"
                  placeholder="限定500字元內"
                  v-model="courseTemp.intro"
                  >
                </VField>
                <ErrorMessage class="invalid-feedback" name="課程介紹"/>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12 col-lg-8 mb-3">
                <div class="row">
                  <div class="col-4">
                    <label for="coursePhoto" 
                        class="col-form-label"
                        accept="image/png, image/jpeg">
                      上傳一張課程封面照：
                    </label>
                  </div>
                  <div class="col-8">
                    <VField
                    name="課程封面"
                    type="file"
                    id="coursePhoto"
                    class="form-control"
                    rules="required"
                    v-model="courseTemp.img"
                    :class="{ 'is-invalid': errors['課程封面'] }"
                    @change="uploadPhoto('course',$event)"
                  >
                </VField>
                <ErrorMessage class="invalid-feedback" name="課程封面"/>
                    <img class="img-fluid mt-3" 
                        :src="courseTemp.img" 
                        alt="課程封面照(新)"
                        v-if="courseTemp.img"/>
                    <img class="img-fluid mt-3" 
                        :src="courseTemp.img" 
                        alt="課程封面照(舊)"
                        v-else/>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">
              取消
            </button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
              確認
            </button>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  courseTemp: {
    type: Object,
  },
})

const emit = defineEmits(['update:courseTemp', 'update:photo']);

function saveCourseInfo() {
  console.log(1231)
  emit('update:courseTemp', props.courseTemp);
}

function handleFileChange(event) {
  emit('update:photo', event.target.files[0]);
}

</script>
  
<style lang="scss" scoped>
  
</style>