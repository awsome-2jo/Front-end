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

export {getDealString, getNumberString};