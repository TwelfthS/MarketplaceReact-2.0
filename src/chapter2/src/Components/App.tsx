import * as React from 'react'
import { useState } from 'react'
import ListEntry from './List-entry'
import { ListElement } from 'Other/types'

function App() {
    require('./App.styl')
    const [list, setList] = useState<ListElement[]>([])
    const [text, setText] = useState<string>('')
    const [multChoice, setMultChoice] = useState<boolean>(false)
    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const addToList = (text: string) => {
        if (text !== '') {
            setList(list => [...list, {
                id: list.length ? list[list.length - 1].id + 1 : 0,
                text: text,
                checked: false,
                selected: false
            }])
        }
    }

    const chooseMultiple = () => {
        setMultChoice(!multChoice)
    }

    const check = (id: number) => {
        const index = list.findIndex(entry => entry.id === id)
        if (index > -1) {
            if (multChoice) {
                setList((list) => {
                    const upd = [...list]
                    upd[index].selected = !upd[index].selected
                    return upd
                })
            } else {
                setList((list) => {
                    const upd = [...list]
                    upd[index].checked = !upd[index].checked
                    return upd
                })
            }
        }
    }

    const removeSelected = () => {
        setList(list => list.filter((entry) => !entry.selected))
    }

    const checkSelected = () => {
        setList(list => list.map(entry => {
            if (entry.selected) {
                return {...entry, checked: true}
            } else {
                return entry
            }
        }))
    }

    const selectAll = () => {
        setList(list => list.map(entry => {
            return {...entry, selected: true}
        }))
    }

    const clearSelect = () => {
        setList(list => list.map(entry => {
            return {...entry, selected: false}
        }))
    }


    const removeFromList = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation()
        setList(list => list.filter((entry) => entry.id !== id))
    }
    return (
        <div>
            <div id="head">
                <input id="main_input" onChange={inputOnChange} placeholder="Type here..." />
                <button id="add" onClick={() => addToList(text)}>Добавить</button>
                <button id="mult" className={multChoice ? 'mult-special' : ''} onClick={chooseMultiple}>Выбрать несколько</button>
                {multChoice && <div id="options">
                    <button id="delete" onClick={removeSelected} className="options">Удалить</button>
                    <button id="check" onClick={checkSelected} className="options">Отметить сделанными</button>
                    <button id="all" onClick={selectAll} className="options">Выбрать всё</button>
                    <button id="clear" onClick={clearSelect} className="options">Отменить выбор</button>
                </div>}
            </div>
            <ul id="myList">
                {list.map((entry)=> {
                    return <ListEntry key={entry.id} entry={entry} removeFunc={removeFromList} check={() => check(entry.id)} />
                })}
            </ul>
        </div>
    )
}

export default App