import getColorByPokemonType from "../../utils/getColorByPokemonType";

const About = ({ height, weight, baseExperience, types }) => {
  return (
    <>
      <div className='w-full sm:w-1/2 bg-transparent text-white py-4 relative z-20'>
        <h1 className='font-bold text-lg pb-3'>About</h1>
        <div className='py-4 grid grid-cols-3 gap-3 about-wrapper'>
          <div>
            <div className='text-sm font-medium pb-1'>Height</div>
            <div className='font-bold'>{height / 10} m</div>
          </div>
          <div>
            <div className='text-sm font-medium pb-1'>Weight</div>
            <div className='font-bold'>{weight / 10} kg</div>
          </div>
          <div>
            <div className='text-sm font-medium pb-1'>Base EXP</div>
            <div className='font-bold'>{baseExperience}</div>
          </div>
          <div className='pt-8'>
            <div className='text-sm font-medium pb-1'>Types</div>
            <div className='flex gap-2 mt-2'>
              {types.map((type, index) => (
                <span
                  className='table text-sm mb-2 rounded-full py-1 px-4 bg-opacity-30 capitalize'
                  style={{
                    backgroundColor: getColorByPokemonType(type.type.name),
                  }}
                  key={index}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
