import { useEffect, useState } from 'react';
import { useCustomization } from '../editor/Customize';
import * as THREE from 'three';

const Interface = () => {
    const { setCoverTexture, setSpiralColor } = useCustomization();
    
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const filename = file.name;
        const extension = filename.split('.').pop().toLowerCase();
    
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
          try {
            const dataUrl = URL.createObjectURL(file);
            // Handle JPG/PNG data URL
            console.log('Handling JPG data URL', dataUrl);
            // Example: set data URL as coverTexture
            setCoverTexture(new THREE.TextureLoader().load(dataUrl));
          } catch (error) {
            console.error('Error handling file', error);
          }
        } else {
          console.error('Unsupported file extension:', extension);
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
        {/* Color picker for Spiral color */}
        <label>Choose Spiral color:</label>
        <input type="color" onChange={handleColorChange} />
    
        {/* Other configurator UI components */}
        <div className="controls-container">
          <label htmlFor="file-upload">Choose a file:</label>
          <input
            type="file"
            id="file-upload"
            accept=".jpg, .jpeg, .png" // Adjust accepted file types as needed
            onChange={handleFileUpload}
          />
    
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