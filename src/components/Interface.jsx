import { useState } from 'react';
import { useCustomization } from '../editor/Customize';

const Interface = () => {
    const { setCoverTexture, setSpiralColor } = useCustomization();

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        // You can perform additional actions with the uploaded file here
        if (setCoverTexture) {
          setCoverTexture(URL.createObjectURL(file));
        }
      }
    };

    const handleColorChange = (e) => {
      if (setSpiralColor) {
        setSpiralColor(e.target.value);
      }
    }
  
    const handleTextChange = (e) => {
      const textValue = e.target.value;
      console.log('Text entered:', textValue);
      // You can perform additional actions with the entered text here
    };
  
    return (
      <div className="interface">
        {/* File upload input for cover texture */}
        <label htmlFor="file-upload">Choose a file:</label>
        <input type="file" id="file-upload" accept=".jpg, .jpeg, .png" onChange={handleFileUpload} />
    
        {/* Color picker for Spiral color */}
        <label>Choose Spiral color:</label>
        <input type="color" onChange={handleColorChange} />
    
        {/* Other configurator UI components */}
        <div className="controls-container">
          {/* <label htmlFor="file-upload">Choose a file:</label>
          <input
            type="file"
            id="file-upload"
            accept=".jpg, .jpeg, .png" // Adjust accepted file types as needed
            onChange={handleFileUpload}
          /> */}
    
          <label htmlFor="text-input">Enter text:</label>
          <input
            type="text"
            id="text-input"
            placeholder="2024..."
            onChange={handleTextChange}
          />
    
          <button className="config-button" onClick={() => console.log('Button clicked')}>
            Click me
          </button>
        </div>
      </div>
    );
  };

  export default Interface;