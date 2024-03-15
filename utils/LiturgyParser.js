const input = `
`;

function parseLiturgy(input) {
  const lines = input
    .split("\n")
    .filter((line) => line.trim().length > 0 && !/(^\d+\w?$|^\w$)/.test(line))
    .map((line) => line.trim().replace(/ ?(\*|\†)$/, ""));
  var readingRef1 = lines.shift();
  var psalmRef = lines.shift();
  var readingRef2 = lines.shift();
  var gospelRef = lines.shift();
  
  if (gospelRef.length === 0 || /^primeira leitura/i.test(gospelRef)) {
    if (/^primeira leitura/i.test(gospelRef)) {
      lines.unshift(gospelRef);
    }
    gospelRef = readingRef2;
    readingRef2 = "";
  }
  
  const reading1 = [];
  const psalm = [];
  const reading2 = [];
  const gospel = [];
  
  skipUntil(lines, /^primeira leitura/i);
  skipUntil(lines, /^(leitura d|início d)/i);
  
  let line = lines.shift();
  reading1.push(line.slice(0, line.search(/\d/)));
  reading1.push(...readUntil(lines, /^salmo responsorial/i));
  skipUntil(lines, /^R\./i);
  psalm.push(...readUntil(lines, /^(segunda leitura|aclamação ao evangelho)/i));
  if (/^segunda leitura/i.test(lines[0])) {
    skipUntil(lines, /^leitura d/i);
    line = lines.shift();
    reading2.push(line.slice(0, line.search(/\d/)));
    reading2.push(...readUntil(lines, /^aclamação ao evangelho/i));
  }
  skipUntil(lines, /^proclamação do evangelho/i);
  line = lines.shift();
  gospel.push(line.slice(0, line.search(/\d/)));
  gospel.push(...lines);

  reading1.splice(1, 0, "");
  reading1.splice(reading1.length - 1, 0, "");
  {
    let i = 3;
    while (i < reading1.length - 2) {
      if (!/(\.|\"|\!|\?)$/.test(reading1[i])) {
        reading1[i] += " " + reading1[i + 1];
        reading1.splice(i + 1, 1);
      } else {
        i++;
      }
    }
  }
  psalm.splice(1, 0, "");
  for (let i = 0; i < psalm.length; i++) {
    if (/.+R\.$/.test(psalm[i]) && i < psalm.length - 1) {
      psalm.splice(i + 1, 0, "");
    }
  }
  if (readingRef2.length > 0) {
    reading2.splice(1, 0, "");
    reading2.splice(reading2.length - 1, 0, "");
    {
      let i = 3;
      while (i < reading2.length - 2) {
        if (!/(\.|\"|\!|\?)$/.test(reading2[i])) {
          reading2[i] += " " + reading2[i + 1];
          reading2.splice(i + 1, 1);
        } else {
          i++;
        }
      }
    }
  }
  gospel.splice(1, 0, "");
  gospel.splice(gospel.length - 1, 0, "");
  {
    let i = 3;
    while (i < gospel.length - 2) {
      if (!/(\.|\"|\!|\?)$/.test(gospel[i])) {
        gospel[i] += " " + gospel[i + 1];
        gospel.splice(i + 1, 1);
      } else {
        i++;
      }
    }
  }

  if (readingRef2.length === 0) {
    return `    - type: reading
      ref: ${readingRef1}
      text: |
        ${reading1.join("\n        ")}
    - type: psalm
      ref: ${psalmRef}
      text: |
        ${psalm.join("\n        ")}
    - type: gospel
      ref: ${gospelRef}
      text: |
        ${gospel.join("\n        ")}
`;
  }
  return `    - type: reading
      ref: ${readingRef1}
      text: |
        ${reading1.join("\n        ")}
    - type: psalm
      ref: ${psalmRef}
      text: |
        ${psalm.join("\n        ")}
    - type: reading
      ref: ${readingRef2}
      text: |
        ${reading2.join("\n        ")}
    - type: gospel
      ref: ${gospelRef}
      text: |
        ${gospel.join("\n        ")}
`;
}

function skipUntil(lines, regex) {
  while (lines.length > 0 && !regex.test(lines[0])) {
    lines.shift();
  }
}
function readUntil(lines, regex) {
  const result = [];
  while (lines.length > 0 && !regex.test(lines[0])) {
    result.push(lines.shift());
  }
  return result;
}

console.log(parseLiturgy(input));
