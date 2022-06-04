export enum Color {
  green = 'green',
  white = 'white',
  red = 'red',
  purple = 'purple',
  pink = 'pink',
}

export enum ReadingType {
  reading = 'reading',
  epistle = 'epistle',
  psalm = 'psalm',
  gospel = 'gospel',
}

export type Reading = {
  type: ReadingType
  ref: string
  text: string
} | {
  type: ReadingType
  main: {
    ref: string
    text: string
  }
  optional: {
    ref: string
    text: string
  }
} | {
  type: ReadingType
  short: {
    ref: string
    text: string
  }
  long: {
    ref: string
    text: string
  }
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
