// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
// https://www.w3schools.com/charsets/ref_html_ascii.asp

const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value // Parse as a Number
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol // total number of checkboxes checked
    // console.log(typesCount);
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]) // filters out items/checkboxes that are true
    // console.log(typesArr);
    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            // console.log(type);
            const funcName = Object.keys(type)[0]
            // console.log(funcName);
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}
// Refer https://www.w3schools.com/charsets/ref_html_ascii.asp
function getRandomLower() {
    // return String.fromCharCode(97) // output: a (a-z: 97-122)
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    
}

function getRandomUpper() {
    // return String.fromCharCode(65) // output: a (A-Z: 65-90)
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
        // return String.fromCharCode(48) // output: 0 (0-9: 48-57)
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}