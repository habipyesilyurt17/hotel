import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import NotFound from "./components/NotFound"
import HotelList from "./components/HotelList"
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {

  const [hotels, setHotels] = useState(() => {
    const localData = localStorage.getItem('hotels')
    return localData ? JSON.parse(localData) : [
      {
        "id": uuidv4(),
        "name": "Lass World City Hotel",
        "point": 8.9,
        "created_at": "1654348458745",
        "pointDate": "1654348458745",
        "imageUrl": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      },
      {
        "id": uuidv4(),
        "name": "City Hotel",
        "point": 8.9,
        "created_at": "1654319928319",
        "pointDate": "1654319928319",
        "imageUrl": "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        "id": uuidv4(),
        "name": "Hotel Kaya Est 1985",
        "point": 9.9,
        "created_at": "1654319945488",
        "pointDate": "1654319945488",
        "imageUrl": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        "id": uuidv4(),
        "name": "İkiz Konak Boutique Hotel",
        "point": 6.9,
        "created_at": "1654336633376",
        "pointDate": "1654336633376",
        "imageUrl": "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGhvdGVsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        "id": uuidv4(),
        "name": "Mula Hotel",
        "point": 7.9,
        "created_at": "1654348418196",
        "pointDate": "1654348418196",
        "imageUrl": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdGVsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        "id": uuidv4(),
        "name": "Rafinn Hotel",
        "point": 6.9,
        "created_at": "1654320876272",
        "pointDate": "1654320876272",
        "imageUrl": "https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ]
  })

  useEffect(() => {
    localStorage.setItem('hotels', JSON.stringify(hotels))
  }, [hotels])

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/hotels" />} />
          <Route path="/hotels" element={<HotelList hotels={hotels.sort((a,b) => b.created_at - a.created_at)} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer theme="colored"/>
    </Router>
  )
}