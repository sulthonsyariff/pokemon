import getColorByPokemonType from '../../utils/getColorByPokemonType';

const About = ({ height, weight, baseExperience, types }) => {
  return (
    <>
      <h1 className='font-bold text-lg pb-3'>About</h1>
      <div className='border p-3 grid grid-cols-3 gap-3 rounded pb-7'>
        <div>
          <div className='text-sm font-medium pb-1 text-gray-500'>Height</div>
          <div className='font-bold'>{height / 10} m</div>
        </div>
        <div>
          <div className='text-sm font-medium pb-1 text-gray-500'>Weight</div>
          <div className='font-bold'>{weight / 10} kg</div>
        </div>
        <div>
          <div className='text-sm font-medium pb-1 text-gray-500'>Base EXP</div>
          <div className='font-bold'>{baseExperience}</div>
        </div>
        <div>
          <div className='text-sm font-medium pb-1 text-gray-500'>Types</div>
          <div className='flex gap-2 mt-2'>
            {types.map((type, index) => (
              <span
                className="table text-sm mb-2 rounded-full py-1 px-4 text-white bg-opacity-30 capitalize"
                style={{backgroundColor: getColorByPokemonType(type.type.name)}}
                key={index}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default About