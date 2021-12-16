import { useState, useEffect } from "react";
import { getListPokemon } from '../services/data_api';
import ReactPaginate from 'react-paginate';
import List from "../components/List"
import Header from "../components/Header";
import LoadingPage from "../components/atoms/LoadingPage";

const Index = ({ pokemon }) => {

  const totalPages = pokemon.count / 20;
  const [pokemonList, setPokemonList] = useState(pokemon);
  const [pageActive, setPageActive] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }, []);

  const fetchPagination = async (selected) => {
    await setLoading(true);
    const limit = 20;
    const offset = selected === 1 ? 0 : (selected - 1) * 20;
    const data = await getListPokemon(offset, limit);
    setPageActive(selected);
    setPokemonList(data);
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

  return (
    <>
      {loading && <LoadingPage />}
    
      <div className="max-w-6xl mx-auto min-h-screen bg-app-dark p-4">
        {/* Header */}
        <Header></Header>
        {/* list */}
        <List pokemon={pokemonList} />

        {/* pagination */}
        <div className="flex justify-center mt-5">
          <ReactPaginate
            onPageChange={(event) => fetchPagination(event.selected + 1)}
            forcePage={pageActive - 1}
            pageRangeDisplayed={3}
            pageCount={totalPages}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            nextLabel="next"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            previousLabel="previous"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            marginPagesDisplayed={3}
          />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const pokemon = await getListPokemon(0);

  return {
    props: {
      pokemon,
    },
  };
}

export default Index;