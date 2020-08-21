
const CODE = {
    A: 65,
    Z: 90
}

function createColl(content) {
    return `<div class="column">
                ${content}
                <div class="col-resize" data-resize="col"></div>
           </div>`
}

function createCell() {
    return `<div class="cell" contenteditable></div>`
}


function createRow(content, index) {
    const resize = index ?
        '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content ? content : ''}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODE.A + index)
}

export function createTable(rowsCount = 15) {
    const rows = []
    const colsCount = CODE.Z - CODE.A + 1
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColl)
        .join('')
    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount).fill(createCell()).join('')
        rows.push(createRow(cells, i + 1))
    }


    return rows.join('')
}
