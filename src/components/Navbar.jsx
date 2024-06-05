import navLogo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <div className="sticky top-6 w-[80%] text-sm ml-auto mr-auto z-[1000]">
      <nav className=" flex items-center justify-around p-5 rounded-md bg-white/70 shadow-md border-[1px] border-yellow-600">
        <div className="logo flex gap-1 cursor-pointer" >
          <img src={navLogo} width={20}  alt="logo" />
          Enrich
        </div>
        <div className="list-items">
          <ul>
            <li className="flex gap-6 text-black tracking-wide ">
              <a className='hover:text-yellow-600 transition delay-75' href="#">Home</a>
              <a className='hover:text-yellow-600 transition delay-75' href="">Services</a>
              <a className='hover:text-yellow-600 transition delay-75' href="#">Pricing</a>
              <a className='hover:text-yellow-600 transition delay-75' href="#">Testimonials</a>
            </li>
          </ul>
        </div>
        <div className="cta-btn flex items-center justify-center gap-4">
          <a className='hover:text-yellow-600 transition delay-75 border-[1px] py-[0.10rem] px-[1.5rem] rounded-sm border-yellow-700 ' href="#">Blogs</a>
          <button className='delay-75 px-4 py-1 rounded text-slate-100 bg-yellow-600 hover:bg-slate-100 hover:text-yellow-600 '>Free Trial</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
