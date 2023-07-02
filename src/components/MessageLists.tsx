import { collection, onSnapshot } from 'firebase/firestore'
import TimeAgo from 'react-timeago'
import { useEffect,useState} from 'react'
import { auth, db } from '../firebase/firebase'

const MessageLists = () => {
    const collectionRef = collection(db,'messages')
    const[allMessages,setAllMessages] = useState<Msg[]>([])
    useEffect(()=>{
        const getMessages = async() => {
           onSnapshot(collectionRef,(snapshot) => {
            const messages: Message = []
            snapshot.docs.map((doc) => {
                messages.push({...doc.data()})
            })
            // console.log(messages);
            const filteredArray = messages.sort((a: { createdAt: number }, b: { createdAt: number }) => (b.createdAt-a.createdAt))
            // console.log(filteredArray);
            setAllMessages(filteredArray)
           })
        }
        getMessages()
    },[])
    
  return (
    <div className='relative px-4 md:px-20 mt-16 mb-32 py-24'>
        {
            allMessages?.map(msg => (
                <div key={msg.id} className={`chat ${msg.email === auth.currentUser?.email ? 'chat-start' : 'chat-end'}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src={msg.image} />
                  </div>
                </div>
                <div className="chat-header font-bold">
                    {msg.userName}
                </div>
                <div className={`chat-bubble ${msg.email === auth.currentUser?.email ? 'bg-blue-600' : 'bg-red-600'}`}>{msg.text}</div>
                <div className="chat-footer opacity-50">
                <time className="text-xs opacity-50">
                    <TimeAgo date={new Date(msg.createdAt)} />
                  </time>
                </div>
              </div>
            )
        )}
    </div>
  )
}

export default MessageLists