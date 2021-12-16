import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailPokemon } from '../services/data_api';
import { addPad } from '../utils/index';
import getColorByPokemonType from '../utils/getColorByPokemonType';

const Card = ({ item }) => {
  const router = useRouter();
  const [types, setTypes] = useState([]);
  const [number, setNumber] = useState('');
  const [bgColorType, setBgColorType] = useState('');

  // get types pokemon
  const getTypes = async (name) => {
    const detail = await getDetailPokemon(name);
    setNumber(detail.id + '');
    setTypes(detail.types);

    // set backgroundColor by pokemon type
    setBgColorType(getColorByPokemonType(detail.types[0].type.name));
  }

  // go to detail pokemon
  const goToDetail = (name) => {
    router.push(`/detail/${name}`);
  }

  // component didmount
  useEffect(() => {
    getTypes(item.name);
  }, [])

  return (
    <div
      className="card cursor-pointer relative w-full text-white rounded-lg p-3 overflow-hidden"
      style={{backgroundColor: bgColorType }}
      onClick={() => goToDetail(item.name)}>
      <div>
        <div className='flex flex-col-reverse sm:flex-row justify-between'>
          <div className="font-bold pb-5 text-lg capitalize leading-6">{item.name}</div>
          <div className="text-xs font-medium italic opacity-60">#{addPad(number)}</div>
        </div>
        {types.map((type, index) => (
          <span
            className="table text-xs sm:text-sm mb-2 rounded-full py-1 px-2 sm:px-4 bg-white bg-opacity-30 capitalize"
            key={index}>{type.type.name}
          </span>
        ))}
      </div>

      <img src="/pokeball.png" className="w-24 absolute -bottom-4 -right-4 opacity-30" alt="bg-pokeball" />
      <div className="img-container">
        {number && (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}
            className="absolute -bottom-1 -right-1"
            alt="pokemon-image"
          />
        )}
      </div>
    </div>
  )
}

export default Card;