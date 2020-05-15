import React from 'react'
import './button.css'

export default props =>{
  let classes = 'button ';
  classes += props.operation ? 'operation' : '';
  classes += props.double ? 'double' :'';
  classes += props.triple ? ' triple' : '';

  return (
     <button
      className={classes} onClick={e => props.click && props.click(props.label)}
      // className={`
      //   button
      //   ${props.operation ? 'opeation' : ''}
      //   ${props.double ? 'double' : ''}
      //   ${props.triple ? 'triple' : ''}
      // `}
    >
      {props.label}
    </button>
  )

}

