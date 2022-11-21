import { apiInstance } from "@/api";

const api = apiInstance();

/**
 * GET: 네이버 뉴스
 * @param {Object} param 쿼리 파라미터
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getNews(param, success, fail) {
  await api.get(`/naver/news`, { params: param }).then(success).catch(fail);
}

/**
 * GET: 네이버 뉴스
 * @param {Object} param 쿼리 파라미터
 * @param {Function} success 성공시 실행할 함수
 * @param {Function} fail 실패시 실행할 함수
 */
async function getBlog(param, success, fail) {
  await api.get(`/naver/blog`, { params: param }).then(success).catch(fail);
}

export { getNews, getBlog };
