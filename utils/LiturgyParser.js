const input = `
1Rs 8,1-7.9-13
Sl 131(132),6-7.8-10 (R. 8a)
Mc 6,53-56
PRIMEIRA LEITURA
Conduziram a arca da aliança ao Santo dos Santos
e uma nuvem encheu o templo do Senhor.

Leitura do Primeiro Livro dos Reis 8,1-7.9-13

Naqueles dias,
1
Salomão convocou, junto de si em Jerusalém,
todos os anciãos de Israel,
todos os chefes das tribos
e príncipes das famílias dos filhos de Israel,
a fim de transferir da cidade de Sião, 
que é Jerusalém,
a arca da aliança do Senhor.
2
Todo o Israel reuniu-se em torno de Salomão,
no mês de Etanim,
ou seja, no sétimo mês, durante a festa.
3
Vieram todos os anciãos de Israel,
e os sacerdotes tomaram a arca
4
e carregaram-na junto com a tenda da reunião,
como também todos os objetos sagrados 
que nela estavam;
quem os carregava eram os sacerdotes e os levitas.
5
O rei Salomão e toda a comunidade de Israel,
reunida em torno dele,
imolavam diante da arca ovelhas e bois em tal quantidade,
que não se podia contar nem calcular.
6
E os sacerdotes conduziram
a arca da aliança do Senhor ao seu lugar,
no santuário do templo, ao Santo dos Santos,
debaixo das asas dos querubins,
7
pois os querubins estendiam suas asas
sobre o lugar da arca,
cobrindo a arca e seus varais por cima.
9
Dentro da arca só havia as duas tábuas de pedra,
que Moisés ali tinha deposto no monte Horeb,
quando o Senhor concluiu a aliança
com os filhos de Israel,
logo que saíram da terra do Egito.
10
Ora, quando os sacerdotes deixaram o santuário,
uma nuvem encheu o templo do Senhor,
11
de modo que os sacerdotes
não puderam continuar as funções 
porque a glória do Senhor
tinha enchido o templo do Senhor.
12
Então Salomão disse:
"O Senhor disse que habitaria numa nuvem,
13
e eu edifiquei uma casa para tua morada,
um templo onde vivas para sempre".
Palavra do Senhor.

Salmo responsorial  Sl 131(132),6-7.8-10 (R. 8a)
R. Subi, Senhor, para o lugar de vosso pouso!

6
Nós soubemos que a arca estava em Éfrata *
e nos campos de Iaar a encontramos:
7
Entremos no lugar em que ele habita, *
ante o escabelo de seus pés o adoremos! R.

8
Subi, Senhor, para o lugar de vosso pouso, *
subi vós, com vossa arca poderosa!
9
Que se vistam de alegria os vossos santos, *
e os vossos sacerdotes, de justiça!
10
Por causa de Davi, o vosso servo, *
não afasteis do vosso Ungido a vossa face! R.

Aclamação ao Evangelho  Cf. Mt 4,23
R. Aleluia, Aleluia, Aleluia.
V. Jesus pregava a Boa-nova, o Reino anunciando, 
    e curava toda espécie de doenças entre o povo.

EVANGELHO
E todos quantos o tocavam ficavam curados.

Proclamação do Evangelho de Jesus Cristo segundo Marcos 6,53-56


Naquele tempo,
53
tendo Jesus e seus discípulos
acabado de atravessar o mar da Galileia,
chegaram a Genesaré e amarraram a barca.
54
Logo que desceram da barca,
as pessoas imediatamente reconheceram Jesus.
55
Percorrendo toda aquela região,
levavam os doentes deitados em suas camas
para o lugar onde ouviam falar que Jesus estava.
56
E, nos povoados, cidades e campos onde chegavam,
colocavam os doentes nas praças
e pediam-lhe para tocar, 
ao menos, a barra de sua veste.
E todos quantos o tocavam ficavam curados.
Palavra da Salvação.
`

/**
 * @param {string} input 
 */
function parseLiturgy(input) {
  const lines = input.split('\n')
                      .filter(line => line.trim().length > 0 && !/(^\d+\w?$|^\w$)/.test(line))
                      .map(line => line.trim().replace(/ ?(\*|\†)$/, ''))
  var readingRef1 = lines.shift()
  var psalmRef = lines.shift()
  var readingRef2 = lines.shift()
  var gospelRef = lines.shift()
  if (gospelRef.length === 0 || /^primeira leitura/i.test(gospelRef)) {
    if(/^primeira leitura/i.test(gospelRef)) {
      lines.unshift(gospelRef)
    }
    gospelRef = readingRef2
    readingRef2 = ''
  }

  const reading1 = []
  const psalm = []
  const reading2 = []
  const gospel = []

  skipUntil(lines, /^primeira leitura/i)
  skipUntil(lines, /^(leitura d|início d)/i)
  
  let line = lines.shift()
  reading1.push(line.slice(0, line.search(/\d/)))
  reading1.push(...readUntil(lines, /^salmo responsorial/i))
  skipUntil(lines, /^R\./i)
  psalm.push(...readUntil(lines, /^(segunda leitura|aclamação ao evangelho)/i))
  if(/^segunda leitura/i.test(lines[0])) {
    skipUntil(lines, /^leitura d/i)
    line = lines.shift()
    reading2.push(line.slice(0, line.search(/\d/)))
    reading2.push(...readUntil(lines, /^aclamação ao evangelho/i))
  }
  skipUntil(lines, /^proclamação do evangelho/i)
  line = lines.shift()
  gospel.push(line.slice(0, line.search(/\d/)))
  gospel.push(...lines)



  reading1.splice(1, 0, '')
  reading1.splice(reading1.length - 1, 0, '')
  {let i = 3
    while (i < reading1.length - 2) {
      if (!/(\.|\"|\!|\?)$/.test(reading1[i])) {
        reading1[i] += ' ' + reading1[i+1]
        reading1.splice(i+1, 1)
      } else {
        i++
      }
    }
  }
  psalm.splice(1, 0, '')
  for (let i = 0; i < psalm.length; i++) {
    if (/.+R\.$/.test(psalm[i]) && i < psalm.length - 1) {
      psalm.splice(i+1, 0, '')
    }
  }
  if (readingRef2.length > 0) {
    reading2.splice(1, 0, '')
    reading2.splice(reading2.length - 1, 0, '')
    {let i = 3
      while (i < reading2.length - 2) {
        if (!/(\.|\;|\!|\?)$/.test(reading2[i])) {
          reading2[i] += ' ' + reading2[i+1]
          reading2.splice(i+1, 1)
        } else {
          i++
        }
      }
    }
  }
  gospel.splice(1, 0, '')
  gospel.splice(gospel.length - 1, 0, '')
  {let i = 3
    while (i < gospel.length - 2) {
      if (!/(\.|\;)$/.test(gospel[i])) {
        gospel[i] += ' ' + gospel[i+1]
        gospel.splice(i+1, 1)
      } else {
        i++
      }
    }
  }

  if (readingRef2.length === 0) {
    return `    - type: reading
      ref: ${readingRef1}
      text: |
        ${reading1.join('\n        ')}
    - type: psalm
      ref: ${psalmRef}
      text: |
        ${psalm.join('\n        ')}
    - type: gospel
      ref: ${gospelRef}
      text: |
        ${gospel.join('\n        ')}
`
  }
  return `    - type: reading
      ref: ${readingRef1}
      text: |
        ${reading1.join('\n        ')}
    - type: psalm
      ref: ${psalmRef}
      text: |
        ${psalm.join('\n        ')}
    - type: reading
      ref: ${readingRef2}
      text: |
        ${reading2.join('\n        ')}
    - type: gospel
      ref: ${gospelRef}
      text: |
        ${gospel.join('\n        ')}
`
}

function skipUntil(lines, regex) {
  while (lines.length > 0 && !regex.test(lines[0])) {
    lines.shift()
  }
}
function readUntil(lines, regex) {
  const result = []
  while (lines.length > 0 && !regex.test(lines[0])) {
    result.push(lines.shift())
  }
  return result
}

console.log(parseLiturgy(input))
