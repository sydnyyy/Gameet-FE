// import { KeyboardEvent } from "react";

// interface InputFieldProps {
//   input: string;
//   setInput: (value: string) => void;
//   onSend: () => void;
// }

// const InputField = ({ input, setInput, onSend }: InputFieldProps) => {
//   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       onSend();
//     }
//   };

//   return (
//     <div className="flex mt-auto gap-2">
//       <input
//         type="text"
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         onKeyDown={handleKeyPress}
//         placeholder="메시지를 입력하세요"
//         className="flex-1 border border-gray-400 rounded px-4 py-2 text-black"
//       />
//       <button
//         onClick={onSend}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         전송
//       </button>
//     </div>
//   );
// };

// export default InputField;
