import { nameStats } from '../../utils/index';
import Progress from './Progress';

const BaseStats = ({ stats }) => {
  return (
    <>
      <h1 className='font-bold text-lg pb-3'>Base Stats</h1>
      <div className='border p-3 rounded'>
        <div className="flex flex-col">
          {stats.map((data, index) => (
            <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-0 sm:gap-3 mb-3 sm:mb-0 items-center" key={index}>
              <div className="w-full sm:w-56 text-sm font-medium text-gray-500">{nameStats(data.stat.name)}</div>
              {/* number and progress */}
              <Progress percentage={data.base_stat} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BaseStats
