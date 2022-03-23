export function evaluateText(liturgy) {
  let sum = 0
  let product = 1
  
  liturgy.readings.forEach(
    ({ text, ref }) => {
      if (typeof text === 'object') {
        sum += text.short.length + text.long.length + ref.length
        product *= text.short.length * text.long.length * ref.length
      } else {
        sum += text.length  + ref.length
        product *= text.length * ref.length
      }
    }
  )

  if (sum === 0 && product === 0) {
    return 2 // no text
  }

  if (sum > 0 && product === 0) {
    return 1 // some text missing
  }

  return 0 // ok
}

export function evaluateMeta(liturgy) {
  const sum = liturgy.title.length + liturgy.subtitle.length
  const product = liturgy.title.length * liturgy.subtitle.length

  if (sum === 0 && product === 0) {
    return 2 // no text
  }

  if (sum > 0 && product === 0) {
    return 1 // some text missing
  }

  return 0 // ok
}
