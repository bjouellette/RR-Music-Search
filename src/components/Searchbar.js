// Seachbar.js
import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

function Searchbar(props) {
   

    return (
        <form>
            <input ref={props.ref} type="text" placeholder="Search Here" />
            <button onClick={(e) => props.handleSearch(e, props.ref.current.value)}>Submit</button>
        </form>
    )
}


export default Searchbar