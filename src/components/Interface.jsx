import { useCallback, useRef, useState } from 'react';
import { Button, Carousel, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCustomization } from '../editor/Customize';
import * as THREE from 'three';
import html2canvas from 'html2canvas';

const Interface = () => {
    const [index, setIndex] = useState(0);
    const [propsIndex, setPropsIndex] = useState(0);
    const ref = useRef();
    const { setCoverTexture, setSpiralColor, setTextValue, setTextColor } = useCustomization();
    
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

    const handleBackground = (selectedIndex, e) => {
      setIndex(selectedIndex);
    }

    const handleScreenshot = useCallback(() => {
      const capture = ref.current;
      html2canvas(capture).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');
        console.log('Screenshot data URL:', dataUrl);

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'screenshot.png';
        link.click();
      });
    }, []);
  
    return (
      <div ref={ref} className="interface">
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
            accept=".jpg, .jpeg, .png" // Adjust accepted file types as needed
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
          <div className='carousel-container'>
          <Carousel className='carousel' activeIndex={index} onSelect={handleBackground}>
            <Carousel.Item>
              <img
                className="img-block"
                src="https://images.unsplash.com/photo-1682687980918-3c2149a8f110?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img-block"
                src="https://images.unsplash.com/photo-1707079918070-7962c5084643?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="img-block"
                src="https://images.unsplash.com/photo-1683009427470-a36fee396389?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          </div>
          <ListGroup>
            <ListGroup.Item onClick={() => setPropsIndex(0)} active={propsIndex === 0}>First slide</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(1)} active={propsIndex === 1}>Second slide</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(2)} active={propsIndex === 2}>Third slide</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(3)} active={propsIndex === 3}>Fourth slide</ListGroup.Item>
            <ListGroup.Item onClick={() => setPropsIndex(4)} active={propsIndex === 4}>Fifth slide</ListGroup.Item>
          </ListGroup>
      </div>
    );
  };

  export default Interface;