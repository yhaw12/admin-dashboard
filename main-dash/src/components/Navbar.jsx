import profile from '../assests/profile.jpg';


// ../../assests/image1.jpeg

function Navbar() {
  return (
    <div className='w-full h-10 flex items-center justify-between px-16 py-10 border'>
        <div >
            <img className='rounded-full w-12 h-12 ' src={profile}/>
        </div>

        <div className="flex items-center border">
            <img className='rounded-full w-12 h-12' src={profile} />
            <div className='pl-5'>Ama</div>
        </div>

    </div>
  )
}

export default Navbar