const oprations = {
    add: (n1, n2) => n1 + n2,
    sub: (n1, n2) => n1 - n2,
    multiply: (n1, n2) => n1 * n2,
    // the api validators will guard for dividing by zero , no need to handle it here
    div: (n1, n2) => n1 / n2,
    pow: (n1, n2) => Math.pow(n1, n2)
}

exports.calculate = function (num1, num2, op) {
    const calculate = oprations[op]
    return calculate(num1, num2)
}
exports.checkDivideWithZero = function (num2, op) {
    return num2 === 0 && op === 'div'
}
