import profile from '../../assests/profile.jpg';

// ../../assests/image1.jpeg

function Navbar() {
  return (
    <div className='w-full h-10 flex items-center justify-between px-16 py-10'>
        <div>
            <img src={profile}/>
        </div>

        <div className="flex items-center border">
            <img src={profile} />
            <div>Ama</div>
        </div>

    </div>
  )
}

export default Navbar