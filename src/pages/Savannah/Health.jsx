/* eslint-disable react/prop-types */
import React from 'react';

export default function Health({ health }) {
  return (
    <div style={{ border: '1px solid red', display: 'flex' }}>
      {new Array(health).fill(<div>{'<3'}</div>)}
    </div>
  );
}
