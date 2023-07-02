import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase';

const Footer = () => {

  const[input,setInput] = useState('')
  const id = uuid()
  const collectionRef = collection(db,"messages")

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      
      e.preventDefault();
      if(!input) return;
      await addDoc(collectionRef,{
        id,
        email: auth?.currentUser?.email,
        userName: auth.currentUser?.displayName,
        text: input,
        // createdAt: serverTimestamp(),
        createdAt : Date.now(),
        image: auth?.currentUser?.photoURL,
      })
      setInput('')

    }
    
  return (
    <footer>
      <form 
      onSubmit={handleSubmit}
      className="flex fixed bottom-0 w-full py-4 px-3 md:px-6 space-x-2 md:space-x-4 border-black/10 border-t z-50 bg-white"
      >
      <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="flex-1 p-2 input rounded-sm input-bordered focus:outline-blue-600"
      placeholder="Enter your message...."
      type="text"
       />
       <button 
       disabled={!input}
       className="btn bg-blue-600 hover:bg-blue-400 text-white font-bold disabled:bg-blue-400 disabled:text-white"
       >
        Send
       </button>
       </form>
    </footer>
  )
}

export default Footer