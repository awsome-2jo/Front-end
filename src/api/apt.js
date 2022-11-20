import { apiInstance } from "@/api";

const api = apiInstance();

/**
 * GET: 아파트 목록
 * @param {Object} param 쿼리 파라미터
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getAptList(param, success, fail) {
  await api.get(`/apt/list`, { params: param }).then(success).catch(fail);
}

/**
 * GET: 아파트 목록 개수
 * @param {Object} param 쿼리 파라미터
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getAptListCount(param, success, fail) {
  await api.get(`/apt/list/count`, { params: param }).then(success).catch(fail);
}

/**
 * GET: 지역별 거래통계
 * @param {Object} param 쿼리 파라미터
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getAptRegStats(param, success, fail) {
  await api.get(`/apt/list/stats`, { params: param }).then(success).catch(fail);
}

/**
 * GET: 아파트 상세정보
 * @param {String} aptCode 아파트 코드
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getAptDetail(aptCode, success, fail) {
  await api.get(`/apt/list/detail/${aptCode}`).then(success).catch(fail);
}

/**
 * GET: 시도 정보
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getSido(success, fail) {
  await api.get(`/apt/sido`).then(success).catch(fail);
}

/**
 * GET: 구군 정보
 * @param {Number} sido 광역시/도 지역코드
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getGugun(sido, success, fail) {
  await api.get(`/apt/gugun/${sido}`).then(success).catch(fail);
}

/**
 * GET: 동 정보
 * @param {Number} gugun 광역시/도 지역코드
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getDong(gugun, success, fail) {
  await api.get(`/apt/dong/${gugun}`).then(success).catch(fail);
}

export { getAptListCount, getAptList, getAptRegStats, getAptDetail, getSido, getGugun, getDong };
