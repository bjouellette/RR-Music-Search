import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/Searchbar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'

function App() {
    let [message, setMessage] = useState('Search for Music!')
	let[search, setSearch] = useState('')
 let [data, setData] = useState([])
 let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='
    
	useEffect (() => {
		if(search) {

        const fetchData = async () => {
            document.title = `${search} Music`
            const response = await fetch(API_URL + search)
            const resData = await response.json()
            if (resData.results.length > 0) {
                return setData(resData.results)
            } else {
                return setMessage('Not Found')
            }
        }
        fetchData()
	}
}, [search])

const handleSearch = (e, term) => {
	e.preventDefault()
	setSearch(term)
}

    
    return (
       <div>
		{message}
		<Router>
			<Routes>
				<Route path="/" element={
					<>
					<SearchBar handleSearch = {handleSearch} ref={searchInput}/>
					<Gallery data={data}/>
					</>
				}/>
				<Route path="/album/:id" element ={<AlbumView/>}/>
				<Route path="/artist/:id" element={<ArtistView/>}/>
			</Routes>
		</Router>
	   </div>
    )
}

export default App;

