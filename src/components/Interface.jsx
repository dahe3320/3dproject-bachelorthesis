import React, { useCallback, useRef, useState } from 'react';
import { Button, Carousel, Tabs, Tab, Container, Row, Col, Image, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useModelCustomization } from '../editor/ModelCustomizer';
import { useEnviromentCustomization } from '../editor/EnviromentCustomizer';
import * as THREE from 'three';
import html2canvas from 'html2canvas';
import Props from './Props';


const Interface = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [groundIndex, setGroundIndex] = useState(0);
  const [propsIndex, setPropsIndex] = useState(0);

  const { 
    setCoverTexture,
    setPositionX,
    setPositionZ,
    spiralColors,
    spiralColor, 
    setSpiralColor,
    bandColors,
    bandColor,
    setBandColor, 
    setTextValue, 
    setTextColor, 
  } = useModelCustomization();

  const { backgroundImages, setBackgroundImage, groundTxts, setGroundTxt } = useEnviromentCustomization();


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

  const handleTextChange = (e) => {
    if (setTextValue) {
      setTextValue(e.target.value);
    }
  };

  const handleTextColor = (e) => {
    if (setTextColor) {
      setTextColor(e.target.value);
    }
  }

  const handleBackground = (selectedIndex) => {
    setBackgroundIndex(selectedIndex);
    console.log('selectedIndex', selectedIndex);
    setBackgroundImage(backgroundImages[selectedIndex]);
  }

  const handleGround = (usedIndex) => {
    if (usedIndex !== groundIndex) {
    setGroundIndex(usedIndex);
    console.log('usedIndex', usedIndex);
    setGroundTxt(groundTxts[usedIndex]);
    }
  }

  const handleScreenshot = useCallback(() => {
    const capture = document.getElementById('canvas-container');
    html2canvas(capture).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.setAttribute('download', 'canvas.png');
      link.setAttribute('href', dataUrl);
      link.click();
    });
  }, []);

  return (
    <div className="interface" data-bs-theme='dark'>
      <Tabs defaultActiveKey="Kalender" id="configurator-tab" className="mb-3" style={{ fontSize: '10px', fontWeight: '800'}}>
        <Tab eventKey="Kalender" title="KALENDER">
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
          <Form.Group className="mb-3 d-flex align-items-center">
            <Form.Label className='mx-2'>X:</Form.Label>
            <Form.Control 
            type="number" 
            size='sm'
            onChange={(e) => handlePositionX(e)} 
            style={{ width: '20%' }} />
            <Form.Label className='mx-2'>Z:</Form.Label>
            <Form.Control 
            type="number" 
            size='sm'
            onChange={(e) => handlePositionZ(e)} 
            style={{ width: '20%' }} />
          </Form.Group>
          {/* Color picker for Spiral color */}
          
            <div className='model-tab-title'>Spiral</div>
            <div className="model-tab-config">
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
        <div className='model-tab-title'>Gummiband</div>
            <div className="model-tab-config">
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
            <input
              type="file"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileUpload}
            />
            <Button onClick={() => document.getElementById('file-upload').click()}>Choose Front Cover</Button>
            <div className="text-input-container">
              <input
                type="text"
                id="text-input"
                placeholder="2024..."
                onChange={handleTextChange}
              />
              <input type="color" onChange={handleTextColor} />
            </div>
          </div>
        </Tab>
        <Tab eventKey="Bakgrund" title="BAKGRUND">
          <h4>Background</h4>
          <div className='carousel-block-1'>
            <Carousel interval={null} slide={false} fade={false} className='background-container' activeIndex={backgroundIndex} onSelect={handleBackground}>
              {backgroundImages.map((image, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="img-block"
                    src={image.src}
                    alt={image.alt}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className='carousel-block-2'>
            <Carousel interval={null} slide={false} fade={false} className='ground-container' activeIndex={groundIndex} onSelect={handleGround}>
              {groundTxts.map((txt, ix) => (
                <Carousel.Item key={ix}>
                  <img
                    className="img-block"
                    src={txt.placeholder}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Tab>
        <Tab eventKey="Props" title="PROPS">
          <Props />
        </Tab>
      </Tabs>
      <div className='screenshot-container'>
        <Button className="config-button" onClick={handleScreenshot}>
          Take Screenshot!
        </Button>
      </div>
    </div>
  );
};

export default Interface;

{/* <Form>
            <div key={`inline-checkbox`} className="mb-3">
            <Form.Check label="Klistermärken" name='prop1' />
            <Form.Group controlId={'inline-checkbox--1'} className="mb-3 d-flex align-items-center">
          <Form.Label className="mx-2">X</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          <Form.Label className="mx-2">Z</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          </Form.Group>
           <Form.Check label="Blomma" name='prop2' />
            <Form.Group controlId={'inline-checkbox--2'} className="mb-3 d-flex align-items-center">
          <Form.Label className="mx-2">X</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          <Form.Label className="mx-2">Z</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          </Form.Group>
           <Form.Check label="Pennskrin" name='prop3' />
            <Form.Group controlId={'inline-checkbox--3'} className="mb-3 d-flex align-items-center">
          <Form.Label className="mx-2">X</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          <Form.Label className="mx-2">Z</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          </Form.Group>
           <Form.Check label="Ljus" name='prop4' />
            <Form.Group controlId={'inline-checkbox--4'} className="mb-3 d-flex align-items-center">
          <Form.Label className="mx-2">X</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          <Form.Label className="mx-2">Z</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          </Form.Group>
           <Form.Check label="Pennor/pennhållare" name='prop5' />
            <Form.Group controlId={'inline-checkbox--5'} className="mb-3 d-flex align-items-center">
          <Form.Label className="mx-2">X</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          <Form.Label className="mx-2">Z</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          </Form.Group>
          <Form.Check label="Kaffe" name='prop6' />
            <Form.Group controlId={'inline-checkbox--6'} className="mb-3 d-flex align-items-center">
          <Form.Label className="mx-2">X</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          <Form.Label className="mx-2">Z</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          </Form.Group>
          <Form.Check label="Gem" name='prop6' />
            <Form.Group controlId={'inline-checkbox--7'} className="mb-3 d-flex align-items-center">
          <Form.Label className="mx-2">X</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          <Form.Label className="mx-2">Z</Form.Label>
          <Form.Control type="number" size='sm' style={{ width: '20%' }} />
          </Form.Group>

          </div>
          </Form> */}

          
      {/* <ListGroup>
            <ListGroup.Item onClick={() => setPropsIndex(0)} active={propsIndex === 0}>Klistermärken</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(1)} active={propsIndex === 1}>Blomma</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(2)} active={propsIndex === 2}>Pennskrin</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(3)} active={propsIndex === 3}>Ljus</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(4)} active={propsIndex === 4}>Pennor/pennhållare</ListGroup.Item>
          </ListGroup> */}