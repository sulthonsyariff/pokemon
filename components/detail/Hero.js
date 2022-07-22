import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { addPad } from "../../utils/index";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

// redux reducers
import {
  LIST_FAVORITE_POKEMON,
  ADD_FAVORITE,
  DELETE_FAVORITE,
} from "../../redux/modules/pokemon";

const Hero = ({ pokemon }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listFavorite = useSelector(LIST_FAVORITE_POKEMON);
  const [isFavorite, setIsFavorite] = useState(false);

  // check isFavorite pokemon for first render
  const checkFavorite = () => {
    let result = listFavorite.filter(data => data.name === pokemon.name);
    if (result.length < 1) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }

    return result;
  };

  // add pokemon to favorite
  const addToFavorite = () => {
    let favoriteLength = listFavorite.filter(
      data => data.name === pokemon.name
    );

    if (favoriteLength.length < 1) {
      dispatch(ADD_FAVORITE({ name: pokemon.name }));
    } else {
      dispatch(DELETE_FAVORITE({ name: pokemon.name }));
    }

    setIsFavorite(!isFavorite);
  };

  const defaultHeroImage = pokemonId => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  };

  // component didmount
  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <div className='py-4 text-center relative z-10'>
      <div className='relative w-11/12 mx-auto pb-2 flex justify-between items-center'>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size='lg'
          className='cursor-pointer'
          color='white'
          onClick={() => router.back()}
        />
        <div className='text-lg font-medium text-white'>
          #{addPad(pokemon.id)}
        </div>
        <div>
          <div className={isFavorite ? "text-red-600" : "text-white"}>
            <FontAwesomeIcon
              icon={faHeart}
              size='lg'
              className='cursor-pointer'
              onClick={addToFavorite}
            />
          </div>
        </div>
      </div>
      <h1 className='text-4xl font-bold capitalize text-white pb-1'>
        {pokemon.name}
      </h1>
      {/* types */}
      <div className='flex justify-center gap-2 mt-3 pb-5'>
        {pokemon.types.map((type, index) => (
          <span
            className='table text-sm mb-2 rounded-full py-1 px-4 bg-white text-white bg-opacity-30 capitalize'
            style={{
              backgroundColor: getColorByPokemonType(type.type.name),
            }}
            key={index}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <div className='w-full pt-6 pb-10'>
        <div className='w-80 h-80 sm:w-96 sm:h-96 mx-auto relative'>
          <img
            src='/pokemon-bg.png'
            className='absolute pokemon-background-spin'
            alt='pokemon-bg'
          />
          <div className='w-60 h-60 sm:w-64 sm:h-64 relative element-center'>
            <img
              src='/pokemon-circle-bg.png'
              className='w-full absolute'
              alt='pokemon-circle-bg'
            />
            <object
              className='w-5/6 z-10 element-center'
              data={defaultHeroImage(pokemon.id)}
              type='image/png'
            >
              <img
                className='w-full z-10'
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt='pokemon image'
              />
            </object>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
