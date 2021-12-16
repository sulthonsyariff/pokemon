import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Card from '../../components/Card';
import {
  selectfavorite
} from '../../redux/pokemonSlice';

const FavoriteIndex = () => {
  const router = useRouter();
  const listFavorite = useSelector(selectfavorite);

  return (
    <>
      <div className="max-w-6xl mx-auto min-h-screen p-4">
        <div className='flex items-center'>
          <FontAwesomeIcon icon={faArrowLeft} className='cursor-pointer' size='lg' color='white' onClick={() => router.push('/')} />
          <h1 className="text-xl sm:text-2xl font-bold text-white pl-5 py-4">Your Favorite Pokémon</h1>
        </div>
        <div className="w-full mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {listFavorite.map(data => (
            <Card
              item={data}
              key={data.name}
            />
          ))}
        </div>
        {listFavorite.length < 1 && (
          <div className='flex flex-col justify-center items-center wrap-empty-favorite'>
            <img src="/empty.svg" className='w-60 xl:w-72 md mx-auto' alt="empty" />
            <div className='w-full text-center text-white pt-4'>You don't have a favorite Pokémon</div>
            <button className='bg-red-600 text-white rounded-full py-1 px-4 mt-3' onClick={() => router.back()}>Browse</button>
          </div>
        )}
      </div>
    </>
  )
}

export default FavoriteIndex
