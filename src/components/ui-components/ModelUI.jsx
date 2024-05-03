import React, { useCallback, useRef, useState } from "react";
import * as THREE from 'three';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useModelCustomization } from "../../editor/ModelCustomizer";

const ModelUI = () => {
    const { selectedModel, setSelectedModel, setCoverTexture, setLeftPageTxt, setRightPageTxt, setPositionX, setPositionZ, setPositionY, setRotation, spiralColors, spiralColor, setSpiralColor, bandColors, bandColor, setBandColor, setBandTexture, frameColors, frameColor, setFrameColor } = useModelCustomization();
    const closedModelRef = useRef();
    const openModelLeftRef = useRef();
    const openModelRightRef = useRef();


    const handleClosedModelClick = () => {
      closedModelRef.current.click();
    };

    const handleOpenModelLeftClick = () => {
      openModelLeftRef.current.click();
    };

    const handleOpenModelRightClick = () => {
      openModelRightRef.current.click();
    };

    const handleModelChange = (model) => {
      console.log('Model changed to:', model);
        setSelectedModel(model);
      };

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

    const handleFileUploadOpen = async (e, page) => {
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
              if (page === 'Left') {
                setLeftPageTxt(new THREE.TextureLoader().load(dataUrl));
              } else if (page === 'Right') {
                setRightPageTxt(new THREE.TextureLoader().load(dataUrl));
              }
            } catch (error) {
              console.error('Error handling file', error);
            }
          } else {
            console.error('Unsupported file extension:', extension);
          }
        }
      };

      const handleRotationChange = useCallback((newRotation) => {
        setRotation(newRotation);
        let yState = 15;

        if (newRotation.y === -Math.PI / 2 && newRotation.z === -Math.PI / 2) {
          // Standing
          yState = 15; // Adjust as necessary
        } else if (newRotation.y === 80 * (-Math.PI / 180)) {
          // Laying
          yState = 10.1; // Adjust as necessary for laying down position
        } else if (newRotation.x === Math.PI / 6) {
          // Tilting
          yState = 12.5; // Adjust as necessary for tilting position
        }
        setPositionY(yState);

      }, [setRotation, setPositionY]);
    
      const handlePositionX = (delta) => {
        setPositionX(prevX => Math.max(-15, Math.min(15, prevX + delta)));
      };
    
      const handlePositionZ = (delta) => {
        setPositionZ(prevZ => Math.max(-10, Math.min(8, prevZ + delta)));
      };
    
      const handleSpiralColor = (color) => {
        if (setSpiralColor) {
          setSpiralColor(color);
        }
      }
    
      const handleBandColor = (color) => {
        if (color.texture) {
          setBandTexture(color.texture);
          setBandColor({ ...color, color: color.displayColor })
        } else {
          setBandTexture(null);
          setBandColor({ ...color, color: color.displayColor })
        }
      }

      const handleFrameColor = (color) => {
        if (setFrameColor) {
          setFrameColor(color);
        }
      }

      return (
        <div className="model-ui my-5">
        <div className="d-flex column">
          <Button className="mx-1 my-4 w-100" onClick={() => handleModelChange('Closed')}>Stängd</Button>
          <Button className="mx-1 my-4 w-100" onClick={() => handleModelChange('Open')}>Öppen</Button>
        </div>
          <Container className='my-4 d-flex column'>
            <Button className="mx-1 w-100" onClick={() => handleRotationChange({ x: 0, y: -Math.PI / 2, z: -Math.PI / 2 })}>Står</Button>
            <Button className="mx-1 w-100" onClick={() => handleRotationChange({ x: 0, y: 80 * (-Math.PI / 180), z: 0 })}>Liggande</Button>
            <Button className="mx-1 w-100" onClick={() => handleRotationChange({ x: Math.PI / 6, y: -Math.PI / 2, z: 0 })}>Lutning</Button>
          </Container>
          <div className='model-tab-title my-4'>Position</div>
          <Form.Group className="arrow-keys-container">
                <div></div>
                <Button className="arrow-button" onClick={() => handlePositionZ(-1)}>+</Button>
                <div></div>
                <Button className="arrow-button" onClick={() => handlePositionX(-1)}>-</Button>
                <Button className="arrow-button" onClick={() => handlePositionZ(1)}>-</Button>
                <Button className="arrow-button" onClick={() => handlePositionX(1)}>+</Button>
          </Form.Group>          
            <div className='model-tab-title my-4'>Spiral</div>
            <div className="model-tab-config my-4">
          {spiralColors.map((hex, index) => (
            <div
              key={index}
              className={`trait ${
                hex.color === spiralColor.color ? "trait-spec" : ""
              }`}
              onClick={() => handleSpiralColor(hex)}
            >
              <div
                className="trait-box"
                style={{ backgroundColor: hex.color }}
              />
            </div>
          ))}
        </div>
        {selectedModel !== 'Closed' && (
          <>
        <div className='model-tab-title my-4'>Ram</div>
            <div className="model-tab-config my-4">
          {frameColors.map((hex, index) => (
            <div
              key={index}
              className={`trait ${
                hex.color === frameColor.color ? "trait-spec" : ""
              }`}
              onClick={() => handleFrameColor(hex)}
            >
              <div
                className="trait-box"
                style={{ backgroundColor: hex.color }}
              />
            </div>
          ))}
        </div>
        </>
        )}
        {/* if the selectedModel is 'Closed', render the following UI components */}
        {selectedModel !== 'Open' && (
          <>
        <div className='model-tab-title my-4'>Gummiband</div>
            <div className="model-tab-config my-4">
          {bandColors.map((hex, index) => (
            <div
              key={index}
              className={`trait ${
                hex.displayColor === bandColor.displayColor ? "trait-spec" : ""
              }`}
              onClick={() => handleBandColor(hex)}
            >
              <div
                className="trait-box"
                style={{ backgroundColor: hex.displayColor }}
              />
            </div>
          ))}
        </div>
        </>
        )}
          {/* Other configurator UI components */}
          <div className="controls-container">
            <Button className="my-4 btn-secondary" onClick={handleClosedModelClick} disabled={selectedModel !== 'Closed'}>Choose Front Cover</Button>
            <input
              type="file"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              ref={closedModelRef}
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
          <div className="controls-container open-product">
            <Button className="my-4 btn-secondary" onClick={handleOpenModelLeftClick} disabled={selectedModel !== 'Open'}>Choose Left Page</Button>
            <input
              type="file"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              ref={openModelLeftRef}
              onChange={(e) => handleFileUploadOpen(e, 'Left')}
            />
          </div>
          <div className="controls-container open-product">
            <Button className="my-4 btn-secondary" onClick={handleOpenModelRightClick} disabled={selectedModel !== 'Open'}>Choose Right Page</Button>
            <input
              type="file"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              ref={openModelRightRef}
              onChange={(e) => handleFileUploadOpen(e, 'Right')}
            />
            </div>
        </div>
      )
    };

export default ModelUI;
