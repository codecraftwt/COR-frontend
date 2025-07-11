import React from 'react';

const SegmentedProgressBar = ({ steps = 5, activeStep = 2 }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      margin: '24px 0'
    }}>
      {[...Array(steps)].map((_, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            height: '6px',
            borderRadius: '8px',
            background: idx < activeStep
              ? 'linear-gradient(90deg,rgb(171, 233, 252) 0%,rgb(155, 194, 249) 100%)'
              : 'linear-gradient(90deg, #e0e7ef 0%, #e0e7ef 100%)',
            transition: 'background 0.3s'
          }}
        />
      ))}
    </div>
  );
};

export default SegmentedProgressBar;



