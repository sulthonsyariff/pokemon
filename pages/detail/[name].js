import { useState, useEffect } from "react";
import {
  getDetailPokemon,
  getSpeciesPokemon,
  getEvolutionPokemon,
} from "../../services/data_api";
import Hero from "../../components/detail/Hero";
import BaseStats from "../../components/detail/BaseStats";
import About from "../../components/detail/About";
import Evolution from "../../components/detail/Evolution";
import Seo from "../../components/atoms/Seo";

export async function getServerSideProps({ params }) {
  const { name } = params;
  let speciesPokemon = null;

  const pokemon = await getDetailPokemon(name);
  // fetch pokemon species for get evolution chain
  // if pokemon not have (-) at the name call getSpeciesPokemon(), ex: orbeetle-gmax, etc
  if (name.indexOf("-") === -1) speciesPokemon = await getSpeciesPokemon(name);

  return {
    props: {
      pokemon,
      speciesPokemon,
    },
  };
}

const toCapitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const DetailPokemon = ({ pokemon, speciesPokemon }) => {
  const [evolution, setEvolution] = useState(null);

  // fetch evolution chain pokemon
  const fetchEvolution = async () => {
    if (!speciesPokemon) return;
    const res = await getEvolutionPokemon(speciesPokemon.evolution_chain.url);
    setEvolution(res);
  };

  // component didmount
  useEffect(() => {
    fetchEvolution();
  }, []);

  return (
    <>
      <Seo
        title={toCapitalize(pokemon.name)}
        description={toCapitalize(pokemon.name)}
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
      />

      <div className='mx-auto min-h-screen pb-4 sm:pb-8 lg:pb-10 xl:pb-12 overflow-x-hidden'>
        {/* hero */}
        <Hero pokemon={pokemon} />
        <section>
          <div className='w-11/12 mx-auto -mt-12'>
            <div className='flex flex-col sm:flex-row sm:gap-8'>
              <About
                height={pokemon.height}
                weight={pokemon.weight}
                baseExperience={pokemon.base_experience}
                types={pokemon.types}
              />
              <BaseStats stats={pokemon.stats} />
            </div>
            {evolution && <Evolution evolution={evolution} />}
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailPokemon;
