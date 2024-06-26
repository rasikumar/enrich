import Heart from './components/Heart'
import BlogDetails from './components/BlogDetails';

import { useEffect,useState } from "react"
import Lenis from 'lenis';
import { SquareLoader } from "react-spinners"
import { Route, Routes } from 'react-router-dom';

const App = () => {

  // this is using for smooth-scrooling
  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  // this is using for preloading
  const [loading, setLoading] = useState (false)
  useEffect(()=>{
      setLoading(true);
      setTimeout(() => {
          setLoading(false)
      }, 200);
  },[])
  

  return (
    <div className="scroll-smooth">
      {loading ? (
        <SquareLoader
        color={'yellow'}
        loading={loading}
        size={50}
        className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  w-full h-full z-[1000]"
      />
      ):(
        <>
        <Routes>
          <Route path='/' element={<Heart/>}/>
          <Route path='/BlogsList/:id' element={<BlogDetails/>}/>
        </Routes>
        </>
      )
      }
    </div>
  )
}

export default App
