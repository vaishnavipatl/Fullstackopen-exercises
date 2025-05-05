import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from 'prop-types'


const Toggle= forwardRef((props , ref)=>{
  const[visible , setVisible]=useState(false)

  const toggleVisibilty = ()=>{
    setVisible(!visible)
  }

  useImperativeHandle(ref , ()=>{
    return{
      toggleVisibilty
    }
  })
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibilty}>{props.buttonlabel}</button>
      </div>
      <div style={showWhenVisible} className="toggleContent">
        {props.children}
        <button onClick={toggleVisibilty}>Cancel</button>
      </div>
    </div>
  )
})

Toggle.propTypes ={
  buttonlabel : PropTypes.string.isRequired
}
export default Toggle
