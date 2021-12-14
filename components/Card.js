import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDetailPokemon } from '../services/data_api';
import getColorByPokemonType from '../utils/getColorByPokemonType';
import { addPad } from '../utils/index';

const Card = ({ item }) => {
  const router = useRouter();

  const [types, setTypes] = useState([]);
  const [number, setNumber] = useState('');
  const [bgColorType, setBgColorType] = useState('');

  const getTypes = async (name) => {
    const detail = await getDetailPokemon(name);
    setNumber(detail.id + '');
    setTypes(detail.types);
    setBgColorType(getColorByPokemonType(detail.types[0].type.name));
  }

  const goToDetail = (name) => {
    router.push(`/detail/${name}`);
  }

  useEffect(() => {
    getTypes(item.name);
  }, [])

  return (
    <div
      className="card cursor-pointer relative w-full text-white rounded-lg p-3 overflow-hidden"
      style={{backgroundColor: bgColorType }}
      onClick={() => goToDetail(item.name)}>
      <div className="absolute top-0 right-0 p-3 text-gray-800 font-medium italic">#{addPad(number)}</div>
      <div>
        <div className="font-bold pb-3 text-lg capitalize">{item.name}</div>
        {types.map((type, index) => (
          <span
            className="table text-sm mb-2 rounded-full py-1 px-4 bg-white bg-opacity-30 capitalize"
            key={index}>{type.type.name}
          </span>
        ))}
      </div>

      <img src="/pokeball.png" className="w-24 absolute -bottom-4 -right-4 opacity-30" alt="bg-pokeball" />
      <div className="img-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}
          className="absolute -bottom-1 -right-2"
          alt="pokemon-image"
        />
      </div>
    </div>
  )
}

export default Card;