import { useState, useRef, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/Searchbar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import Spinner from './components/Spinner'

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
const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery />
        </Suspense>
      )
    }
  }
    
    return (
       <div>
		{message}
		<Router>
        <Route exact path={'/'}>
          <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
            <SearchBar />
          </SearchContext.Provider>
            <DataContext.Provider value={data}>
              {renderGallery()}
            </DataContext.Provider>
        </Route>
        <Route path="/album/:id">
          <AlbumView />
        </Route>
        <Route path="/artist/:id">
          <ArtistView />
        </Route>
      </Router>
    </div>
  );
}

export default App;

