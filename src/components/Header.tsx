import { signInWithPopup,signOut } from "firebase/auth"
import { auth, provider } from "../firebase/firebase"
import Cookies from "universal-cookie"

interface HeaderProps {
  isAuth: string | boolean | null;
  setIsAuth: React.Dispatch<string | boolean | null>
}

const Header = ({isAuth,setIsAuth}: HeaderProps) => {
  
  const cookie = new Cookies()

  const signInWithGoogle = async() => {
    const data = await signInWithPopup(auth,provider)
    cookie.set('auth-token',data.user.refreshToken)
    setIsAuth(true)
  }
  const signUserOut = async() => {
    await signOut(auth)
    cookie.remove('auth-token')
    setIsAuth(false)
  }

  return (
    <header className=" w-full fixed z-50 top-0 shadow-md bg-white py-6 px-2 md:px-10">
      {
        !isAuth? (
          <div className="flex flex-col justify-center items-center  space-y-2">
        <span className="flex items-center justify-center space-x-4">
            <img
             src="/logo.png"
             alt="logo" 
             className="w-8 md:w-12"
             />
            <h1 className="text-blue-600 font-semibold text-xl">Welcome to Messenger!</h1>
        </span>
        <button 
        onClick={signInWithGoogle}
        className="btn px-6 py-2 bg-blue-600 text-white font-bold hover:bg-blue-400"
        >
          Login
        </button>
        </div>
        ):(
          <div className="flex items-center justify-between">
            <div className="flex space-x-4 items-center">
            <img
            className="w-16 rounded-full " 
            src={auth.currentUser?.photoURL!} 
            alt="pfp"
             />
            <span>
              <h3 className="text-blue-600 font-medium">Loggined as :</h3>
              <h2 className="font-semibold text-lg text-center">{auth.currentUser?.displayName}</h2>
            </span>
          </div>
          <div className="">
            <button 
            onClick={signUserOut}
            className="btn px-3 md:px-6 py-2 bg-blue-600 text-white font-bold hover:bg-blue-400"
            >
              Logout
            </button>
          </div>
          </div>
        )
      }
    </header>
  )
}

export default Header