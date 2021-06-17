export default function fillZero(width, str) {
    return str.length >= width ? str : new Array(width - str.length + 1).join("0") + str; //남는 길이만큼 0으로 채움
}
