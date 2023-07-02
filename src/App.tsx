import Cookies from "universal-cookie";
import { Footer, Header, MessageLists } from "./components";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase/firebase";
import {useState} from 'react'

export default function App() {

  const cookie = new Cookies()
  const[isAuth,setIsAuth] = useState(cookie.get('auth-token'))

  const signInWithGoogle = async() => {
    const data = await signInWithPopup(auth,provider)
    cookie.set('auth-token',data.user.refreshToken)
    setIsAuth(true)
  }
  
  return (
    <div className="max-h-screen ">
      <Header isAuth={isAuth} setIsAuth={setIsAuth} />
      {
        !isAuth? (
          <div className="flex absolute top-1/2 justify-center items-center w-full space-x-2">
            <img 
            className="w-10"
            src="/logo.png" 
            alt="logo"
             />
            <button 
            onClick={signInWithGoogle}
            className="font-bold text-blue-600 text-3xl animate-pulse"
            >
              Login to Continue
            </button>
          </div>
        ):(
          <>
            <MessageLists />
            <Footer />
          </>
        )
      }
      
    </div>
  )
}
