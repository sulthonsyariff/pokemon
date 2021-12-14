import Card from "./Card"

const List = ({ pokemon }) => {

  return (
    // container
    <>
      {/* header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold pb-3">Pokémon</h1>
        <input type="text" placeholder="Search for a Pokémon, e.g. Pikachu" className="w-full border rounded-full p-3" />        
      </header>
      {/* list */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
        {pokemon.map(data => (
          <Card
            item={data} 
            key={data.name}
          />
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const pokemon = await getListPokemon();

  return {
    props: {
      pokemon,
    },
  };
}

export default List;