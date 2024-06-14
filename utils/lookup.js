import { parseRefs, parseTexts, prepareInput } from "../utils/parser.js";

process.stdout.write('\uFEFF');

const input = '' // fetch from pdf or web

const lines = prepareInput(input);
const refs = parseRefs([...lines]);
const texts = parseTexts([...lines]);
const readings = []
readings.push({
  type: 'reading',
  ref: refs.readingRef1,
  text: texts.reading1
});
readings.push({
  type: 'psalm',
  ref: refs.psalmRef,
  text: texts.psalm
});
if (refs.readingRef2) {
  readings.push({
    type: 'reading',
    ref: refs.readingRef2,
    text: texts.reading2
  });
}
readings.push({
  type: 'gospel',
  ref: refs.gospelRef,
  text: texts.gospel
});
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
