const utils = require('../utils/writer.js');
const { checkDivideWithZero, calculate } = require('../utils/calculator.js');

/**
 *
 * body CalculatorOperation Optional description in *Markdown*
 * op OperationType The Operation
 * returns calcResult
 **/
exports.postCalc = function (body, op) {
    const { num1, num2 } = body;
    // Guard - illegal math operation
    const isDivideWithZero = checkDivideWithZero(num2, op)

    if (isDivideWithZero) {
        reject(utils.respondWithCode(400, { message: "Cant divide number with 0" }))
    }
    // Pass the check , calculate the result
    const result = calculate(num1, num2, op)

    return { result };

}
