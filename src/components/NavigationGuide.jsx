import React from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

const NavigationGuide = () => {
    const popover = (
        <Popover 
        id="popover-basic"     
        positionLeft={50}
        positionTop={300}
        >
            <Popover.Header as="h1">Navigering i 3D-miljön</Popover.Header>
            <Popover.Body>
            <p><strong>Håll vänster musknapp intryckt</strong> för att navigera runt i miljön.</p>
            <p><strong>Scrolla</strong> för att zooma in och ut. </p>
            <p><strong>Håll ner höger musknapp</strong> för att panorera.</p> 
            </Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button className='overlay-trigger'>Navigation Guide</Button>
        </OverlayTrigger>
    );
};

export default NavigationGuide;