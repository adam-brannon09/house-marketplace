import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
// getAuth is a function that returns an Auth instance
// createUserWithEmailAndPassword is a function that creates a new user account associated with the specified email address and password
// updateProfile is a function that updates a user's profile data
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
// db is a variable that stores the Firestore database service
import { db } from '../firebase.config'
function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { name, email, password } = formData
    const navigate = useNavigate()
    // on change function assigns the value of the input to the corresponding state variable in the formData object(name, email, password)
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            // e.target.id is the id of the input element and matches the object key in the formData object
            //then e.target.value is the value of the input element and it gets assigned to the corresponding object key in the formData object
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            // The on submit signs up a new user.
            // docs can be found @ https://firebase.google.com/docs/auth/web/start
            // In this function its async await instead of .then() because we are using the async await syntax
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            updateProfile(auth.currentUser, {
                displayName: name
            })
            // The link below if for the set a document section on the firestore docs
            // https://firebase.google.com/docs/firestore/manage-data/add-data
            // The code below creates a new user document in the users collection(adds user to the db)
            //makes a copy of the form data object
            const formDataCopy = { ...formData }
            // deletes the password key from the formDataCopy object
            delete formDataCopy.password
            //add timestamp to the formDataCopy object
            formDataCopy.timestamp = serverTimestamp()
            // update the db and add the user to the users collection
            await setDoc(doc(db, 'users', user.uid), formDataCopy)
            // navigate to the home page after successful sign up
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        className='nameInput'
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange={onChange}
                    />
                    <input
                        type="email"
                        className='emailInput'
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={onChange}
                    />
                    <div className='passwordInputDiv'>
                        <input type={showPassword ? 'text' : 'password'}
                            className='passwordInput'
                            placeholder='Password'
                            id='password'
                            value={password}
                            onChange={onChange}
                        />
                        <img src={visibilityIcon} alt="show password"
                            className='showPassword'
                            onClick={() => setShowPassword((prevState => !prevState))}
                        />
                    </div>
                    <Link to='/forgot-password'
                        className='forgotPasswordLink'>
                        Forgot Password
                    </Link>
                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill="#ffffff" width="36px" height="36px" />
                        </button>
                    </div>
                </form>
                {/* Google OAuth */}
                <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
            </div>
        </>
    )
}
export default SignUp