import React from 'react';

const ShowcaseTitle = ({ title, subtitle, subtitlestyle, titlestyle }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <span style={titlestyle}>
        <h1>{title}</h1>
        <span className="line"></span>
      </span>
      <span style={subtitlestyle}>{subtitle}</span>
    </div>
  );
};

export default ShowcaseTitle;
