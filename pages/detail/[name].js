import { useState, useEffect } from 'react';
import { getDetailPokemon, getEvolutionPokemon } from '../../services/data_api';
import getColorByPokemonType from '../../utils/getColorByPokemonType';
import { addPad } from '../../utils/index';
import BaseStats from '../../components/detail/BaseStats';
import About from '../../components/detail/About';
import Evolution from '../../components/detail/Evolution';

const DetailPokemon = ({ pokemon, evolution }) => {
  console.log('pokemon', pokemon);
  console.log('evelotion', evolution);

  const [bgColorType, setBgColorType] = useState('');

  useEffect(() => {
    setBgColorType(getColorByPokemonType(pokemon.types[0].type.name));
  }, []);

  return (
    <div className="max-w-5xl mx-auto min-h-screen bg-white">
      {/* header */}
      <header className="p-4 pb-20 text-center" style={{backgroundColor: bgColorType}}>
        {/* <div>Back</div> */}
        <div>
          <div className="text-white text-lg font-medium">#{addPad(pokemon.id)}</div>
          <h1 className="text-4xl font-bold capitalize text-white">{pokemon.name}</h1>
        </div>
        {/* types */}
        <div className='flex justify-center gap-2 mt-3 pb-5'>
          {pokemon.types.map((type, index) => (
            <span
              className="table text-sm mb-2 rounded-full py-1 px-4 bg-white text-white bg-opacity-30 capitalize"
              key={index}>
              {type.type.name}
            </span>
          ))}
        </div>
        <div className='w-full'>
          <div className='w-52 h-52 mx-auto rounded-full relative'>
            <img src="/pokeball.png" className="w-full absolute bottom-0 left-auto right-auto opacity-30" alt="bg-pokeball" />
            <img className='relative w-full mx-auto z-10' src={pokemon.sprites.other['official-artwork'].front_default} alt="pokemon image" />
          </div>
        </div>
      </header>
      <section>
        <div className='w-11/12 bg-white shadow mx-auto -mt-12 rounded p-4'>
          <div className='flex flex-col sm:flex-row sm:gap-5'>
            <div className='w-full sm:w-1/2'>
              <About
                height={pokemon.height}
                weight={pokemon.weight}
                baseExperience={pokemon.base_experience}
                types={pokemon.types}
              />
            </div>
            <div className='w-full sm:w-1/2 mt-4 sm:mt-0'>
              <BaseStats
                stats={pokemon.stats} 
              />
            </div>
          </div>
          <Evolution evolution={evolution} />
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { name } = params;
  const pokemon = await getDetailPokemon(name);
  // const evolution = await getEvolutionPokemon(name);

  return {
    props: {
      pokemon,
      // evolution
    }
  };
}

export default DetailPokemon;