
const CODE = {
    A: 65,
    Z: 90
}

function createColl(content, index) {
    return `<div class="column" data-type="resizable" data-col-index="${index}">
                ${content}
                <div class="col-resize" data-resize="col"></div>
           </div>`
}


function createCell(rowId) {
    return (_, index) => {
        return `<div
                    class="cell" 
                    contenteditable
                    data-cell-index="${index}"
                    data-type="cell"
                    data-id="${rowId}:${index}"
               ></div>`
    }
}


function createRow(content, index) {
    const resize = index ?
        '<div class="row-resize" data-resize="row" ></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info" data-row-index="${index}" >
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data" data-row-data-index="${index}">${content ? content : ''}</div>
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
        const cells = new Array(colsCount).fill(null).map(createCell(i)).join('')
        rows.push(createRow(cells, i + 1))
    }


    return rows.join('')
}
