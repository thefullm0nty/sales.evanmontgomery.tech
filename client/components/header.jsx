import React from 'react';

function header (props) {
  return (
    <div className={'container'}>
      <h3 className={'header'}>{props.text}</h3>
    </div>
  );
}

export default header;
