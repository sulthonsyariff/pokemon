import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import constantPokemonData from "../contants/pokemon.json";
import {
  LIST_FAVORITE_POKEMON,
  UPDATE_DISPLAYED_POKEMON,
  SET_IS_SHOW_LOAD_MORE,
} from "../redux/modules/pokemon";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listFavorite = useSelector(LIST_FAVORITE_POKEMON);
  const [search, setSearch] = useState("");
  const initialPokemonList = constantPokemonData.results.slice(0, 20);

  const handleSearchPokemon = event => {
    event.preventDefault();

    if (!search) {
      dispatch(SET_IS_SHOW_LOAD_MORE(true));
      dispatch(UPDATE_DISPLAYED_POKEMON(initialPokemonList));

      return;
    }

    if (search.length < 3)
      return window.alert("Harap masukkan lebih dari 3 huruf");

    const result = constantPokemonData.results.filter(pokemon =>
      pokemon.name.includes(search.toLowerCase())
    );

    dispatch(UPDATE_DISPLAYED_POKEMON(result));
    dispatch(SET_IS_SHOW_LOAD_MORE(false));
  };

  const handleLogoClicked = () => {
    setSearch("");
    dispatch(SET_IS_SHOW_LOAD_MORE(true));
    dispatch(UPDATE_DISPLAYED_POKEMON(initialPokemonList));
  };

  const goToFavorite = () => router.push(`/favorite`);

  return (
    <>
      <header className='mb-5'>
        <div className='flex justify-between items-center text-white pb-5'>
          <div
            className='flex items-center cursor-pointer'
            onClick={handleLogoClicked}
          >
            <img
              src='/pokeball-red.png'
              className='pr-3 w-11'
              alt='pokeball-red'
            />
            <h1 className='text-2xl font-bold'>Pokédex</h1>
          </div>
          <button
            className='bg-red-600 py-1 px-3 text-center rounded-full'
            onClick={goToFavorite}
          >
            <span>{listFavorite.length}</span>
            <span className='px-1'>Favorite</span>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <form onSubmit={handleSearchPokemon}>
          <input
            type='text'
            placeholder='Search for a Pokémon, e.g. Pikachu'
            className='w-full rounded-full p-3'
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </form>
      </header>
    </>
  );
};

export default Header;
