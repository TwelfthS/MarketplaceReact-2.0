import * as React from 'react'
import { useState } from 'react'
import ListEntry from './List-entry'

function App() {
    require('./App.styl')
    const [list, setList] = useState<string[]>([])
    const [text, setText] = useState<string>('')
    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const addToList = (text: string) => {
        if (text !== '') {
            console.log(text)
            setList(list => [...list, text])
        }
    }

    const removeFromList = (id: number) => {
        setList(list => list.filter((_, index) => index !== id))
    }
    return (
        <div>
            <div id="head">
                <input id="main_input" onChange={inputOnChange} placeholder="Type here..." />
                <button id="add" onClick={() => addToList(text)}>add</button>
                <div id="options">
                    <button id="mult">choose multiple</button>
                    <button id="delete" className="options" style={{display: 'none'}}>delete</button>
                    <button id="check" className="options" style={{display: 'none'}}>done</button>
                    <button id="all" className="options" style={{display: 'none'}}>choose all</button>
                    <button id="clear" className="options" style={{display: 'none'}}>clear choice</button>
                </div>
            </div>
            <ul id="myList">
                {list.map((entry, i)=> {
                    return <ListEntry key={i} entry={entry} removeFunc={() => removeFromList(i)}/>
                })}
            </ul>
        </div>
    )
}

export default App