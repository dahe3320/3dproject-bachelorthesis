import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useEnviromentCustomization } from '../../editor/EnviromentCustomizer';

const EnviromentUI = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [groundIndex, setGroundIndex] = useState(0);
    const [tableIndex, setTableIndex] = useState(0);
    const { backgroundImages, setBackgroundImage, groundTxts, setGroundTxt, tableTxts, setTableTxt } = useEnviromentCustomization();

    const handleBackground = (selectedIndex) => {
        setBackgroundIndex(selectedIndex);
        setBackgroundImage(backgroundImages[selectedIndex]);
      }
    
      const handleGround = (usedIndex) => {
        if (usedIndex !== groundIndex) {
        setGroundIndex(usedIndex);
        setGroundTxt(groundTxts[usedIndex]);
        }
      }

      const handleTable = (txtIndex) => {
          setTableIndex(txtIndex);
          setTableTxt(tableTxts[txtIndex]);
      }

      return (
        <div className='enviroment-ui my-5 py-4'>
         <h4>Väggar</h4>
      <div className='textures-container background-container d-flex column mb-4'>
        {backgroundImages.map((image, idx) => (
          <Card key={idx} onClick={() => handleBackground(idx)} style={{ width: '5rem' }} className={idx === backgroundIndex ? 'active-texture' : ''}>
            <Card.Img variant="top" src={image.src} alt={image.alt} />
            <Card.Title>{image.name}</Card.Title>
          </Card>
        ))}
      </div>

      <h4>Golv</h4>
      <div className='textures-container ground-container d-flex column mb-4'>
        {groundTxts.map((txt, ix) => (
          <Card key={ix} onClick={() => handleGround(ix)} style={{ width: '5rem' }} className={ix === groundIndex ? 'active-texture' : ''}>
            <Card.Img variant="top" src={txt.placeholder} alt={`Ground ${ix}`} />
            <Card.Title>{txt.name}</Card.Title>
          </Card>
        ))}
      </div>

      <h4>Bordsyta</h4>
      <div className='textures-container table-container d-flex column'>
        {tableTxts.map((texture, id) => (
          <Card key={id} onClick={() => handleTable(id)} style={{ width: '5rem' }} className={id === tableIndex ? 'active-texture' : ''}>
            <Card.Img variant="top" src={texture.placeholder} alt={`Table ${id}`} />
            <Card.Title>{texture.name}</Card.Title>
          </Card>
        ))}
      </div>
        </div>
      )
    };

export default EnviromentUI;