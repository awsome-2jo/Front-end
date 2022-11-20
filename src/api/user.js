import { apiInstance } from "@/api";

const api = apiInstance();

/**
 * POST: 회원가입
 * @param {Object} body 유저정보
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function regist(body, success, fail) {
  await api.post(`/user/regist`, body).then(success).catch(fail);
}

/**
 * POST: 로그인
 * @param {Object} body 유저정보
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function login(body, success, fail) {
  await api.post(`/user/login`, body).then(success).catch(fail);
}

/**
 * GET: 아이디 중복체크
 * @param {String} id 입력한 아이디
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function checkId(id, success, fail) {
  await api.get(`/user/duplicate/${id}`).then(success).catch(fail);
}

/**
 * POST: 아이디 찾기
 * @param {Object} body 유저정보
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function findId(body, success, fail) {
  await api.post(`/user/find/id`, body).then(success).catch(fail);
}

/**
 * POST: 비밀번호 찾기
 * @param {Object} body 유저정보
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function findPass(body, success, fail) {
  await api.post(`/user/find/pass`, body).then(success).catch(fail);
}

/**
 * POST: 회원정보
 * @param {Object} body 유저정보
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getUserInfo(body, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.post(`/user/info`, body).then(success).catch(fail);
}

/**
 * GET: 토큰 유효성 확인
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function checkToken(success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/access`).then(success).catch(fail);
}

/**
 * GET: 토큰 재발급
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function refreshToken(success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token");
  await api.get(`/user/access`).then(success).catch(fail);
}

/**
 * DELETE: 회원 탈퇴
 * @param {String} id 유저 아이디
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function withdraw(id, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.delete(`/user/delete/${id}`).then(success).catch(fail);
}

/**
 * GET: 회원 목록
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function userList(success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/list`).then(success).catch(fail);
}

/**
 * PUT: 회원 수정
 * @param {Object} body 유저정보
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function modifyUser(body, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.put(`/user/modify`, body).then(success).catch(fail);
}

export {
  regist,
  login,
  checkId,
  findId,
  findPass,
  getUserInfo,
  checkToken,
  refreshToken,
  withdraw,
  userList,
  modifyUser,
};
