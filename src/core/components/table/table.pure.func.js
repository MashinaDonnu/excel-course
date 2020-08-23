export function highlight(start, end, idRow, currIdRow) {
    const data = {rows: [], cells: []}
    const minCell = Math.min(+start, +end)
    const maxCell = Math.max(+start, +end)

    const minRow = Math.min(+idRow, +currIdRow)
    const maxRow = Math.max(+idRow, +currIdRow)

    for (let i = minCell; i <= maxCell; i++) {
        data.cells.push(i)
    }

    for ( let j = minRow; j <= maxRow; j++) {
        data.rows.push(j)
    }
    return data
}

