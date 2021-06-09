
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {useEffect,useState } from 'react'
import Pusher from 'pusher-js'

import axios from './axios'
function App() {
  const [messages,setMessages]=useState([])
  useEffect(() => {
    axios.get("/messages/sync")
    .then(response=>{
  
      setMessages(response.data)
    })
    
  }, [])
  useEffect(() => {
    var pusher = new Pusher('0440dbd8eb3b5825e51d', {
      cluster: 'ap2'
    });
    console.log("messages=",messages)
    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
        console.log("before",messages)
        setMessages([...messages,newMessage])
        console.log("message",newMessage)
        console.log("after",messages)
    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  //  console.log(messages)
    return (
      <div className="app" >
        <div className="app__body">
        <Sidebar />
        <Chat  messages={messages} />
        </div>


      </div>
    )

}

export default App;
