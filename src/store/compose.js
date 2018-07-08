//'我很美'+'李霞'+'有钱';
function addFirst(str) {
    return '我很美'+str;
}

function addSecond(str) {
    return str+'有钱';
}
// addSecond(addFirst('李霞'));//把第一个函数执行的结果当第二个函数的参数传进去
// console.log(addSecond(addFirst('李霞')));
function compose(...fns) {
    return function (...args) {
       let last=fns.pop();//最后一个函数addFirst
       return fns.reduceRight(function (prev,next,currentIndex,arr) {//prev表示上一个函数返回的结果 next表示下一个函数
          return next(prev);//这里next(prev)表示下一个函数执行的结果返回出去，传入的参数是上一个函数的返回结果
        },last(...args));
    }
}
console.log(compose(addSecond,addFirst)('李霞'));