import List from "../components/List"
import { getListPokemon } from '../services/data_api';

const Home = ({ pokemon }) => {
  return (
    <>
      <div className="max-w-5xl mx-auto min-h-screen bg-white p-4">
        <List pokemon={pokemon.results} />
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

export default Home;