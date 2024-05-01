import { ListElement } from 'Other/types'
import * as React from 'react'

function ListEntry({entry, removeFunc, check}: {entry: ListElement, removeFunc: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void, check: (e: React.MouseEvent<HTMLLIElement>) => void}) {
    return (
        <li className={`list_element ${entry.selected ? 'selected' : ''} ${entry.checked ? 'checked' : ''}`} onClick={check}>
            <p className='list-text'>{entry.text}</p>
            <button className='remove_button' onClick={(e) => removeFunc(e, entry.id)}>X</button>
        </li>
    )
}

export default ListEntry