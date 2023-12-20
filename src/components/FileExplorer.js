import React, { useState } from 'react';
import Folder from './Folder';
import { FaFolderPlus, FaFileAlt } from 'react-icons/fa';

const initialData = {
  Documents: [
    "Document1.jpg",
    "Document2.jpg",
    "Document3.jpg"
  ],
  Desktop: [
    "Screenshot1.jpg",
    "videopal.mp4"
  ],
  Downloads: {
    Drivers: [
      "Printerdriver.dmg",
      "cameradriver.dmg"
    ]
  },
  Applications: [
    "Webstorm.dmg",
    "Pycharm.dmg",
    "FileZila.dmg",
    "Mattermost.dmg"
  ],
  Images: [
    "chromedriver.dmg"
  ]
};

const FileExplorer = () => {
  const [data, setData] = useState(initialData);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');

  const handleAddFile = (folder, fileName) => {
    const newData = { ...data };
    if (Array.isArray(newData[folder])) {
      newData[folder].push(fileName);
    } else {
      newData[folder] = [fileName];
    }
    setData(newData);
  };

  const handleDeleteFile = (folder, fileName) => {
    const newData = { ...data };
    newData[folder] = newData[folder].filter(file => file !== fileName);
    setData(newData);
  };

  const handleAddFolder = (folder, newFolderName) => {
    const newData = { ...data };
    newData[newFolderName] = [];
    setData(newData);
  };

  const handleDeleteFolder = (folder) => {
    const newData = { ...data };
    delete newData[folder];
    setData(newData);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleAddFolder('', newFolderName)}>
          <FaFolderPlus /> Add Folder
        </button>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={() => handleAddFile('', newFileName)}>
          <FaFileAlt /> Add File
        </button>
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
      </div>
      {Object.keys(data).map((key) => (
        <Folder
          key={key}
          name={key}
          content={data[key]}
          onAddFile={handleAddFile}
          onDeleteFile={handleDeleteFile}
          onAddFolder={handleAddFolder}
          onDeleteFolder={handleDeleteFolder}
        />
      ))}
    </div>
  );
};

export default FileExplorer;
