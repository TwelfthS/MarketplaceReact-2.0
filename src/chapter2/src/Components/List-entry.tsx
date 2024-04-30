import * as React from 'react'

function ListEntry({entry, removeFunc}: {entry: string, removeFunc: () => void}) {
    return (
        <li className='list_element'>
            {entry}
            <button className='remove_button' onClick={removeFunc}>X</button>
        </li>
    )
}

export default ListEntry