import { useRouter } from "next/router";
import { useState } from "react"
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import constantPokemon from '../contants/pokemon.json';

// redux reducers
import {
  selectfavorite
} from '../redux/pokemonSlice';

const Header = () => {
  const router = useRouter();
  const listFavorite = useSelector(selectfavorite);
  const [search, setSearch] = useState('');

  // handle submit form triggered by enter
  const onSubmit = (event) => {
    event.preventDefault();
    if (!search) return
    // search pokemon in list constantPokemon
    let result = constantPokemon.results.filter(pokemon => pokemon.name === search.toLowerCase());
    // if pokemon available push to detail
    if ( result.length < 1 ) return
    router.push(`/detail/${result[0].name}`);
  };
  
  // go to favorite
  const goToFavorite = () => {
    router.push(`/favorite`);
  }
 
  return (
    <>
      <header className="mb-4">
        <div className="flex justify-between items-center text-white pb-3">
          <h1 className="text-2xl font-bold">Pokémon</h1>
          <button className="bg-red-600 py-1 px-3 text-center rounded-full" onClick={goToFavorite}>
            <span>{listFavorite.length}</span>
            <span className="px-1">Favorite</span>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Search for a Pokémon, e.g. Pikachu" 
            className="w-full rounded-full p-3"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
      </header>
    </>
  )
}

export default Header
