import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parseArgs, styleText } from 'node:util'
import { evaluateMeta, evaluateText } from './helpers.js'

const thisPath = fileURLToPath(import.meta.url)
const lectionaryPath = join(dirname(thisPath), '../data/pt_BR.json')
const lectionaryUrl = pathToFileURL(lectionaryPath)

const lectionaryText = readFileSync(lectionaryPath).toString()
const lectionary = JSON.parse(lectionaryText)

const { values: options } = parseArgs({
  options: {
    summary: { type: 'boolean', short: 's', default: true },
    detailed: { type: 'boolean', short: 'd', default: false },
    all: { type: 'boolean', short: 'a', default: false },
  },
})

if (options.summary) {
  let emptyMeta = 0
  let someMissingMeta = 0
  let okMeta = 0

  let emptyText = 0
  let someMissingText = 0
  let okText = 0

  const liturgies = Object.values(lectionary)
  liturgies.forEach((liturgy) => {
    const resultMeta = evaluateMeta(liturgy)
    if (resultMeta === 2) emptyMeta++
    if (resultMeta === 1) someMissingMeta++
    if (resultMeta === 0) okMeta++

    const resultText = evaluateText(liturgy)
    if (resultText === 2) emptyText++
    if (resultText === 1) someMissingText++
    if (resultText === 0) okText++
  })

  console.log(`${liturgies.length} entries`)
  console.log('')
  console.log(dangerStyle(emptyMeta, `${emptyMeta} have empty title and subtitle`))
  console.log(
    warningStyle(someMissingMeta, `${someMissingMeta} have some title and/or subtitle missing`)
  )
  console.log(okStyle(okMeta, `${okMeta} have title and subtitle`))
  console.log('')
  console.log(dangerStyle(emptyText, `${emptyText} have empty text`))
  console.log(warningStyle(someMissingText, `${someMissingText} have some text missing`))
  console.log(okStyle(okText, `${okText} have complete text`))
}

if (options.detailed || options.all) {
  const liturgies = Object.entries(lectionary)
  liturgies.forEach(([key, liturgy]) => {
    const resultMeta = evaluateMeta(liturgy)
    const metaText =
      resultMeta === 2
        ? dangerStyle(1, 'meta')
        : resultMeta === 1
        ? warningStyle(1, 'meta')
        : okStyle(1, 'meta')

    const resultText = evaluateText(liturgy)
    const textText =
      resultText === 2
        ? dangerStyle(1, 'text')
        : resultText === 1
        ? warningStyle(1, 'text')
        : okStyle(1, 'text')

    if (options.all || resultMeta > 0 || resultText > 0) {
      const lineNumber = findLineNumber(lectionaryText, new RegExp(`'?${key}'?:`))
      console.log(
        `${key}: ${metaText} | ${textText} ${styleText('dim', `(${lectionaryUrl}:${lineNumber})`)}`
      )
    }
  })
}

function dangerStyle(value, text) {
  if (value === 0) return styleText(['red', 'dim'], text)
  return styleText('red', text)
}

function warningStyle(value, text) {
  if (value === 0) return styleText(['yellow', 'dim'], text)
  return styleText('yellow', text)
}

function okStyle(value, text) {
  if (value === 0) return styleText(['greenBright', 'dim'], text)
  return styleText('greenBright', text)
}

function findLineNumber(text, regex) {
  return text
    .split(/\r?\n/)
    .map(function (line, i) {
      if (regex.test(line)) {
        return i + 1
      }
    })
    .filter(Boolean)
}
