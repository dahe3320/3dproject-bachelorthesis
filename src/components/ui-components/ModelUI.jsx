import React, { useCallback, useRef, useState } from "react";
import * as THREE from 'three';
import { Button, Container, Row, Col, Image, Form } from "react-bootstrap";
import { useModelCustomization } from "../../editor/ModelCustomizer";
import Test from "../Test";
import OpenProduct from "../OpenProduct";

const ModelUI = () => {
    const { selectedModel, setSelectedModel } = useModelCustomization();
    const { setCoverTexture, setPositionX, setPositionZ, setPositionY, setRotation, spiralColors, spiralColor, setSpiralColor, bandColors, bandColor, setBandColor } = useModelCustomization();
    const fileInputRef = useRef();


    const handleClick = () => {
        fileInputRef.current.click();
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

      const handleRotationChange = useCallback((newRotation) => {
        setRotation(newRotation);
        console.log('Rendered');
        let yState = 15;

        if (newRotation.y === -Math.PI / 2 && newRotation.z === -Math.PI / 2) {
          // Standing
          yState = 15; // Adjust as necessary
        } else if (newRotation.y === 80 * (-Math.PI / 180)) {
          // Laying
          yState = 10.2; // Adjust as necessary for laying down position
        } else if (newRotation.x === Math.PI / 6) {
          // Tilting
          yState = 12.5; // Adjust as necessary for tilting position
        }
        setPositionY(yState);

      }, [setRotation, setPositionY]);
    
      const handlePositionX = (e) => {
        if (setPositionX) {
          setPositionX(e.target.value);
        }
      };
    
      const handlePositionZ = (e) => {
        if (setPositionZ) {
          setPositionZ(e.target.value);
        }
      };
    
      const handleSpiralColor = (color) => {
        if (setSpiralColor) {
          setSpiralColor(color);
        }
      }
    
      const handleBandColor = (color) => {
        if (setBandColor) {
          setBandColor(color);
        }
      }

      return (
        <div className="model-ui">
        <div>
          <Button onClick={() => handleModelChange('Closed')}>Model A</Button>
          <Button onClick={() => handleModelChange('Open')}>Model B</Button>
        </div>
        <div className='pick-model-container'>
            <Container>
              <Row>
                <Col>
                  <Image src="https://via.placeholder.com/100" rounded />
                  <h6>A5</h6>
                </Col>
                <Col>
                  <Image src="https://via.placeholder.com/100" rounded />
                  <h6>A6</h6>
                </Col>
              </Row>
            </Container>
          </div>
          <Container className='my-4 d-flex column'>
            <Button className="mx-1 w-100 btn-secondary" onClick={() => handleRotationChange({ x: 0, y: -Math.PI / 2, z: -Math.PI / 2 })}>Standing</Button>
            <Button className="mx-1 w-100 btn-secondary" onClick={() => handleRotationChange({ x: 0, y: 80 * (-Math.PI / 180), z: 0 })}>Laying</Button>
            <Button className="mx-1 w-100 btn-secondary" onClick={() => handleRotationChange({ x: Math.PI / 6, y: -Math.PI / 2, z: 0 })}>Tilting</Button>
          </Container>
          <Col className="my-4 column">
            <Row className="d-flex">
            <Form.Label className="w-auto">X:</Form.Label>
            <Form.Range
            size='lg'
            onChange={(e) => handlePositionX(e)}
            min={-15}
            max={15}
            step={1}
            defaultValue={0}
            style={{ width: "80%" }} 
            />
            </Row>
            <Row className="d-flex">
            <Form.Label className="w-auto">Z:</Form.Label>
            <Form.Range
            size='lg'
            onChange={(e) => handlePositionZ(e)}
            min={-10}
            max={8}
            step={1} 
            defaultValue={0}
            style={{ width: "80%" }}
            />
            </Row>
          </Col>          
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
        <div className='model-tab-title my-4'>Gummiband</div>
            <div className="model-tab-config my-4">
          {bandColors.map((hex, index) => (
            <div
              key={index}
              className={`trait ${
                hex.color === bandColor.color ? "trait-spec" : ""
              }`}
              onClick={() => handleBandColor(hex)}
            >
              <div
                className="trait-box"
                style={{ backgroundColor: hex.color }}
              />
            </div>
          ))}
        </div>
          {/* Other configurator UI components */}
          <div className="controls-container">
            <Button className="my-4 btn-secondary" onClick={handleClick}>Choose Front Cover</Button>
            <input
              type="file"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
        </div>
      )
    };

export default ModelUI;
