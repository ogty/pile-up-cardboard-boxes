const fontSize = 36;
const xStep = 19;
const yStep = 19;
const xzStep = 15.4;
const yzStep = 10.4;
const zzStep = 9;
const paddingX = 30;
const heightAdjuster = xzStep - yzStep;

const boxPileUpper = (x: number, y: number, quantity: number) => {
    const boxPileUpper: string[] = [];
    for (let i = quantity; i > 0; i -= 1) {
        boxPileUpper.push(`<text x="${x}" y="${i * xStep + y}" font-size="${fontSize}">📦</text>`);
    }
    return `<g>${boxPileUpper.join('')}</g>`;
}

function createCardboardBoxesArray(n: number): number[][] {
    const cardboardBoxesArray: number[][] = [];
    for (let i = n; i > 0; i -= 1) {
        const row: number[] = [];
        for (let j = i; j > 0; j -= 1) {
            row.push(j);
        }
        cardboardBoxesArray.push(row);
    }
    return cardboardBoxesArray;
}

const cardboardBoxesSvg: string[] = [];
const cardboardBoxes = createCardboardBoxesArray(7);

const fulcrumSize = cardboardBoxes[0][0];
const max = cardboardBoxes.reduce((acc, cur) => Math.max(acc, Math.max(...cur)), 0);
const yAxis = heightAdjuster * max;

let firstLevelCount = 0;
cardboardBoxes.map((row: number[]) => {
    let secondLevelCount = 0;
    row.map((cardboardBox: number) => {
        const x =
            paddingX +
            (cardboardBoxes.length - 1) * xStep +
            secondLevelCount * xzStep -
            firstLevelCount * xStep;
        let y = yAxis + firstLevelCount * zzStep + yStep + (fulcrumSize - cardboardBox) * yStep;
        if (secondLevelCount) {
            y += secondLevelCount * yzStep;
        }
        cardboardBoxesSvg.push(boxPileUpper(x, y, cardboardBox));
        secondLevelCount += 1;
    })
    firstLevelCount += 1;
})

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    <g>${cardboardBoxesSvg.join('')}</g>
</svg>`;
console.log(svg);
