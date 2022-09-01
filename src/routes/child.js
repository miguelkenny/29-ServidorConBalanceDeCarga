process.on('message', cant => {
  let numbersRandoms = [].sort()
  let uniqueNumbers = []
  let repeatedNumbers = []
  let count = 1
  let responseList = []

  for (let i = 0; i < cant; i++) {
    let numRandom = Math.floor(Math.random() * (1 + 1000 + 1) + 1)
    numbersRandoms.push(numRandom)
  }

  //Antes de contar las repeticiones ordenamos el array
  numbersRandoms.sort()

  for (let i = 0; i < numbersRandoms.length; i++) {
    if (numbersRandoms[i + 1] === numbersRandoms[i]) {
      count++
      console.log(count)
    } else {
      uniqueNumbers.push(numbersRandoms[i])
      repeatedNumbers.push(count)

      count = 1
    }
  }

  for (let i = 0; i < uniqueNumbers.length; i++) {
    responseList.push(`El valor ${uniqueNumbers[i]} se repite ${repeatedNumbers[i]} veces`)
  }
  process.send(responseList)
})