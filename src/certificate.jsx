import React, { useCallback, useRef, useState }  from "react";

import certificate from "./../public/images/certificate.jpg";
import './certificate.css';
import { toPng } from 'html-to-image';
import Button from '@mui/material/Button';






function Certificate() {
    const ref = useRef(null)
    const[name, setName] = useState('')
    const [event, setEvent] = useState('')
    const [date, setDate] = useState('')
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
    
    <div className="container m-5 items-center ">
        
        {/* <input type="text" placeholder="name"  value={name} onChange={(e) =>{
            setName(e.target.value)
        }}/>
        <input type="text" placeholder="event"  value={event} onChange={(e) =>{
            setEvent(e.target.value)
        }}/>
        <input type="text" placeholder="date"  value={date} onChange={(e) =>{
            setDate(e.target.value)
        }}/> */}
      <div className="container p-6" ref={ref}>
        {/* <h1 className="text-white font-bold text-lg">Create a certificate now</h1> */}
        <img src={certificate} alt="" />
        <div className="content">
          <h1>divyansh dubey</h1>
          <span className="event-date flex  items-center">
          <span className="event">{event}lken;sf</span>
          <span className="date">{date}laknfd;a</span>
          </span>
        </div>
      </div>
      <Button variant="contained"  onClick={onButtonClick}>Download </Button>
    </div>
  );
}

export default Certificate;
