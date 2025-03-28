import React from 'react';

// This component renders a beach-themed avatar since we can't directly use the image file
const BeachProfileImage: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: '#f0d9b5', // sandy color
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Sky at the top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to bottom, #8acdff, #b5e2ff)',
          zIndex: 1
        }}
      />
      
      {/* Ocean */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, #1e88e5, #0d47a1)',
          zIndex: 2
        }}
      />
      
      {/* Beach */}
      <div
        style={{
          position: 'absolute',
          bottom: '33%',
          left: 0,
          right: 0,
          height: '15%',
          backgroundColor: '#e0c49d',
          zIndex: 3
        }}
      />
      
      {/* Person silhouette */}
      <div
        style={{
          position: 'absolute',
          bottom: '38%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20%',
          height: '15%',
          backgroundColor: '#333',
          zIndex: 4
        }}
      />
    </div>
  );
};

export default BeachProfileImage; 