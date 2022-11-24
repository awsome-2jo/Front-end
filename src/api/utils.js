/**
 * 거래가 금액 문자열 출력 메서드
 * @param {Number} deal 거래가 (단위 : 만원)
 * @returns 금액 문자열 (ex. 10억 1000)
 */
function getDealString(deal) {
  let urk = Math.round(deal / 10000);
  let marn = deal % 10000;
  let arr = [];
  if (urk) arr.push(`${urk}억`);
  if (marn) arr.push(marn);
  return arr.join(" ");
}

/**
 * 숫자 표기 문자열 출력 메서드
 * @param {Number} num 숫자
 * @returns 숫자 표기 문자열 (ex. 100,000)
 */
function getNumberString(num) {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
/**
 * hex 색상을 rgb로 변환하는 메서드
 * @param {String} hex hex 색상코드
 * @returns {Object} {r, g, b}
 */
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export { getDealString, getNumberString, hexToRgb };
