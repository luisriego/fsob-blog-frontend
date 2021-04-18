import { useEffect, useState } from "react"

const Notification = ({ message }) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    if (message[0] === null || message[0] === '') {
      return null
    }
    setShow(true)
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 5000)
    
    return () => {
      clearTimeout(timeId)
    }
  }, [message]);

  if (!show) {
    return null;
  }

  return (
    <div className={message[1]}>
      {message[0]}
    </div>
  )
}

export default Notification

