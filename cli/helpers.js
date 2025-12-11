export function evaluateText(liturgy) {
  let sum = 0
  let product = 1
  
  try {
    liturgy.readings.forEach(
      ({ text, ref, main, optional, long, short }) => {
        if (main && optional) {
          sum += main.text.length + optional.text.length + main.ref.length + optional.ref.length
          product *= main.text.length * optional.text.length * main.ref.length * optional.ref.length
        } else if (long && short) {
          sum += long.text.length + short.text.length + long.ref.length + short.ref.length
          product *= long.text.length * short.text.length * long.ref.length * short.ref.length
        } else {
          sum += text.length  + ref.length
          product *= text.length * ref.length
        }
      }
    )
  } catch (error) {
    console.error('Error in evaluateText', liturgy)
    throw error
  }

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
