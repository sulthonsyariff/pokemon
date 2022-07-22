import Card from "./Card";

const List = ({ pokemonList }) => {
  return (
    <>
      {pokemonList.length >= 1 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4'>
          {pokemonList.map(pokemon => (
            <Card item={pokemon} key={pokemon.name} />
          ))}
        </div>
      ) : (
        <div className='text-white text-center'>
          Pokémon tidak ditemukan, coba cari dengan kondisi lainnya
        </div>
      )}
    </>
  );
};

export default List;
