import { nameStats, calcProgress } from "../../utils/index";
import Progress from "./Progress";

const BaseStats = ({ stats }) => {
  return (
    <>
      <div className='w-full sm:w-1/2 mt-4 sm:mt-0 bg-transparent text-white py-4 relative z-20'>
        <h1 className='font-bold text-lg pb-3 sm:text-right'>Base Stats</h1>
        <div className='base-status-wrapper py-5 rounded'>
          <div className='flex flex-col'>
            {stats.map((data, index) => (
              <div
                className='flex flex-col sm:flex-row sm:flex-nowrap gap-0 sm:gap-3 mb-3 sm:mb-0.5 sm:items-center sm:justify-end'
                key={index}
              >
                <div className='w-full sm:w-3/12 text-sm font-medium sm:pl-5 text-gray-400 sm:text-white'>
                  {nameStats(data.stat.name)}
                </div>
                <div className='w-full sm:w-8/12'>
                  <Progress
                    number={data.base_stat}
                    progress={calcProgress(data.stat.name, data.base_stat)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseStats;
