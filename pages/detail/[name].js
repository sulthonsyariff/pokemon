import { useState, useEffect } from 'react';
import { getDetailPokemon, getEvolutionPokemon } from '../../services/data_api';
import getColorByPokemonType from '../../utils/getColorByPokemonType';
import { addPad } from '../../utils/index';
import BaseStats from '../../components/detail/BaseStats';
import About from '../../components/detail/About';
import Evolution from '../../components/detail/Evolution';

const DetailPokemon = ({ pokemon }) => {
  const [evolution, setEvolution] = useState(null);
  const [bgColorType, setBgColorType] = useState('');
  const evolutionChainId = Math.ceil(pokemon.id / 3);

  const fetchEvolution = async () => {
    const res = await getEvolutionPokemon(evolutionChainId);
    setEvolution(res);
  }

  useEffect(() => {
    fetchEvolution();
    setBgColorType(getColorByPokemonType(pokemon.types[0].type.name));
  }, []);

  return (
    <div className="mx-auto min-h-screen bg-white">
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
        <div className='w-11/12 mx-auto -mt-12'>
          <div className='flex flex-col sm:flex-row sm:gap-5'>
            <div className='w-full sm:w-1/2 bg-white p-4 border rounded'>
              <About
                height={pokemon.height}
                weight={pokemon.weight}
                baseExperience={pokemon.base_experience}
                types={pokemon.types}
              />
            </div>
            <div className='w-full sm:w-1/2 mt-4 sm:mt-0 bg-white p-4 border rounded'>
              <BaseStats
                stats={pokemon.stats}
              />
            </div>
          </div>
          {evolution && <Evolution evolution={evolution} id={evolutionChainId} />}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { name } = params;
  const pokemon = await getDetailPokemon(name);

  return {
    props: {
      pokemon
    }
  };
}

export default DetailPokemon;