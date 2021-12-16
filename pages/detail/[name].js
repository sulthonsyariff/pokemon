import { useState, useEffect } from 'react';
import { getDetailPokemon, getSpeciesPokemon, getEvolutionPokemon } from '../../services/data_api';
import getColorByPokemonType from '../../utils/getColorByPokemonType';
import Hero from '../../components/detail/Hero';
import BaseStats from '../../components/detail/BaseStats';
import About from '../../components/detail/About';
import Evolution from '../../components/detail/Evolution';

const DetailPokemon = ({ pokemon, speciesPokemon }) => {
  const [evolution, setEvolution] = useState(null);
  const [bgColorType, setBgColorType] = useState('');

  // fetch evolution chain pokemon
  const fetchEvolution = async () => {
    if (!speciesPokemon) return
    const res = await getEvolutionPokemon(speciesPokemon.evolution_chain.url);
    setEvolution(res);
  }

  // component didmount
  useEffect(() => {
    fetchEvolution();
    // set backgroundColor by type
    setBgColorType(getColorByPokemonType(pokemon.types[0].type.name));
  }, []);

  return (
    <div className="mx-auto min-h-screen pb-4 sm:pb-8 lg:pb-10 xl:pb-12" style={{backgroundColor: bgColorType}}>
      {/* hero */}
      <Hero pokemon={pokemon} />
      <section>
        <div className='w-11/12 mx-auto -mt-12'>
          <div className='flex flex-col sm:flex-row sm:gap-5'>
            <About
              height={pokemon.height}
              weight={pokemon.weight}
              baseExperience={pokemon.base_experience}
              types={pokemon.types}
            />
            <BaseStats
              stats={pokemon.stats}
            />
          </div>
          {evolution && <Evolution evolution={evolution} />}
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { name } = params;
  let speciesPokemon;
  // fetch pokemon detail information
  const pokemon = await getDetailPokemon(name);
  // fetch pokemon species for get evolution chain
  // if pokemon have a (-) in the name return null, ex: orbeetle-gmax, etc
  if (name.indexOf('-') > -1) {
    speciesPokemon = null
  } else {
    speciesPokemon = await getSpeciesPokemon(name);
  }

  return {
    props: {
      pokemon,
      speciesPokemon
    }
  };
}

export default DetailPokemon;