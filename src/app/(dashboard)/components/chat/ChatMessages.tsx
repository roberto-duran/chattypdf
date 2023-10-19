'use client'

import {Message} from "@/db/models/messages";

type Props = {
  messages: Message[]
}

export default function ChatMessages({messages}: Props) {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className={`chat ${message.author === 'system'? 'chat-start' : 'chat-end' }`}>
         <div className={`chat-bubble ${message.author === 'user' && 'bg-teal-600'} text-white`}>
           {message.text}
         </div>
       </div>
      ))}
    </div>
  );
};
