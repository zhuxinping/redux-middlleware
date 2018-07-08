let sum=(a,b)=>a+b;
let upper=str=>str.toUpperCase();
//从右向左执行
let res=compose(upper,sum)('a','b');
console.log(res);
function compose(...fns) {
    {//[upper,sum]
        return function (...args) {
            let last=fns.pop();
           return fns.reduceRight((composed,fn)=>{
                return fn(composed);
            },last(...args));
        }
    }
}
