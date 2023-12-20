import React from 'react';

const File = ({ name, files }) => {
  return (
    <div className="file">
      {files.map((file, index) => (
        <div key={index}>{file}</div>
      ))}
    </div>
  );
};

export default File;
