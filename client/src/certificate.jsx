import React, { useCallback, useRef, useState }  from "react";

import certificate from "./../public/images/certificate.jpg";
import './certificate.css';
import { toPng } from 'html-to-image';




function Certificate() {
    const ref = useRef(null)
    const[name, setName] = useState('')
    const [event, setEvent] = useState('')
    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
          return
        }
    
        toPng(ref.current, { cacheBust: true, })
          .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'certificate.png'
            link.href = dataUrl
            link.click()
          })
          .catch((err) => {
            console.log(err)
          })
      }, [ref])
  return (
    
    <div>
        
        <input type="text" placeholder="name"  value={name} onChange={(e) =>{
            setName(e.target.value)
        }}/>
        <input type="text" placeholder="event"  value={event} onChange={(e) =>{
            setEvent(e.target.value)
        }}/>
      <div className="container" ref={ref}>
        <img src={certificate} alt="" />
        <div className="content">
          <h1>{name}</h1>
          <span className="event">{event}</span>
          <div className="date">12/02/2024</div>
        </div>
      </div>
      <button onClick={onButtonClick}>Click me</button>
    </div>
  );
}

export default Certificate;
