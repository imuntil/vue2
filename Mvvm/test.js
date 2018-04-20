const curry = fn => {
  let args = []
  return (...rest) => {
    args = [...args, ...rest]
    if (args.length > 5) {
      return fn.apply(null, args)
    }
  }
}

const add = (...args) => {
  console.log(args.reduce((total, v) => total + v, 0))
}

add(1, 2, 3, 4)

const add2 = curry(add)
add2(1)
add2(1)
add2(1)
add2(1, 5)
add2(7)