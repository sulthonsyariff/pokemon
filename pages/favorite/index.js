import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card";
import Seo from "../../components/atoms/Seo";
import { LIST_FAVORITE_POKEMON } from "../../redux/modules/pokemon";

const FavoriteIndex = () => {
  const router = useRouter();
  const listFavorite = useSelector(LIST_FAVORITE_POKEMON);

  return (
    <>
      <Seo
        title='Favorite Pokémon'
        description='Favorite Pokémon'
        image='/pokeball-red.png'
      />

      <div className='max-w-6xl mx-auto min-h-screen'>
        <div className='flex items-center ml-5 lg:md-0'>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='cursor-pointer'
            size='lg'
            color='white'
            onClick={() => router.push("/")}
          />
          <h1 className='text-xl sm:text-2xl font-bold text-white pl-5 py-4'>
            Your Favorite Pokémon
          </h1>
        </div>
        <div className='w-full mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4'>
          {listFavorite.map(data => (
            <Card item={data} key={data.name} />
          ))}
        </div>
        {listFavorite.length < 1 && (
          <div className='flex flex-col justify-center items-center wrap-empty-favorite -m-2'>
            <img
              src='/open-pokeball.png'
              className='w-60 xl:w-72 md mx-auto'
              alt='empty'
            />
            <div className='w-full text-center text-white text-lg pt-8'>
              Yaaah :( Saat ini Kamu tidak punya Pokémon Favorite, ayo tambahkan
              sekarang!
            </div>
            <button
              className='bg-red-600 text-white rounded-full py-1 px-4 mt-6 text-lg'
              onClick={() => router.push("/")}
            >
              Cari Pokémon
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoriteIndex;
