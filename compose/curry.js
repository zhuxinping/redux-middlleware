function currying(fn) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        }
        else {
            Array.prototype.push.apply(args, arguments);
            return arguments.callee;
        }
    }
}
function add() {
    var vals = Array.prototype.slice.call(arguments);
    return vals.reduce((pre, val) => {
        return pre + val;
    });
}

var newAdd = currying(add, 1, 2, 3);
newAdd(4, 5);
newAdd(6, 7);

console.log(newAdd());  // 28

