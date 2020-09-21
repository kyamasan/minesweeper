import React from 'react';

export default function Circle() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div
        style={{
          height: 23,
          width: 23,
          borderRadius: 20,
          background: 'rgba(0,0,0,0.4)',
        }}
      ></div>
    </div>
  );
}
