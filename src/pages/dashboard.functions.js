function toHTML(el) {
    const key = Object.keys(el)[0]
    return `
         <li class="db__record">
                <a href="#${key ? key.replace(':', '/') : ''}">${el[key].tableName}</a>
                <strong>${new Date().toLocaleDateString()}</strong>
         </li>
    `
}

function getAllKeys() {
    const keys = []
    const info = Object.entries(localStorage).reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
    }, {})
    Object.keys(info).forEach(function(el) {
        if (el.includes('excel')) {
            keys.push({[el]: JSON.parse(info[el])})
        }
    })
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()
    console.log(keys)
    if (!keys.length) {
        return 'You don\'t have any tables...'
    }
    return `
        <div class="db__list-header">
                        <span>Name</span>
                        <span>Date create</span>
        </div>
        <ul class="db__list">
           ${keys.map(toHTML)}
        </ul>
    `
}
