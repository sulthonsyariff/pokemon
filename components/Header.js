import { useRouter } from "next/router";
import { useState } from "react"
import constantPokemon from '../contants/pokemon.json';

const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const onSubmit = (event) => {
    if (!search) {
      event.preventDefault();
    } else {
      event.preventDefault();
      let result = constantPokemon.results.filter(pokemon => pokemon.name === search.toLowerCase() );
      if ( result.length < 1 ) return
      router.push(`/detail/${result[0].name}`);
    }
  };
 
  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl font-bold pb-3 text-white">Pokémon</h1>
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Search for a Pokémon, e.g. Pikachu" 
            className="w-full border rounded-full p-3"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
      </header>
    </>
  )
}

export default Header
