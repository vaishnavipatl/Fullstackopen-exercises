import React from 'react'

function Notification({meassage ,msgtype}) {
    if(!meassage){
        return null
    }
  return (
    <div className={`notification ${msgtype}`}>
      {meassage}
    </div>
  )
}

export default Notification
