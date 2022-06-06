const Hotel = ({ hotel, increasingOrDecreasing, onDelete }) => {
  return (
    <div className="flex sm:flex md:flex flex-col sm:flex-row md:flex-row justify-start sm:justify-start md:justify-start items-center sm:items-center md:items-center w-5/6 sm:w-1/3 md:w-2/3 lg:w-2/4 xl:w-1/3 h-3/4 sm:h-40 md:h-40 mt-4 sm:mt-4 md:mt-4 border-2 rounded-md shadow-md duration-500 hover:bg-gray-300 parent-hotel">
      <div className="w-5/6 sm:w-3/5 md:w-3/5">
        <img className="object-cover p-2 px-0 sm:p-2 w-full sm:w-full h-40" src={hotel.imageUrl} alt={hotel.name} />
      </div>
      <div className="w-4/5 sm:w-2/5 h-36 sm:h-40 md:h-40 py-2 px-4">
        <h1 className="text-md sm:text-lg md:text-lg">{hotel.name}</h1>
        <p className="bg-blue-50 text-teal-400 mt-2">{hotel.point} Puan</p>
        <div className="flex justify-between mt-6">
          <button onClick={() => {increasingOrDecreasing(hotel.id, "increasing")}} className="border border-blue-400 p-1 rounded custom-xs-text text-blue-600 hover:bg-blue-600 hover:text-white transition duration-500 ease-in-out">PUAN ARTIR</button>
          <button onClick={() => {increasingOrDecreasing(hotel.id, "decreasing")}} className="border border-blue-400 p-1 rounded custom-xs-text text-blue-600 hover:bg-blue-600 hover:text-white transition duration-500 ease-in-out">PUAN AZALT</button>
        </div>
      </div>
      <div className='relative remove-btn flex justify-start items-center sm:flex sm:top-0 sm:left-0 sm:justify-center sm:items-center delete-btn duration-500'>
        <button onClick={() => onDelete(hotel.id)} className="w-7 h-7 -mt-40 text-lg bg-red-500 text-white rounded-full">
          x
        </button>
      </div>
    </div>
  )
}

export default Hotel;