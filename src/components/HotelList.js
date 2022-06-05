import {useEffect, useState, useRef} from 'react'
import Hotel from "./Hotel"
import Pagination from "./Pagination"
import Modal from './Modal'
import { BiChevronDown } from "react-icons/bi"
import { BsArrowDownUp } from "react-icons/bs"
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';



const HotelList = ({ hotels }) => {
  const [hotelsData, setHotelsData] = useState(hotels)
  const [showDropdown, setShowDropdown] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [createHotel, setCreateHotel] = useState(false);

  const [message, setMessage] = useState("")
  const [toastifyMessage, setToastifyMessage] = useState({
    type: "",
    desc: "",
  });
  const hotelInputRef = useRef(null);


  const [hotel, setHotel] = useState({});

  const [currentPage, setCurrentPage] = useState(1)
  const [hotelsPerPage, setHotelsPerPage] = useState(5)

    // Get current Hotel
    const indexOfLastHotel = currentPage * hotelsPerPage
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage
    const currentHotels = hotelsData.slice(indexOfFirstHotel, indexOfLastHotel)
  
    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleDropdown = () => {
      const dropdown = document.getElementById("dropdown-menu");
      setShowDropdown(!showDropdown);
      dropdown.classList.toggle("hidden");
    };

    const sortByIncreasingOrDecreasing = (sortBy) => {
      const sortedHotels = sortBy === "increasing" ? 
      hotelsData.sort((a,b)=> (b.point - a.point)) : 
      hotelsData.sort((a,b)=> (a.point - b.point))
      setHotelsData(sortedHotels)
    }

    const increasingOrDecreasing = (hotelId, tpye) => {
      const increasingHotel = hotelsData.find((hotel) => hotel.id === hotelId);
      let index = hotelsData.indexOf(increasingHotel);
      const pointDate = new Date().getTime()
      const newHotel = {...increasingHotel , ...{
        point: tpye === "increasing" ? increasingHotel.point+1 : increasingHotel.point-1,
        pointDate: String(pointDate),
      }}
      let newHotelsData = [...hotelsData]
      newHotelsData[index] = newHotel
      const sortByPointDate = newHotelsData.sort((a,b) => {
        if (a.point === b.point) {
          return a.pointDate > b.pointDate ? -1 : 1
        } else if (a.point > b.point) {
          return -1
        } else {
          return  1
        }
      })
      setHotelsData(sortByPointDate)
    }

    const onDelete = (hotelId) => {
      const selectedHotel = hotelsData.find((hotel) => hotel.id === hotelId)
      setMessage(selectedHotel.name)
      setDeleting(true)
      setHotel(selectedHotel)
    };

    const deleteHotelHandler = () => {
      setDeleting(false)
      const filteredHotel = hotelsData.filter((h) => h.id !== hotel.id)
      setHotelsData(filteredHotel)
      const newMessage = {
        ...toastifyMessage,
        ...{ type: "success", desc: "SİLİNDİ" },
      }
      setToastifyMessage(newMessage);
    }

    const cancelHotelHandler = () => {
      setCreateHotel(false)
      setDeleting(false);
    }

    const onCreate = () => {
      setCreateHotel(true)
    }

    const createHotelHandler = () => {
      setCreateHotel(false)
      const id = uuidv4()
      const name = hotelInputRef.current.value.trim()
      const point = 5.0
      const created_at = new Date().getTime()
      const pointDate = new Date().getTime()
      const imageUrl = "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"

      if (name.trim().length === 0) {
        return;
      }

      const hotelObject = {
        id,
        name,
        point,
        created_at,
        pointDate,
        imageUrl
      };

      const newHotelArr = [ ...hotelsData ]
      newHotelArr.unshift(hotelObject)
      setHotelsData(newHotelArr)
      const newMessage = {
        ...toastifyMessage,
        ...{ type: "success", desc: "EKLENDİ" },
      }
      setToastifyMessage(newMessage);
    }

    const toastMessage = () => {
      toast(toastifyMessage.desc, {
        type: toastifyMessage.type,
        position: toast.POSITION.TOP_CENTER,
      });
      setToastifyMessage({ type: "", desc: "" });
    };

    useEffect(() => {
      localStorage.removeItem("hotels")
      localStorage.setItem('hotels', JSON.stringify(hotelsData))
    }, [hotelsData])

  return (
    <>
      { toastifyMessage.desc !== "" && toastMessage() }
      { createHotel && (
        <Modal
          title="OTEL EKLE"
          canCancel
          canConfirm
          onCancel={cancelHotelHandler}
          onConfirm={createHotelHandler}
          confirmText="EKLE"
          cancelText="VAZGEÇ"
        >
          <form className="mb-0 space-y-6">
            <div>
              <label
                htmlFor="hotel"
                className="block text-sm font-medium text-gray-700"
              >
                Otel Adı
              </label>
              <div className="mt-1">
                <input
                  ref={hotelInputRef}
                  id="hotel"
                  name="hotel"
                  type="text"
                  autoComplete="hotel"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500;"
                />
              </div>
            </div>
          </form>
        </Modal>
      )}
      {deleting && (
        <Modal
          title="OTELİ SİL"
          canCancel
          canConfirm
          onCancel={cancelHotelHandler}
          onConfirm={deleteHotelHandler}
          confirmText="SİL"
          cancelText="VAZGEÇ"
        >
          <div className="mt-2 text-sm">
            <p className='text-lg text-center'><span className='font-bold text-lg'>{message}</span>'i silmek istediğinizden emin misiniz?</p>
          </div>
        </Modal>
      )}

      <div className="flex flex-col justify-center items-center mt-4 w-full">
        <h1 className="font-bold">Otel Listesi</h1>
        <hr className='border w-1/3 divide-slate-200 mt-1 mb-4' />
        <div className="flex justify-between items-center w-1/3">
          <div className='flex justify-start items-center'>
            <button onClick={onCreate} className="w-8 h-8 border border-blue-400 rounded text-md text-blue-600 hover:bg-blue-600 hover:text-white transition duration-500 ease-in-out">+</button>
            <p className='font-semibold ml-2'>OTEL EKLE</p>
          </div>
          <div className="w-2/5 mt-3 relative flex justify-between items-center p-2 border-2 rounded-md shadow-md">
            <div className='flex justify-start'>
              <BsArrowDownUp className='text-gray-500 text-lg font-semibold' />
              <p className='text-sm ml-2'>Sıralama</p>
            </div>
            <BiChevronDown
              onClick={handleDropdown}
              className="cursor-pointer w-8 h-8 text-gray-400"
            />
            <div
              className="bg-white hidden absolute right-0 z-10 shadow-lg rounded-md p-2 text-sm w-48 mt-36"
              id="dropdown-menu"
            >
              {showDropdown && (
                <>
                  <a
                    className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    onClick={() => {
                      sortByIncreasingOrDecreasing("increasing")
                      handleDropdown();
                    }}
                  >
                    Puan (Artan)
                  </a>
                  <a
                    className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    onClick={() => {
                      sortByIncreasingOrDecreasing("decreasing")
                      handleDropdown();
                    }}
                  >
                    Puan (Azalan)
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        { 
          currentHotels.length > 0 &&
          currentHotels.map((hotel) => (
            <Hotel key={hotel.id} hotel={hotel} increasingOrDecreasing={increasingOrDecreasing} onDelete={onDelete} />
          ))
        }
        <Pagination hotelsPerPage={hotelsPerPage} totalHotels={hotelsData.length} currentPage={currentPage} paginate={paginate} />
      </div>
    </>
  );
};

export default HotelList;