import React from 'react';

function header(props) {
  return (
    <div className={'container'}>
      <h3 className={'header'}>
        <i className="fas fa-dollar-sign"></i>
        {props.text}
      </h3>
    </div>
  );
}

export default header;
