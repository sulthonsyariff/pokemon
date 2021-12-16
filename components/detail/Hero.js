import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { addPad } from '../../utils/index';

// redux reducers
import {
  selectfavorite,
  ADD_FAVORITE,
  DELETE_FAVORITE
} from '../../redux/pokemonSlice';

const Hero = ({ pokemon }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const listFavorite = useSelector(selectfavorite);
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
  }
  
  // add pokemon to favorite
  const addToFavorite = () => {
    let favoriteLength = listFavorite.filter(data => data.name === pokemon.name);

    if (favoriteLength.length < 1) {
      dispatch(ADD_FAVORITE({ name: pokemon.name }));
    } else {
      dispatch(DELETE_FAVORITE({ name: pokemon.name }));
    }

    setIsFavorite(!isFavorite);
  }

  // component didmount
  useEffect(() => {
    checkFavorite();
  }, [])

  return (
    <div className="py-4 pb-20 text-center relative z-10">
      <div
        className='relative w-11/12 mx-auto pb-2 flex justify-between items-center'>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size='lg'
          className='cursor-pointer'
          color='white'
          onClick={() => router.back()}/>
        <div className="text-lg font-medium text-white">#{addPad(pokemon.id)}</div>
        <div>
          <div className={isFavorite ? 'text-red-600' : 'text-white'}>
            <FontAwesomeIcon
              icon={faHeart}
              size='lg'
              className='cursor-pointer'
              onClick={addToFavorite}/>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold capitalize text-white pb-1">{pokemon.name}</h1>
      {/* types */}
      <div className='flex justify-center gap-2 mt-3 pb-5'>
        {pokemon
          .types
          .map((type, index) => (
            <span
              className="table text-sm mb-2 rounded-full py-1 px-4 bg-white text-white bg-opacity-30 capitalize"
              key={index}>
              {type.type.name}
            </span>
          ))}
      </div>
      <div className='w-full'>
        <div className='w-52 h-52 mx-auto rounded-full relative'>
          <img
            src="/pokeball.png"
            className="w-full absolute bottom-0 left-auto right-auto opacity-30"
            alt="bg-pokeball"/>
          <img
            className='relative w-full mx-auto z-10'
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt="pokemon image"/>
        </div>
      </div>
    </div>
  )
}

export default Hero
