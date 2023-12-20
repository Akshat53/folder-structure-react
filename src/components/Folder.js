import React, { useState } from 'react';
import { FaFolderPlus, FaFileAlt, FaTimes } from 'react-icons/fa';

const Folder = ({ name, content, onAddFile, onDeleteFile, onAddFolder, onDeleteFolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const handleAddFile = () => {
    if (newFileName.trim() !== '') {
      onAddFile(name, newFileName);
      setNewFileName('');
    }
  };

  const handleDeleteFile = (fileName) => {
    onDeleteFile(name, fileName);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim() !== '') {
      onAddFolder(name, newFolderName);
      setNewFolderName('');
    }
  };

  const handleDeleteFolder = () => {
    onDeleteFolder(name);
  };

  return (
    <div>
      <div onClick={toggleFolder} style={{ cursor: 'pointer' }}>
        {isOpen ? '▼ ' : '▶ '} {name}
      </div>
      {isOpen && (
        <div style={{ marginLeft: '20px' }}>
          {Array.isArray(content) && content.map((file, index) => (
            <div key={index}>
              {file}{' '}
              <span onClick={() => handleDeleteFile(file)} style={{ cursor: 'pointer' }}>
                <FaTimes />
              </span>
            </div>
          ))}
          {!Array.isArray(content) && Object.keys(content).map((key) => (
            <Folder
              key={key}
              name={key}
              content={content[key]}
              onAddFile={onAddFile}
              onDeleteFile={onDeleteFile}
              onAddFolder={onAddFolder}
              onDeleteFolder={onDeleteFolder}
            />
          ))}
          <div>
            <button onClick={handleAddFile}>
              <FaFileAlt /> Add File
            </button>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleAddFolder}>
              <FaFolderPlus /> Add Folder
            </button>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <span onClick={handleDeleteFolder} style={{ cursor: 'pointer', marginLeft: '10px' }}>
              <FaTimes />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
