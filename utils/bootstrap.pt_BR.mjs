import { writeFile } from 'fs/promises'

const strings = {
  day: {
    1: 'Domingo',
    2: 'Segunda-feira',
    3: 'Terça-feira',
    4: 'Quarta-feira',
    5: 'Quinta-feira',
    6: 'Sexta-feira',
    7: 'Sábado',
  },
  time: {
    advent: 'Tempo do Advento',
    christmas: 'Tempo do Natal',
    ordinary: 'Tempo Comum',
    lent: 'Tempo da Quaresma',
    easter: 'Tempo da Páscoa',
  },
  special: {
    holyWeek: 'Semana Santa',
    easterTriduum: 'Tríduo Pascal',
    christmasOctave: 'Oitava de Natal',
    easterOctave: 'Oitava de Páscoas',
    beforeEpiphany: 'Antes da Epifania',
    afterEpiphany: 'Após a Epifania',
    lentBeginning: 'Início da Quaresma',
    afterAshes: 'Após as Cinzas',
  },
  reference: {
    holyFamily: 'Sagrada Família',
    epiphany: 'Epifania do Senhor',
    baptism: 'Batismo do Senhor',
    mostHolyTrinity: 'Santíssima Trindade',
    corpusChristi: 'Corpus Christi',
    sacredHeartOfJesus: 'Sagrado Coração de Jesus',
    immaculateHeartOfMary: 'Imaculado Coração de Maria',
    assumption: 'Assunção de Nossa Senhora',
    'easter.week7.6.vigil': 'Domingo de Pentecostes, Missa da Vigília',
    'easter.week8.0': 'Domingo de Pentecostes',
    '1224.vigil': 'Natal do Senhor, Missa da Vigília',
    '1224.night': 'Natal do Senhor, Missa da Noite',
    '1225.dawn': 'Natal do Senhor, Missa da Aurora',
    '1225.day': 'Natal do Senhor, Missa do Dia',
    '1226': 'Santo Estêvão, Primeiro Mártir',
    '1227': 'São João Evangelista',
    '1228': 'Santos Inocentes, mártires',
    '0101': 'Santa Maria, Mãe de Deus',
    'lent.0.3': 'Quarta-feira de Cinzas',
    'lent.6.0': 'Domingo de Ramos da Paixão do Senhor',
    'easter.week0.4.dawn': 'Missa do Crisma',
    'easter.week0.4.day': 'Ceia do Senhor',
    'easter.week0.5': 'Paixão de Nosso Senhor Jesus Cristo',
    'easter.week0.6': 'Solene Vigília Pascal',
    'easter.week1.0.a': 'Domingo de Páscoa na Ressurreição do Senhor',
    'easter.week1.0.b': 'Domingo de Páscoa na Ressurreição do Senhor',
    'easter.week1.0.c': 'Domingo de Páscoa na Ressurreição do Senhor',
    'ordinary.week34.0.a': 'Jesus Cristo, Rei do Universo',
    'ordinary.week34.0.b': 'Jesus Cristo, Rei do Universo',
    'ordinary.week34.0.c': 'Jesus Cristo, Rei do Universo',
  },
  type: {
    feast: 'Festa',
    solemnity: 'Solenidade',
    memorial: 'Memória',
  },
}

const baseKeys = [
  "holyFamily",
  "epiphany",
  "baptism",
  "mostHolyTrinity",
  "corpusChristi",
  "sacredHeartOfJesus",
  "immaculateHeartOfMary",
  "assumption",
  "1217",
  "1218",
  "1219",
  "1220",
  "1221",
  "1222",
  "1223",
  "1224.day",
  "1224.vigil",
  "1224.night",
  "1225.dawn",
  "1225.day",
  "1226",
  "1227",
  "1228",
  "1229",
  "1230",
  "1231",
  "0101",
  "0102",
  "0103",
  "0104",
  "0105",
  "0106",
  "0107",
  "christmas.week2.2",
  "christmas.week2.3",
  "christmas.week2.4",
  "christmas.week2.5",
  "christmas.week2.6",
  "christmas.week2.7",
  "christmas.week2.1",
  "advent.week1.1.a",
  "advent.week1.1.b",
  "advent.week1.1.c",
  "advent.week1.2",
  "advent.week1.3",
  "advent.week1.4",
  "advent.week1.5",
  "advent.week1.6",
  "advent.week1.7",
  "advent.week2.1.a",
  "advent.week2.1.b",
  "advent.week2.1.c",
  "advent.week2.2",
  "advent.week2.3",
  "advent.week2.4",
  "advent.week2.5",
  "advent.week2.6",
  "advent.week2.7",
  "advent.week3.1.a",
  "advent.week3.1.b",
  "advent.week3.1.c",
  "advent.week3.2",
  "advent.week3.3",
  "advent.week3.4",
  "advent.week3.5",
  "advent.week3.6",
  "lent.week0.4",
  "lent.week0.5",
  "lent.week0.6",
  "lent.week0.7",
  "lent.week1.1",
  "lent.week1.2",
  "lent.week1.3",
  "lent.week1.4",
  "lent.week1.5",
  "lent.week1.6",
  "lent.week1.7",
  "lent.week2.1",
  "lent.week2.2",
  "lent.week2.3",
  "lent.week2.4",
  "lent.week2.5",
  "lent.week2.6",
  "lent.week2.7",
  "lent.week3.1",
  "lent.week3.2",
  "lent.week3.3",
  "lent.week3.4",
  "lent.week3.5",
  "lent.week3.6",
  "lent.week3.7",
  "lent.week4.1",
  "lent.week4.2",
  "lent.week4.3",
  "lent.week4.4",
  "lent.week4.5",
  "lent.week4.6",
  "lent.week4.7",
  "lent.week5.1",
  "lent.week5.2",
  "lent.week5.3",
  "lent.week5.4",
  "lent.week5.5",
  "lent.week5.6",
  "lent.week5.7",
  "lent.week6.1",
  "lent.week6.2",
  "lent.week6.3",
  "lent.week6.4",
  "easter.week0.5.dawn",
  "easter.week0.5.day",
  "easter.week0.6",
  "easter.week0.7",
  "easter.week1.1.a",
  "easter.week1.1.b",
  "easter.week1.1.c",
  "easter.week1.2",
  "easter.week1.3",
  "easter.week1.4",
  "easter.week1.5",
  "easter.week1.6",
  "easter.week1.7",
  "easter.week2.1.a",
  "easter.week2.1.b",
  "easter.week2.1.c",
  "easter.week2.2",
  "easter.week2.3",
  "easter.week2.4",
  "easter.week2.5",
  "easter.week2.6",
  "easter.week2.7",
  "easter.week3.1.a",
  "easter.week3.1.b",
  "easter.week3.1.c",
  "easter.week3.2",
  "easter.week3.3",
  "easter.week3.4",
  "easter.week3.5",
  "easter.week3.6",
  "easter.week3.7",
  "easter.week4.1.a",
  "easter.week4.1.b",
  "easter.week4.1.c",
  "easter.week4.2",
  "easter.week4.3",
  "easter.week4.4",
  "easter.week4.5",
  "easter.week4.6",
  "easter.week4.7",
  "easter.week5.1.a",
  "easter.week5.1.b",
  "easter.week5.1.c",
  "easter.week5.2",
  "easter.week5.3",
  "easter.week5.4",
  "easter.week5.5",
  "easter.week5.6",
  "easter.week5.7",
  "easter.week6.1.a",
  "easter.week6.1.b",
  "easter.week6.1.c",
  "easter.week6.2",
  "easter.week6.3",
  "easter.week6.4",
  "easter.week6.5",
  "easter.week6.6",
  "easter.week6.7",
  "easter.week7.1.a",
  "easter.week7.1.b",
  "easter.week7.1.c",
  "easter.week7.2",
  "easter.week7.3",
  "easter.week7.4",
  "easter.week7.5",
  "easter.week7.6",
  "easter.week7.7",
  "easter.week7.7.vigil",
  "easter.week8.1",
  "ordinary.week1.2.even",
  "ordinary.week1.2.odd",
  "ordinary.week1.3.even",
  "ordinary.week1.3.odd",
  "ordinary.week1.4.even",
  "ordinary.week1.4.odd",
  "ordinary.week1.5.even",
  "ordinary.week1.5.odd",
  "ordinary.week1.6.even",
  "ordinary.week1.6.odd",
  "ordinary.week1.7.even",
  "ordinary.week1.7.odd",
  "ordinary.week2.1.a",
  "ordinary.week2.1.b",
  "ordinary.week2.1.c",
  "ordinary.week2.2.even",
  "ordinary.week2.2.odd",
  "ordinary.week2.3.even",
  "ordinary.week2.3.odd",
  "ordinary.week2.4.even",
  "ordinary.week2.4.odd",
  "ordinary.week2.5.even",
  "ordinary.week2.5.odd",
  "ordinary.week2.6.even",
  "ordinary.week2.6.odd",
  "ordinary.week2.7.even",
  "ordinary.week2.7.odd",
  "ordinary.week3.1.a",
  "ordinary.week3.1.b",
  "ordinary.week3.1.c",
  "ordinary.week3.2.even",
  "ordinary.week3.2.odd",
  "ordinary.week3.3.even",
  "ordinary.week3.3.odd",
  "ordinary.week3.4.even",
  "ordinary.week3.4.odd",
  "ordinary.week3.5.even",
  "ordinary.week3.5.odd",
  "ordinary.week3.6.even",
  "ordinary.week3.6.odd",
  "ordinary.week3.7.even",
  "ordinary.week3.7.odd",
  "ordinary.week4.1.a",
  "ordinary.week4.1.b",
  "ordinary.week4.1.c",
  "ordinary.week4.2.even",
  "ordinary.week4.2.odd",
  "ordinary.week4.3.even",
  "ordinary.week4.3.odd",
  "ordinary.week4.4.even",
  "ordinary.week4.4.odd",
  "ordinary.week4.5.even",
  "ordinary.week4.5.odd",
  "ordinary.week4.6.even",
  "ordinary.week4.6.odd",
  "ordinary.week4.7.even",
  "ordinary.week4.7.odd",
  "ordinary.week5.1.a",
  "ordinary.week5.1.b",
  "ordinary.week5.1.c",
  "ordinary.week5.2.even",
  "ordinary.week5.2.odd",
  "ordinary.week5.3.even",
  "ordinary.week5.3.odd",
  "ordinary.week5.4.even",
  "ordinary.week5.4.odd",
  "ordinary.week5.5.even",
  "ordinary.week5.5.odd",
  "ordinary.week5.6.even",
  "ordinary.week5.6.odd",
  "ordinary.week5.7.even",
  "ordinary.week5.7.odd",
  "ordinary.week6.1.a",
  "ordinary.week6.1.b",
  "ordinary.week6.1.c",
  "ordinary.week6.2.even",
  "ordinary.week6.2.odd",
  "ordinary.week6.3.even",
  "ordinary.week6.3.odd",
  "ordinary.week6.4.even",
  "ordinary.week6.4.odd",
  "ordinary.week6.5.even",
  "ordinary.week6.5.odd",
  "ordinary.week6.6.even",
  "ordinary.week6.6.odd",
  "ordinary.week6.7.even",
  "ordinary.week6.7.odd",
  "ordinary.week7.1.a",
  "ordinary.week7.1.b",
  "ordinary.week7.1.c",
  "ordinary.week7.2.even",
  "ordinary.week7.2.odd",
  "ordinary.week7.3.even",
  "ordinary.week7.3.odd",
  "ordinary.week7.4.even",
  "ordinary.week7.4.odd",
  "ordinary.week7.5.even",
  "ordinary.week7.5.odd",
  "ordinary.week7.6.even",
  "ordinary.week7.6.odd",
  "ordinary.week7.7.even",
  "ordinary.week7.7.odd",
  "ordinary.week8.1.a",
  "ordinary.week8.1.b",
  "ordinary.week8.1.c",
  "ordinary.week8.2.even",
  "ordinary.week8.2.odd",
  "ordinary.week8.3.even",
  "ordinary.week8.3.odd",
  "ordinary.week8.4.even",
  "ordinary.week8.4.odd",
  "ordinary.week8.5.even",
  "ordinary.week8.5.odd",
  "ordinary.week8.6.even",
  "ordinary.week8.6.odd",
  "ordinary.week8.7.even",
  "ordinary.week8.7.odd",
  "ordinary.week9.1.a",
  "ordinary.week9.1.b",
  "ordinary.week9.1.c",
  "ordinary.week9.2.even",
  "ordinary.week9.2.odd",
  "ordinary.week9.3.even",
  "ordinary.week9.3.odd",
  "ordinary.week9.4.even",
  "ordinary.week9.4.odd",
  "ordinary.week9.5.even",
  "ordinary.week9.5.odd",
  "ordinary.week9.6.even",
  "ordinary.week9.6.odd",
  "ordinary.week9.7.even",
  "ordinary.week9.7.odd",
  "ordinary.week10.1.a",
  "ordinary.week10.1.b",
  "ordinary.week10.1.c",
  "ordinary.week10.2.even",
  "ordinary.week10.2.odd",
  "ordinary.week10.3.even",
  "ordinary.week10.3.odd",
  "ordinary.week10.4.even",
  "ordinary.week10.4.odd",
  "ordinary.week10.5.even",
  "ordinary.week10.5.odd",
  "ordinary.week10.6.even",
  "ordinary.week10.6.odd",
  "ordinary.week10.7.even",
  "ordinary.week10.7.odd",
  "ordinary.week11.1.a",
  "ordinary.week11.1.b",
  "ordinary.week11.1.c",
  "ordinary.week11.2.even",
  "ordinary.week11.2.odd",
  "ordinary.week11.3.even",
  "ordinary.week11.3.odd",
  "ordinary.week11.4.even",
  "ordinary.week11.4.odd",
  "ordinary.week11.5.even",
  "ordinary.week11.5.odd",
  "ordinary.week11.6.even",
  "ordinary.week11.6.odd",
  "ordinary.week11.7.even",
  "ordinary.week11.7.odd",
  "ordinary.week12.1.a",
  "ordinary.week12.1.b",
  "ordinary.week12.1.c",
  "ordinary.week12.2.even",
  "ordinary.week12.2.odd",
  "ordinary.week12.3.even",
  "ordinary.week12.3.odd",
  "ordinary.week12.4.even",
  "ordinary.week12.4.odd",
  "ordinary.week12.5.even",
  "ordinary.week12.5.odd",
  "ordinary.week12.6.even",
  "ordinary.week12.6.odd",
  "ordinary.week12.7.even",
  "ordinary.week12.7.odd",
  "ordinary.week13.1.a",
  "ordinary.week13.1.b",
  "ordinary.week13.1.c",
  "ordinary.week13.2.even",
  "ordinary.week13.2.odd",
  "ordinary.week13.3.even",
  "ordinary.week13.3.odd",
  "ordinary.week13.4.even",
  "ordinary.week13.4.odd",
  "ordinary.week13.5.even",
  "ordinary.week13.5.odd",
  "ordinary.week13.6.even",
  "ordinary.week13.6.odd",
  "ordinary.week13.7.even",
  "ordinary.week13.7.odd",
  "ordinary.week14.1.a",
  "ordinary.week14.1.b",
  "ordinary.week14.1.c",
  "ordinary.week14.2.even",
  "ordinary.week14.2.odd",
  "ordinary.week14.3.even",
  "ordinary.week14.3.odd",
  "ordinary.week14.4.even",
  "ordinary.week14.4.odd",
  "ordinary.week14.5.even",
  "ordinary.week14.5.odd",
  "ordinary.week14.6.even",
  "ordinary.week14.6.odd",
  "ordinary.week14.7.even",
  "ordinary.week14.7.odd",
  "ordinary.week15.1.a",
  "ordinary.week15.1.b",
  "ordinary.week15.1.c",
  "ordinary.week15.2.even",
  "ordinary.week15.2.odd",
  "ordinary.week15.3.even",
  "ordinary.week15.3.odd",
  "ordinary.week15.4.even",
  "ordinary.week15.4.odd",
  "ordinary.week15.5.even",
  "ordinary.week15.5.odd",
  "ordinary.week15.6.even",
  "ordinary.week15.6.odd",
  "ordinary.week15.7.even",
  "ordinary.week15.7.odd",
  "ordinary.week16.1.a",
  "ordinary.week16.1.b",
  "ordinary.week16.1.c",
  "ordinary.week16.2.even",
  "ordinary.week16.2.odd",
  "ordinary.week16.3.even",
  "ordinary.week16.3.odd",
  "ordinary.week16.4.even",
  "ordinary.week16.4.odd",
  "ordinary.week16.5.even",
  "ordinary.week16.5.odd",
  "ordinary.week16.6.even",
  "ordinary.week16.6.odd",
  "ordinary.week16.7.even",
  "ordinary.week16.7.odd",
  "ordinary.week17.1.a",
  "ordinary.week17.1.b",
  "ordinary.week17.1.c",
  "ordinary.week17.2.even",
  "ordinary.week17.2.odd",
  "ordinary.week17.3.even",
  "ordinary.week17.3.odd",
  "ordinary.week17.4.even",
  "ordinary.week17.4.odd",
  "ordinary.week17.5.even",
  "ordinary.week17.5.odd",
  "ordinary.week17.6.even",
  "ordinary.week17.6.odd",
  "ordinary.week17.7.even",
  "ordinary.week17.7.odd",
  "ordinary.week18.1.a",
  "ordinary.week18.1.b",
  "ordinary.week18.1.c",
  "ordinary.week18.2.even",
  "ordinary.week18.2.odd",
  "ordinary.week18.3.even",
  "ordinary.week18.3.odd",
  "ordinary.week18.4.even",
  "ordinary.week18.4.odd",
  "ordinary.week18.5.even",
  "ordinary.week18.5.odd",
  "ordinary.week18.6.even",
  "ordinary.week18.6.odd",
  "ordinary.week18.7.even",
  "ordinary.week18.7.odd",
  "ordinary.week19.1.a",
  "ordinary.week19.1.b",
  "ordinary.week19.1.c",
  "ordinary.week19.2.even",
  "ordinary.week19.2.odd",
  "ordinary.week19.3.even",
  "ordinary.week19.3.odd",
  "ordinary.week19.4.even",
  "ordinary.week19.4.odd",
  "ordinary.week19.5.even",
  "ordinary.week19.5.odd",
  "ordinary.week19.6.even",
  "ordinary.week19.6.odd",
  "ordinary.week19.7.even",
  "ordinary.week19.7.odd",
  "ordinary.week20.1.a",
  "ordinary.week20.1.b",
  "ordinary.week20.1.c",
  "ordinary.week20.2.even",
  "ordinary.week20.2.odd",
  "ordinary.week20.3.even",
  "ordinary.week20.3.odd",
  "ordinary.week20.4.even",
  "ordinary.week20.4.odd",
  "ordinary.week20.5.even",
  "ordinary.week20.5.odd",
  "ordinary.week20.6.even",
  "ordinary.week20.6.odd",
  "ordinary.week20.7.even",
  "ordinary.week20.7.odd",
  "ordinary.week21.1.a",
  "ordinary.week21.1.b",
  "ordinary.week21.1.c",
  "ordinary.week21.2.even",
  "ordinary.week21.2.odd",
  "ordinary.week21.3.even",
  "ordinary.week21.3.odd",
  "ordinary.week21.4.even",
  "ordinary.week21.4.odd",
  "ordinary.week21.5.even",
  "ordinary.week21.5.odd",
  "ordinary.week21.6.even",
  "ordinary.week21.6.odd",
  "ordinary.week21.7.even",
  "ordinary.week21.7.odd",
  "ordinary.week22.1.a",
  "ordinary.week22.1.b",
  "ordinary.week22.1.c",
  "ordinary.week22.2.even",
  "ordinary.week22.2.odd",
  "ordinary.week22.3.even",
  "ordinary.week22.3.odd",
  "ordinary.week22.4.even",
  "ordinary.week22.4.odd",
  "ordinary.week22.5.even",
  "ordinary.week22.5.odd",
  "ordinary.week22.6.even",
  "ordinary.week22.6.odd",
  "ordinary.week22.7.even",
  "ordinary.week22.7.odd",
  "ordinary.week23.1.a",
  "ordinary.week23.1.b",
  "ordinary.week23.1.c",
  "ordinary.week23.2.even",
  "ordinary.week23.2.odd",
  "ordinary.week23.3.even",
  "ordinary.week23.3.odd",
  "ordinary.week23.4.even",
  "ordinary.week23.4.odd",
  "ordinary.week23.5.even",
  "ordinary.week23.5.odd",
  "ordinary.week23.6.even",
  "ordinary.week23.6.odd",
  "ordinary.week23.7.even",
  "ordinary.week23.7.odd",
  "ordinary.week24.1.a",
  "ordinary.week24.1.b",
  "ordinary.week24.1.c",
  "ordinary.week24.2.even",
  "ordinary.week24.2.odd",
  "ordinary.week24.3.even",
  "ordinary.week24.3.odd",
  "ordinary.week24.4.even",
  "ordinary.week24.4.odd",
  "ordinary.week24.5.even",
  "ordinary.week24.5.odd",
  "ordinary.week24.6.even",
  "ordinary.week24.6.odd",
  "ordinary.week24.7.even",
  "ordinary.week24.7.odd",
  "ordinary.week25.1.a",
  "ordinary.week25.1.b",
  "ordinary.week25.1.c",
  "ordinary.week25.2.even",
  "ordinary.week25.2.odd",
  "ordinary.week25.3.even",
  "ordinary.week25.3.odd",
  "ordinary.week25.4.even",
  "ordinary.week25.4.odd",
  "ordinary.week25.5.even",
  "ordinary.week25.5.odd",
  "ordinary.week25.6.even",
  "ordinary.week25.6.odd",
  "ordinary.week25.7.even",
  "ordinary.week25.7.odd",
  "ordinary.week26.1.a",
  "ordinary.week26.1.b",
  "ordinary.week26.1.c",
  "ordinary.week26.2.even",
  "ordinary.week26.2.odd",
  "ordinary.week26.3.even",
  "ordinary.week26.3.odd",
  "ordinary.week26.4.even",
  "ordinary.week26.4.odd",
  "ordinary.week26.5.even",
  "ordinary.week26.5.odd",
  "ordinary.week26.6.even",
  "ordinary.week26.6.odd",
  "ordinary.week26.7.even",
  "ordinary.week26.7.odd",
  "ordinary.week27.1.a",
  "ordinary.week27.1.b",
  "ordinary.week27.1.c",
  "ordinary.week27.2.even",
  "ordinary.week27.2.odd",
  "ordinary.week27.3.even",
  "ordinary.week27.3.odd",
  "ordinary.week27.4.even",
  "ordinary.week27.4.odd",
  "ordinary.week27.5.even",
  "ordinary.week27.5.odd",
  "ordinary.week27.6.even",
  "ordinary.week27.6.odd",
  "ordinary.week27.7.even",
  "ordinary.week27.7.odd",
  "ordinary.week28.1.a",
  "ordinary.week28.1.b",
  "ordinary.week28.1.c",
  "ordinary.week28.2.even",
  "ordinary.week28.2.odd",
  "ordinary.week28.3.even",
  "ordinary.week28.3.odd",
  "ordinary.week28.4.even",
  "ordinary.week28.4.odd",
  "ordinary.week28.5.even",
  "ordinary.week28.5.odd",
  "ordinary.week28.6.even",
  "ordinary.week28.6.odd",
  "ordinary.week28.7.even",
  "ordinary.week28.7.odd",
  "ordinary.week29.1.a",
  "ordinary.week29.1.b",
  "ordinary.week29.1.c",
  "ordinary.week29.2.even",
  "ordinary.week29.2.odd",
  "ordinary.week29.3.even",
  "ordinary.week29.3.odd",
  "ordinary.week29.4.even",
  "ordinary.week29.4.odd",
  "ordinary.week29.5.even",
  "ordinary.week29.5.odd",
  "ordinary.week29.6.even",
  "ordinary.week29.6.odd",
  "ordinary.week29.7.even",
  "ordinary.week29.7.odd",
  "ordinary.week30.1.a",
  "ordinary.week30.1.b",
  "ordinary.week30.1.c",
  "ordinary.week30.2.even",
  "ordinary.week30.2.odd",
  "ordinary.week30.3.even",
  "ordinary.week30.3.odd",
  "ordinary.week30.4.even",
  "ordinary.week30.4.odd",
  "ordinary.week30.5.even",
  "ordinary.week30.5.odd",
  "ordinary.week30.6.even",
  "ordinary.week30.6.odd",
  "ordinary.week30.7.even",
  "ordinary.week30.7.odd",
  "ordinary.week31.1.a",
  "ordinary.week31.1.b",
  "ordinary.week31.1.c",
  "ordinary.week31.2.even",
  "ordinary.week31.2.odd",
  "ordinary.week31.3.even",
  "ordinary.week31.3.odd",
  "ordinary.week31.4.even",
  "ordinary.week31.4.odd",
  "ordinary.week31.5.even",
  "ordinary.week31.5.odd",
  "ordinary.week31.6.even",
  "ordinary.week31.6.odd",
  "ordinary.week31.7.even",
  "ordinary.week31.7.odd",
  "ordinary.week32.1.a",
  "ordinary.week32.1.b",
  "ordinary.week32.1.c",
  "ordinary.week32.2.even",
  "ordinary.week32.2.odd",
  "ordinary.week32.3.even",
  "ordinary.week32.3.odd",
  "ordinary.week32.4.even",
  "ordinary.week32.4.odd",
  "ordinary.week32.5.even",
  "ordinary.week32.5.odd",
  "ordinary.week32.6.even",
  "ordinary.week32.6.odd",
  "ordinary.week32.7.even",
  "ordinary.week32.7.odd",
  "ordinary.week33.1.a",
  "ordinary.week33.1.b",
  "ordinary.week33.1.c",
  "ordinary.week33.2.even",
  "ordinary.week33.2.odd",
  "ordinary.week33.3.even",
  "ordinary.week33.3.odd",
  "ordinary.week33.4.even",
  "ordinary.week33.4.odd",
  "ordinary.week33.5.even",
  "ordinary.week33.5.odd",
  "ordinary.week33.6.even",
  "ordinary.week33.6.odd",
  "ordinary.week33.7.even",
  "ordinary.week33.7.odd",
  "ordinary.week34.1.a",
  "ordinary.week34.1.b",
  "ordinary.week34.1.c",
  "ordinary.week34.2.even",
  "ordinary.week34.2.odd",
  "ordinary.week34.3.even",
  "ordinary.week34.3.odd",
  "ordinary.week34.4.even",
  "ordinary.week34.4.odd",
  "ordinary.week34.5.even",
  "ordinary.week34.5.odd",
  "ordinary.week34.6.even",
  "ordinary.week34.6.odd",
  "ordinary.week34.7.odd",
  "ordinary.week34.7.even"
]

generate()

async function generate() {
  const result = {}
  baseKeys.forEach((key) => {
    const model = baseModel(key)
    result[key] = model
  })
  //write file
  await writeFile ('pt_BR.json', JSON.stringify(result, null, 2))
}

function baseModel(key) {
  return {
    title: whichTitle(key),
    subtitle: whichSubtitle(key),
    color: whichColor(key),
    readings: [
      {
        type: 'reading',
        ref: '',
        text: '',
      },
      {
        type: 'psalm',
        ref: '',
        text: '',
      },
      {
        type: 'gospel',
        ref: '',
        text: '',
      }
    ],
  }
}

function whichTitle(key) {
  if (key in strings.reference) {
    return strings.reference[key]
  }

  const match = key.match(/^([a-z]+\.week(\d+))\.(\d)/)
  if (match) {
    const day = strings.day[match[3]]

    if (/^(lent\.week0|lent\.week6\.[1-3]|easter\.week0)/.test(key)) {
      return day
    } else {
      const week = match[2]

      return `${day} da ${week}ª Semana`
    }
  }

  return ''
}

function whichSubtitle(key) {
  if ([
      'epiphany',
      '0101',
      'easter.week7.6.vigil',
      'easter.week8.0',
      '1224.vigil',
      '1224.night',
      '1225.dawn',
      '1225.day',
      'easter.week1.0.a',
      'easter.week1.0.b',
      'easter.week1.0.c',
      'mostHolyTrinity',
      'corpusChristi',
      'sacredHeartOfJesus',
      'assumption',
      'ordinary.week34.0.a',
      'ordinary.week34.0.b',
      'ordinary.week34.0.c',
    ].includes(key)
  ) {
    return strings.type.solemnity
  }

  if ([
      'holyFamily',
      'baptism',
      '1226',
      '1227',
      '1228',
    ].includes(key)
  ) {
    return strings.type.feast
  }

  if ([
      'immaculateHeartOfMary',
    ].includes(key)
  ) {
    return strings.type.memorial
  }

  if (/^lent\.week6\.[1-3]|easter\.week0\.4\.dawn/.test(key)) {
    return strings.special.holyWeek
  }

  if (/^easter\.week0\.4\.day|easter\.week0\.[5-6]/.test(key)) {
    return strings.special.easterTriduum
  }

  if (/^easter\.week(1\.[1-6]|2\.0)/.test(key)) {
    return strings.special.easterOctave
  }

  if (/^12(29|30|31)$/.test(key)) {
    return strings.special.christmasOctave
  }

  if (/^010[2-7]$/.test(key)) {
    return strings.special.beforeEpiphany
  }

  if (/^christmas\.week2\.[1-6]$/.test(key)) {
    return strings.special.afterEpiphany
  }

  if (/^lent\.week0\.3$/.test(key)) {
    return strings.special.lentBeginning
  }

  if (/^lent\.week0\.[4-6]$/.test(key)) {
    return strings.special.afterAshes
  }

  if (/^12(1[7-9]|2[0-4])(\.day)?$/.test(key)) {
    return strings.time.advent
  }

  const match = key.match(/^([a-z]+)\.week\d+\.\d/)
  if (match) {
    return strings.time[match[1]]
  }
}

function whichColor(key) {
  if ([
    'easter.week0.5',
    'easter.week7.6.vigil',
    'easter.week8.0',
    '1226',
    '1228',
    'lent.week6.0',
  ].includes(key)) {
    return 'red'
  }

  if (
    /^christmas\.|1224\.(vigil|night)|12(25|29|30|31)|010[2-7]|easter\./.test(key) ||
    [
      'holyFamily',
      'epiphany',
      'baptism',
      '0101',
      '1227',
      'ordinary\.week34.0.a',
      'ordinary\.week34.0.b',
      'ordinary\.week34.0.c',
      'mostHolyTrinity',
      'corpusChristi',
      'sacredHeartOfJesus',
      'immaculateHeartOfMary',
      'assumption',
    ].includes(key)
  ) {
    return 'white'
  }

  if (/^advent|lent|12(1[7-9]|2[0-4])/.test(key)) {
    if (/^(advent_3_0|lent_4_0)/.test(key)) {
      return 'pink'
    }

    return 'purple'
  }

  if (/^(ordinary).*/.test(key)) {
    return 'green'
  }
}
