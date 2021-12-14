const Progress = ({percentage}) => {
  return (
    <>
      <div className="flex items-center w-full">
        <div className="w-8 font-medium mr-3 text-left sm:text-right">{percentage}</div>
        <div className="w-full h-2 rounded-full bg-gray-300 overflow-hidden">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{
          width: percentage + '%'
        }}></div>
      </div>
      </div>
    </>
  )
}

export default Progress
