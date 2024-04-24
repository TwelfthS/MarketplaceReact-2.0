import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ProductCard = styled.div`
position: relative;
border: 1px solid black;
border-radius: 5px;
margin: 50px;
width: 18rem;
min-width: 100px;
height: 25rem;
min-height: 80px;
display: flex;
flex-direction: column;
&:hover {
    border: 2px solid black;
}
`

export const OrderCard = styled.div`
position: relative;
border: 1px solid black;
border-radius: 5px;
padding: 10px;
margin: 50px;
width: 90%;
min-width: 200px;
height: 10rem;
min-height: 80px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
&:hover {
    border: 2px solid black;
}
`

export const LinkCard = styled(Link)`
color: black;
text-decoration: none;
font-size: 25px;
font-weight: 500;
display: block;
&:hover {
    color: black;
}
`

export const CardsDiv = styled.div`
display: flex;
justify-content: start;
flex-wrap: wrap;
`

export const AddButton = styled.button`
background-color: #22FF00;
border: 1px solid black;
border-radius: 3px;
&:hover {
    background-color: #1BC900;
}
`

export const CartButton = styled.button`
height: 30px;
width: 30px;
border: none;
border-radius: 15px;
margin: 5px;
background-color: #22FF00;
&:hover {
    background-color: #1BC900;
}
`

export const RemoveAllButton = styled.button`
position: absolute;
top: 0;
right: 0;
border-bottom: 1px solid black;
border-left: 1px solid black;
border-top: none;
border-right: none;
background-color: #D13535
`

export const Search = styled.input`
height: 40px;
width: 80%;
max-width: 800px;
margin-right: 50px;
border: none;
border-right: 1px solid black;
`

export const SearchDiv = styled.div`
border: 1px solid black;
height: 42px;
width: 80%;
max-width: 800px;
margin: 50px;
`

export const MarginedDiv = styled.div`
margin: 3rem;
`

export const CardImg = styled.img`
width: 100%;
height: 100%;
`

export const Sorter = styled.select`
width: 200px;
height: 30px;
border: 1px solid gray;
border-radius: 5px;
margin: 50px;
`

export const ImgDiv = styled.div`
    height: 50%;
    border-bottom: 1px solid black;
`

export const StyledButton = styled.button`
background-color: #22FF00;
border: 2px solid black;
border-radius: 3px;
height: 60px;
width: 150px;
&:hover {
    background-color: #1BC900;
}
`

