import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListPokemon } from "../services/data_api";
import Header from "../components/Header";
import List from "../components/List";
import LoadingPage from "../components/atoms/LoadingPage";
import Seo from "../components/atoms/Seo";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  DISPLAYED_POKEMONS,
  UPDATE_DISPLAYED_POKEMON,
  SET_IS_SHOW_LOAD_MORE,
  IS_SHOW_LOAD_MORE,
} from "../redux/modules/pokemon";

export async function getServerSideProps() {
  const { results: allPokemonList } = await getAllListPokemon();

  return {
    props: {
      allPokemonList,
    },
  };
}

const Index = ({ allPokemonList }) => {
  const limitDisplayedPokemon = 20;
  const dispatch = useDispatch();
  const displayedPokemons = useSelector(DISPLAYED_POKEMONS);
  const hasMore = useSelector(IS_SHOW_LOAD_MORE);
  const [offset, setOffset] = useState(limitDisplayedPokemon);
  const [loading, setLoading] = useState(true);

  const loadMore = async () => {
    const slicedPokemons = allPokemonList.slice(
      offset,
      offset + limitDisplayedPokemon
    );

    dispatch(
      UPDATE_DISPLAYED_POKEMON([...displayedPokemons, ...slicedPokemons])
    );

    setOffset(offset + limitDisplayedPokemon);

    dispatch(SET_IS_SHOW_LOAD_MORE(true));
  };

  // loading preload
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // set initial displayed pokemon
  useEffect(() => {
    dispatch(
      UPDATE_DISPLAYED_POKEMON(allPokemonList.slice(0, limitDisplayedPokemon))
    );
    dispatch(SET_IS_SHOW_LOAD_MORE(true));
  }, [allPokemonList]);

  return (
    <>
      {loading && <LoadingPage />}
      <Seo
        title='Sulthon Syariff'
        description='Search information about your favorite Pokémon'
        image='/pokeball-red.png'
      />
      <div className='max-w-6xl mx-auto min-h-screen bg-app-dark p-4 mb-1'>
        <Header />
        <InfiniteScroll
          pageStart={0}
          dataLength={displayedPokemons.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className='text-center text-white pt-4'>Loading ...</div>
          }
        >
          <List pokemonList={displayedPokemons} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Index;
