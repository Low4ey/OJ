import React from 'react'
import "./navbar.css"
import LoginModal from '../user/LoginModal';
const Navbar = ({isLoggedIn}) => {
    return (
        <>
            <div class="flex justify-between drop-shadow-md bg-white">
                <img class="h-20 w-20 rounded-full" src="https://example.com/your-image-link.jpg" alt="Logo" />
                <ul class="flex items-center space-x-10 px-4 text-lg">
                    <li><a href="#">Hello</a></li>
                    <li><a href="#">Training Room</a></li>
                    <li><a href="#">Code Game</a></li>
                    <li><a href="#">Bitcoins</a></li>
                </ul>
                {isLoggedIn?<img class="h-20 w-20 rounded-full" src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1985&q=80" alt="Profile"/>:<div className='mt-5 pr-10'>
                    <LoginModal />
                    </div>}
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
  });
export default Navbar;