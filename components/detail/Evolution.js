const Evolution = ({ evolution, id }) => {
  const data = [
    {
      number: 2,
      name: evolution.chain.species.name,
      min_level: evolution.chain.evolves_to[0].evolution_details[0].min_level
    },
    {
      number: 1,
      name: evolution.chain.evolves_to[0].species.name,
      min_level: evolution.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level
    },
    {
      number: 0,
      name: evolution.chain.evolves_to[0].evolves_to[0].species.name
    }
  ]

  const getImage = (paramsId) => {
    paramsId = (id * 3) - paramsId;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${paramsId}.png`;
  }

  return (
    <>
      <div className="mt-4 bg-white p-4 border rounded">
        <h1 className='font-bold text-lg pb-3'>Evolution Chain</h1>
        <div className='border p-3 rounded'>
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between items-center text-center">
            {data.map((el, index) => (
              <>
                <div>
                  <img src={getImage(el.number)} alt="evolution-image" className='w-28 h-w-28 mx-auto pb-2' />
                  <div className="font-medium capitalize text-center text-sm text-gray-600">{el.name}</div>
                </div>
                {el.min_level && (
                  <div className="my-4 sm:my-0">
                    <div className="transform rotate-90 sm:rotate-0">
                      icon
                    </div>
                    <p className="text-sm font-medium mt-3">Lvl {el.min_level}</p>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Evolution