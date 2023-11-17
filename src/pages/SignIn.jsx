import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'


function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            // The on submit signs in a user.
            // const auth = getAuth() is a function that returns an Auth instance
            const auth = getAuth()
            // signInWithEmailAndPassword is a function that signs in a user with the specified email address and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            // if the userCredential.user exists then navigate to the home page
            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            //toast will appear in the top right of the screen if an error with sign in occurs
            toast.error('Bad User Credentials')
            //clears the form data
            setFormData({ email: '', password: '' })
        }
    }
    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome Back!</p>
                </header>
                {/* on submit signs in the user */}
                <form onSubmit={onSubmit}>
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
                    <div className="signInBar">
                        <p className="signInText">
                            Sign In
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon fill="#ffffff" width="36px" height="36px" />
                        </button>
                    </div>
                </form>
                {/* Google OAuth */}
                <OAuth />
                <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
            </div>
        </>
    )
}
export default SignIn