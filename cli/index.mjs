import { Command } from 'commander'
import chalk from 'chalk'
import { readFileSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { join, dirname } from 'path'
import { evaluateText, evaluateMeta } from './helpers.mjs'

const thisPath = fileURLToPath(import.meta.url)
const lectionaryPath = join(dirname(thisPath), '../data/pt_BR.json')
const lectionaryUrl = pathToFileURL(lectionaryPath)

const lectionaryText = readFileSync(lectionaryPath).toString()
const lectionary = JSON.parse(lectionaryText)

const program = new Command()

program
  .option('-s, --summary', 'Show aggregate lectionary status', true)
  .option('-d, --detailed', 'Show status for incomplete liturgies', false)
  .option('-a, --all', 'Show status for all lectionary', false)

program.parse()

const options = program.opts()

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
  console.log(dangerStyle(emptyMeta)(`${emptyMeta} have empty title and subtitle`))
  console.log(warningStyle(someMissingMeta)(`${someMissingMeta} have some title and/or subtitle missing`))
  console.log(okStyle(okMeta)(`${okMeta} have title and subtitle`))
  console.log('')
  console.log(dangerStyle(emptyText)(`${emptyText} have empty text`))
  console.log(warningStyle(someMissingText)(`${someMissingText} have some text missing`))
  console.log(okStyle(okText)(`${okText} have complete text`))
}

if (options.detailed || options.all) {
  const liturgies = Object.entries(lectionary)
  liturgies.forEach(([key, liturgy]) => {
    const resultMeta = evaluateMeta(liturgy)
    const metaStyle = resultMeta === 2 ? dangerStyle()
      : resultMeta === 1 ? warningStyle() : okStyle()

    const resultText = evaluateText(liturgy)
    const textStyle = resultText === 2 ? dangerStyle()
      : resultText === 1 ? warningStyle() : okStyle()

    if (options.all || resultMeta > 0 || resultText > 0) {
      const lineNumber = findLineNumber(lectionaryText, new RegExp(`'?${key}'?:`))
      console.log(`${key}: ${metaStyle('meta')} | ${textStyle('text')} ${chalk.dim(`(${lectionaryUrl}:${lineNumber})`)}`)
    }
  })
}

function dangerStyle(value) {
  if (value === 0) return chalk.red.dim
  return chalk.red
}

function warningStyle(value) {
  if (value === 0) return chalk.yellow.dim
  return chalk.yellow
}

function okStyle(value) {
  if (value === 0) return chalk.greenBright.dim
  return chalk.greenBright
}

function findLineNumber(text, regex) {
  return text.split(/\r?\n/).map(function (line, i) {
    if (regex.test(line)) {
      return i + 1
    }
  }).filter(Boolean)
}