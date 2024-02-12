import { useCallback, useRef, useState } from 'react';
import { Button, Carousel, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCustomization } from '../editor/Customize';
import * as THREE from 'three';
import html2canvas from 'html2canvas';


const Interface = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [groundIndex, setGroundIndex] = useState(0);
    const [propsIndex, setPropsIndex] = useState(0);

    const { setCoverTexture, setSpiralColor, setTextValue, setTextColor, backgroundImages, setBackgroundImage, groundTxts, setGroundTxt } = useCustomization();
    
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

    const handleSpiralColor = (e) => {
      if (setSpiralColor) {
        setSpiralColor(e.target.value);
      }
    }

    const handleRubberColor = (e) => {
      if (setRubberColor) {
        setRubberColor(e.target.value);
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
      setGroundIndex(usedIndex);
      console.log('usedIndex', usedIndex);
      setGroundTxt(groundTxts[usedIndex]);
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
      <div className="interface">
        {/* Color picker for Spiral color */}
        <label>Choose Spiral color:</label>
        <input type="color" onChange={handleSpiralColor} />

        <label>Choose Rubber color:</label>
        <input type="color" onChange={handleRubberColor} />
    
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
          <div className='screenshot-container'>
          <Button className="config-button" onClick={handleScreenshot}>
            Take Screenshot!
          </Button>
          </div>
          </div>
            <h4>Background</h4>
          <div className='carousel-block-1'>
          <Carousel interval={null} className='background-container' activeIndex={backgroundIndex} onSelect={handleBackground}>
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
          <Carousel interval={null} className='ground-container' activeIndex={groundIndex} onSelect={handleGround}>
          {groundTxts.map((txt, ix) => (
            <Carousel.Item key={ix}>
              <img
                className="img-block"
                src={txt.src}
                alt={txt.alt}
              />
            </Carousel.Item>
          ))}
          </Carousel>
          </div>
          <ListGroup>
            <ListGroup.Item onClick={() => setPropsIndex(0)} active={propsIndex === 0}>Klistermärken</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(1)} active={propsIndex === 1}>Blomma</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(2)} active={propsIndex === 2}>Pennskrin</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(3)} active={propsIndex === 3}>Ljus</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(4)} active={propsIndex === 4}>Pennor/pennhållare</ListGroup.Item>
          </ListGroup>
          {/* <List>
        {[0, 1, 2, 3, 4].map((propsIndex) => (
          <ListItem
            key={propsIndex}
            button
            onClick={() => setIndex(propsIndex)}
            sx={{ backgroundColor: propsIndex === index ? '#f0f0f0' : 'inherit' }}
          >
            {`Slide ${propsIndex + 1}`}
          </ListItem>
        ))}
      </List> */}
      </div>
    );
  };

  export default Interface;