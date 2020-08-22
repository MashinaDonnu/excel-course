export function resizeHandler(event, type, resize, parent, root) {
    if (type === 'col') {
        const index = parent.dataset.colIndex
        resize.classList.add('active-resize')
        const resizeHeightActive = document.documentElement.clientHeight - event.clientY + 'px'
        const resizeHeight = resize.clientHeight + 'px'
        resize.style.height = resizeHeightActive

        console.log(resizeHeightActive)
        let collWidth = 0

        document.onmousemove = e => {
            collWidth = e.clientX - event.clientX
            resize.style.right = -collWidth + 'px'
        }
        document.onmouseup = () => {
            if (collWidth) {
                parent.style.width = collWidth + parent.clientWidth + 'px'
                const cells = root.querySelectorAll(`[data-cell-index="${index}"]`)
                cells.forEach( c => c.style.width = collWidth + c.clientWidth + 'px')
                resize.style.height = resizeHeight
            }
            resize.classList.remove('active-resize')
            resize.style.right = 0
            document.onmousemove = null
            document.onmouseup = null
        }
    }

    if (type === 'row') {
        let rowHeight = 0
        const resizeWidthActive = document.documentElement.clientWidth - event.clientX + 'px'
        const resizewidth = resize.clientWidth + 'px'
        resize.style.width = resizeWidthActive
        document.onmousemove = e => {
            rowHeight = e.clientY - event.clientY
            resize.style.bottom = -rowHeight + 'px'
        }
        document.onmouseup = () => {
            if (rowHeight) {
                resize.classList.add('active-resize')
                parent.style.height = rowHeight + parent.clientHeight + 'px'
            }
            resize.style.width = resizewidth
            resize.style.bottom = 0
            resize.classList.remove('active-resize')
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}
