import { apiInstance } from "@/api";

const api = apiInstance();

/**
 * GET: 공지사항 목록
 * @param {Object} param 쿼리 파라미터
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getNoticeList(params, success, fail) {
  await api.get(`/notice/list`, { params }).then(success).catch(fail);
}

/**
 * GET: 공지사항 목록 개수
 * @param {Object} param 쿼리 파라미터
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getNoticeListCount(params, success, fail) {
  await api.get(`/notice/list/count`, { params }).then(success).catch(fail);
}

/**
 * POST: 공지사항 추가
 * @param {Object} body 공지사항
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function addNotice(body, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.post(`/notice/add`, body).then(success).catch(fail);
}

/**
 * DELETE: 공지사항 삭제
 * @param {Number} no 공지사항 번호
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function deleteNotice(no, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.delete(`/notice/delete/${no}`).then(success).catch(fail);
}

/**
 * PUT: 공지사항 수정
 * @param {Object} body 공지사항 내용
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function modifyNotice(body, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.put(`/notice/modify`, body).then(success).catch(fail);
}

/**
 * GET: 공지사항 상세
 * @param {Number} no 공지사항 번호
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getNoticeDetail(no, success, fail) {
  await api.get(`/notice/detail/${no}`).then(success).catch(fail);
}

export {
  getNoticeList,
  getNoticeListCount,
  addNotice,
  deleteNotice,
  modifyNotice,
  getNoticeDetail,
};
