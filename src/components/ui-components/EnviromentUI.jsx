import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useEnviromentCustomization } from '../../editor/EnviromentCustomizer';

const EnviromentUI = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [groundIndex, setGroundIndex] = useState(0);
    const [tableIndex, setTableIndex] = useState(0);
    const { backgroundImages, setBackgroundImage, groundTxts, setGroundTxt, tableTxts, setTableTxt } = useEnviromentCustomization();

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

      const handleTable = (tableIndex) => {
          setTableIndex(tableIndex);
          console.log('tableIndex', tableIndex);
          setTableTxt(tableTxts[tableIndex]);
        
      }

      return (
        <div className='enviroment-ui'>
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
          <h4>Ground</h4>
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
          <h4>Table</h4>
          <div className='carousel-block-3'>
            <Carousel interval={null} slide={false} fade={false} className='table-container' activeIndex={tableIndex} onSelect={handleTable}>
              {tableTxts.map((texture, id) => (
                <Carousel.Item key={id}>
                  <img
                    className="img-block"
                    src={texture.placeholder}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            </div>
        </div>
      )
    };

export default EnviromentUI;