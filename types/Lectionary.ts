export enum Color {
  green = 'green',
  white = 'white',
  red = 'red',
  purple = 'purple',
  pink = 'pink',
}

export enum ReadingType {
  reading = 'reading',
  psalm = 'psalm',
  gospel = 'gospel',
}

type ReadingOption = {
  short: string
  long: string
}

type Reading = {
  type: ReadingType
  ref: string
  text: string | ReadingOption
}

export type Liturgy = {
  title: string
  subtitle: string
  color: Color
  readings: Array<Reading>
}

export type Lectionary = {
  [key: string]: Liturgy
}
