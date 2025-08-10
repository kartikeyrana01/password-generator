import { useState, useCallback, useEffect, useRef } from 'react'


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
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@$%^&*_-/";
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copypasswordtoclipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // reset copied after 1.5 sec
  }, [password]);

  useEffect(passwordGenerator, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div className="w-full max-w-md mx-auto mt-12 p-6 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl shadow-lg text-white font-sans">
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">Password Generator</h1>

        <div className="flex shadow-md rounded-lg overflow-hidden mb-6 bg-white">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            placeholder="Your password"
            className="flex-grow px-4 py-3 text-gray-900 font-mono text-lg outline-none"
          />
          <button
            onClick={copypasswordtoclipboard}
            className={`w-24 text-white font-semibold transition-colors duration-300 ${
              copied ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* Length Slider */}
          <div className="flex items-center gap-4">
            <label htmlFor="lengthRange" className="flex-shrink-0 text-lg font-medium">
              Length:
            </label>
            <input
              id="lengthRange"
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="flex-grow cursor-pointer accent-indigo-500"
            />
            <span className="w-10 text-right font-semibold">{length}</span>
          </div>

          {/* Checkboxes */}
          <div className="flex justify-between text-lg font-medium">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="accent-indigo-500"
              />
              Numbers
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="accent-indigo-500"
              />
              Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
