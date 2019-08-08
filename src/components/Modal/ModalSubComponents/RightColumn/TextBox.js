import React from 'react';

const TextBox = (props) => {
  return(
    <div>
      <textarea
        className='text-area'
        value={props.value}
        texttype={props.textType}
        onChange={props.handleChange}
        onSubmit={props.onSubmit}>
      </textarea >
    </div>
)};

export default TextBox;
