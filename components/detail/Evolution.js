import { Fragment, useState, useEffect } from "react";
import getPokemonIdBySpecies from "../../utils/getPokemonIdBySpecies";

const Evolution = ({ evolution }) => {
  const [evoChain, setEvoChain] = useState([]);

  // convert data evolution chain to array
  const setDataEvolution = () => {
    let result = [];
    let evoData = evolution.chain;

    do {
      let evoDetails = evoData["evolution_details"][0];

      result.push({
        speciesName: evoData.species.name,
        minLevel: !evoDetails ? 1 : evoDetails.min_level,
        triggerName: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item,
      });

      evoData = evoData["evolves_to"][0];
    } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

    setEvoChain(result);
  };

  // get image for official-artwork by pokemonId
  const getImage = speciesName => {
    // get pokemon id by pokemon/species name
    let pokemonId = getPokemonIdBySpecies(speciesName);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  };

  // split words ex: use-item to use item for evolution triggered name
  const splitWords = name => {
    return name.split("-").join(" ");
  };

  // component didmount
  useEffect(() => {
    setDataEvolution();
  }, []);

  return (
    <>
      <div className='mt-4 bg-transparent text-white py-4'>
        <h1 className='font-bold text-lg pb-3 sm:text-center'>
          Evolution Chain
        </h1>
        <div className='p-3 rounded evolution-wrapper'>
          <div className='flex flex-col-reverse sm:flex-row gap-3 justify-around items-center text-center'>
            {evoChain.map((data, index) => (
              <Fragment key={index}>
                <div>
                  <img
                    src={getImage(data.speciesName)}
                    alt='evolution-image'
                    className='w-28 h-w-28 mx-auto pb-2'
                  />
                  {data.triggerName === null ||
                  data.triggerName === "level-up" ? (
                    <p className='text-sm font-medium mt-3'>
                      Lvl {data.minLevel || "???"}
                    </p>
                  ) : (
                    <p className='text-sm font-medium mt-3 capitalize'>
                      {splitWords(data.triggerName)}
                    </p>
                  )}
                  <div className='font-medium capitalize text-center text-md mt-1'>
                    {data.speciesName}
                  </div>
                </div>
                {index + 1 < evoChain.length && (
                  <div className='my-4 sm:my-0'>
                    <div>
                      <img
                        src='/up-arrow.png'
                        className='transform rotate-0 sm:rotate-90 w-10'
                        alt='arrow evolution'
                      ></img>
                      {/* <FontAwesomeIcon icon={faLongArrowAltRight} size="lg" /> */}
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Evolution;
