import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
let [length, setLength] = useState(8)
let [copied, setCopied] = useState(false);
let [numberAllowed , setNumberAllowed] = useState(false);
let [charAllowed , setCharAllowed] = useState(false);
let [password , setPassword] = useState("");
const passwordRef = useRef(null);
let passwordGenerator = useCallback(() => {

  let pass = "";
  let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  if(numberAllowed) str+="0123456789";
  if(numberAllowed) str+="!@$%^&*_-/";
  for(let i=1 ; i<=length; i++){
    let char = Math.floor(Math.random()*str.length);
    pass += str.charAt(char);
  }
  setPassword(pass);
},[length , numberAllowed, charAllowed , setPassword])


const copypasswordtoclipboard = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);
 setCopied(true);

},[password])

useEffect( passwordGenerator ,[length, numberAllowed,charAllowed] );


  return (
    <>
    <div className='w-full bg-gray-700 px-4 my-8 max-w-md mx-auto rounded-2xl'>
      <h1 className='text-center text-white'>password Generator</h1>
      <div className='flex  shadow rounded-lg mb-4 overflow-hidden'>
        <input 
        ref= {passwordRef}
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3 mt-2 bg-white placeholder:text-center  '
        placeholder='password'
        readOnly
         />
         <button className='outline-none bg-blue-500 mt-2 w-20 text-white'onClick={copypasswordtoclipboard} >{ copied ? "Copied!" : "Copy"}</button>
      </div>
<div className='flex text-sm gap-x-2 text-orange-400'>
  <div className='flex
  items-center gap-x-1'>
    <input 
    type="range"
    min={6}
    max={100}
    value = {length}
    className='cursor-pointer'
    onChange={(e)=>{
      setLength(e.target.value)
    }}/>
    <label>Length : {length}</label>
  </div>

<div  >
 
  <input 
  type="checkbox"
  defaultChecked= {numberAllowed}
  onChange={() => setNumberAllowed((prev) => !prev)}
  id='num'
  />
     <label htmlFor='num' >Numbers </label>

</div>
<div>
 
  <input 
  type="checkbox"
  defaultChecked= {charAllowed}
  onChange={() => setCharAllowed((prev) => !prev)}
  id='ch'
  />
     <label htmlFor='ch' >character</label>

</div>
</div>
    </div>
     
    </>
  )
}

export default App
