// useAuthStatus is a custom hook used in PrivateRoute.jsx to check if the user is logged in or not. If the user is logged in, the user is allowed to access the profile page. If the user is not logged in, the user is redirected to the sign-in page. This is used in firebase.
//protected route with firebase for more info on this hook go to https://stackoverflow.com/questions/65505665/protected-route-with-firebase

import { useEffect, useState, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"


export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const isMounted = useRef(true)

    useEffect(() => {
        //if isMounted is true execute the auth check
        if (isMounted) {
            //check if the user is logged in or not
            const auth = getAuth()
            //onAuthStateChanged is a firebase function that checks if the user is logged in or not
            onAuthStateChanged(auth, (user) => {
                //if the user is logged in, setLoggedIn to true
                //if the user is not logged in, setLoggedIn to false
                if (user) {
                    setLoggedIn(true)
                }
                //set loading to false
                setLoading(false)
            })
        }

        return () => {
            isMounted.current = false
        }

    }, [isMounted])

    return { loggedIn, loading }
}

//Fix memory leak warning ^^^ its why use ref is used in this hook
//https://stackoverflow.com/questions/59780268/cleanup-memeory-leaks-on-an-unmounted-component-in-react-hooks


