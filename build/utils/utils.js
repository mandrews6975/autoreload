"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInt = void 0;
function validateInt(value, name) {
    if (Number.isNaN(parseInt(value))) {
        let message = `${name} "${value != null ? value.toString() : value}" is not an integer`;
        console.log(message);
        return new Error(message);
    }
    return null;
}
exports.validateInt = validateInt;
