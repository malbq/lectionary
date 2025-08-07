export function print(input) {
  process.stdout.write('\uFEFF')
  const lines = prepareInput(input)
  const refs = parseRefs([...lines])
  const texts = parseTexts([...lines])
  const readings = []
  readings.push({
    type: 'reading',
    ref: refs.readingRef1,
    text: texts.reading1,
  })
  readings.push({
    type: 'psalm',
    ref: refs.psalmRef,
    text: texts.psalm,
  })
  if (refs.readingRef2) {
    readings.push({
      type: 'reading',
      ref: refs.readingRef2,
      text: texts.reading2,
    })
  }
  readings.push({
    type: 'gospel',
    ref: refs.gospelRef,
    text: texts.gospel,
  })
  process.stdout.write('\uFEFF')
  console.log(`    - type: reading`)
  console.log(`      ref: ${refs.readingRef1}`)
  console.log(`      text: |`)
  console.log(`        ${texts.reading1.join('\n        ')}`)

  console.log(`    - type: psalm`)
  console.log(`      ref: ${refs.psalmRef}`)
  console.log(`      text: |`)
  console.log(`        ${texts.psalm.join('\n        ')}`)

  if (refs.readingRef2) {
    console.log(`    - type: reading`)
    console.log(`      ref: ${refs.readingRef2}`)
    console.log(`      text: |`)
    console.log(`        ${texts.reading2.join('\n        ')}`)
  }
  console.log(`    - type: gospel`)
  console.log(`      ref: ${refs.gospelRef}`)
  console.log(`      text: |`)
  console.log(`        ${texts.gospel.join('\n        ')}`)
}

export function prepareInput(input) {
  return input
    .split('\n')
    .filter((line) => line.trim().length > 0 && !/(^\d+\w?$|^\w$)/.test(line))
    .map((line) => line.replace(/(\*|†|\[(https.+)?pics\/cruzevangelho\.png\])/, '').trim())
}

export function parseRefs(lines) {
  skipUntil(lines, /^(leitura d|início d)/i)
  const readingRef1 = lines[0]

  skipUntil(lines, /^salmo responsorial/i)
  if (!/(Sl|SI)/.test(lines[0]) && !/^R./.test(lines[1])) {
    lines.shift()
  }
  const psalmRef = lines[0]

  let readingRef2 = ''
  skipUntil(lines, /^(segunda leitura|evangelho|aclamação ao evangelho)/i)
  if (/^segunda leitura/i.test(lines[0])) {
    skipUntil(lines, /^(leitura d|início d)/i)
    readingRef2 = lines[0]
  }
  skipUntil(
    lines,
    /^(paixão de nosso senhor jesus cristo segundo|proclamação do evangelho|conclusão do evangelho)/i
  )
  const gospelRef = lines[0]

  return {
    readingRef1,
    psalmRef,
    readingRef2,
    gospelRef,
  }
}

export function parseTexts(lines) {
  const reading1 = []
  const psalm = []
  const reading2 = []
  const gospel = []

  skipUntil(lines, /^(leitura d|início d)/i)
  let line = lines.shift()
  reading1.push(line.slice(0, line.search(/\d/)).trim())
  reading1.push(...readUntil(lines, /^salmo responsorial/i))
  skipUntil(lines, /^R\./i)
  psalm.push(...readUntil(lines, /^(segunda leitura|evangelho|aclamação ao evangelho)/i))
  if (/^segunda leitura/i.test(lines[0])) {
    skipUntil(lines, /^(leitura d|início d)/i)
    line = lines.shift()
    reading2.push(line.slice(0, line.search(/\d/)).trim())
    reading2.push(...readUntil(lines, /^(evangelho|aclamação ao evangelho)/i))
  }
  skipUntil(
    lines,
    /^(paixão de nosso senhor jesus cristo segundo|proclamação do evangelho|conclusão do evangelho)/i
  )
  line = lines.shift()
  gospel.push(line.slice(0, line.search(/\d/)).trim())
  gospel.push(...lines)

  reading1.splice(1, 0, '')
  reading1.splice(reading1.length - 1, 0, '')
  {
    let i = 3
    while (i < reading1.length - 2) {
      if (!/(\.|"|!|\?)$/.test(reading1[i])) {
        reading1[i] += ' ' + reading1[i + 1]
        reading1.splice(i + 1, 1)
      } else {
        i++
      }
    }
  }
  psalm.splice(1, 0, '')
  for (let i = 0; i < psalm.length; i++) {
    if (/.+R\.$/.test(psalm[i]) && i < psalm.length - 1) {
      psalm.splice(i + 1, 0, '')
    }
  }
  if (reading2.length > 0) {
    reading2.splice(1, 0, '')
    reading2.splice(reading2.length - 1, 0, '')
    {
      let i = 3
      while (i < reading2.length - 2) {
        if (!/(\.|"|!|\?)$/.test(reading2[i])) {
          reading2[i] += ' ' + reading2[i + 1]
          reading2.splice(i + 1, 1)
        } else {
          i++
        }
      }
    }
  }
  gospel.splice(1, 0, '')
  gospel.splice(gospel.length - 1, 0, '')
  {
    let i = 3
    while (i < gospel.length - 2) {
      if (!/(\.|"|!|\?)$/.test(gospel[i])) {
        gospel[i] += ' ' + gospel[i + 1]
        gospel.splice(i + 1, 1)
      } else {
        i++
      }
    }
  }

  return {
    reading1,
    psalm,
    reading2,
    gospel,
  }
}

export function skipUntil(lines, regex) {
  while (lines.length > 0 && !regex.test(lines[0])) {
    lines.shift()
  }
}

export function readUntil(lines, regex) {
  const result = []
  while (lines.length > 0 && !regex.test(lines[0])) {
    result.push(lines.shift())
  }
  return result
}
