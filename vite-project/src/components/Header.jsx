const Header = () => {


  return (
    <div className="p-4 flex justify-between  fixed top-0 left-0 w-full z-[9999]  bg-black">
      <div className="flex items-center gap-8">
        <h1 className="text-[30px] uppercase text-red-700 font-bold">Movie</h1>
        <nav className="hidden md:flex items-center space-x-5 text-white">
          <a href="#" className="hover:text-red-700">
            Home
          </a>
          <a href="#" className="hover:text-red-700">
            About
          </a>
          <a href="#" className="hover:text-red-700">
            Contact
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-5">
        <input type="text"  placeholder="tim kiem" className="text-center rounded-sm"/>
        <button className="text-white hover:bg-violet-600 p-1 border-slate-50 border-solid rounded-sm">Enter</button>
      </div>
    </div>
  );
};


export default Header;