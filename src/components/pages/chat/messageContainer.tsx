// import { ChatMessage } from "./chatRoom";

// interface MessageContainerProps {
//   messages: ChatMessage[];
//   selfId: number;
// }

// const MessageContainer = ({ messages, selfId }: MessageContainerProps) => {
//   return (
//     <div className="h-[700px] overflow-y-auto ...">
//       {messages.map((msg, idx) => {
//         const isMine = msg.matchParticipantId === selfId;

//         return (
//           <div key={idx} className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
//             <div
//               className={`max-w-xs px-3 py-2 rounded-lg ${
//                 isMine
//                   ? "bg-blue-500 text-white rounded-br-none"
//                   : "bg-gray-200 text-black rounded-bl-none"
//               }`}
//             >
//               {!isMine && (
//                 <div className="text-sm font-semibold mb-1">
//                   {msg.nickname || msg.matchParticipantId}
//                 </div>
//               )}
//               <div className="text-sm">{msg.content}</div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MessageContainer;
