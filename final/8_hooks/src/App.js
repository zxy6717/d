import React, { useState } from "react";
import './App.css';

const App = ()=>{
  const [count,setCount] = useState(0);

  return (
    <>
    <div className="container">
      <p> Current Click Count: {count}</p>
      <button onClick={()=>setCount(count+1)}>Click Me</button>
    </div>
    </>
  )
}

export default App;