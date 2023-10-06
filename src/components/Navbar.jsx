//useNavigate is used to navigate to a new page, useLocation is used to get the current location of the user.
import { useNavigate, useLocation } from "react-router-dom"
//importing the icons from the assets folder
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg"
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg"
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg"

function Navbar() {
    //to use navigate and location hooks you have to initialize them
    const navigate = useNavigate()
    const location = useLocation()

    //this function is used to check if the route is the same as the current location. If it is, it will return true. This will be used below to change the icons color if the user is on the page that icon represents. 
    //location.pathname is the current location.

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
    }


    return (
        <footer className="navbar">
            <nav className="navbarNav">
                <ul className="navbarListItems">
                    <li className="navbarListItem" onClick={() => navigate('/')}>
                        {/* The useNavigate() is used to route to a new page. Once the user clicks this li they will be taken to the page that has been designated with the '/' route, in this case it take them to the explore page. */}
                        <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                        {/* ^^^ The pathMatchRoute function checks the route, if the current route matches the route declared in pathMatchRoute the icon will be displayed in the color #2c2c2c, if it doesnt it will display the color #8f8f8f.*/}
                        <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                        {/* ^^^ The pathMatchRoute() is used to determine the path and assign the class navbarListItemNameActive if the pathname matches the route, and navbarListItemName if it doesnt.  */}
                    </li>
                    <li className="navbarListItem" onClick={() => navigate('/offers')}>
                        <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                        <p className={pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offer</p>
                    </li>
                    <li className="navbarListItem" onClick={() => navigate('/profile')}>
                        <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                        <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                    </li>
                </ul>

            </nav>



        </footer >
    )
}
export default Navbar