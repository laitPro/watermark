// Эта функция проверяет является ли переданный аргумент числом

module.exports = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
