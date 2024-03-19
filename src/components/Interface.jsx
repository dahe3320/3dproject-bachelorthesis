import React, { useCallback, useState } from 'react';
import { Button, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as THREE from 'three';
import html2canvas from 'html2canvas';
import ModelUI from './ui-components/ModelUI';
import EnviromentUI from './ui-components/EnviromentUI';
import PropsUI from './ui-components/PropsUI';


const Interface = () => {

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
      <Tabs defaultActiveKey="Kalender" id="configurator-tab" className="mb-4" style={{ fontSize: '16px', fontWeight: '500'}}>
        <Tab eventKey="Kalender" title="KALENDER">
          <ModelUI />
        </Tab>
        <Tab eventKey="Bakgrund" title="BAKGRUND">
          <EnviromentUI />
        </Tab>
        <Tab eventKey="Props" title="PROPS">
          <PropsUI />
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