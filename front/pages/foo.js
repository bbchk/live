// The prime factors of 13195 are 5,7,13 and 29

// What is the largest prime factor of the number?
// 600851475143

const factors = []
let num = 600851475143

let i = 2

while (num > 1) {
  if (num % i === 0) {
    factors.push(i)
    num = num / i
  } else {
    ++i
  }
}

console.log(Math.max(...factors))
