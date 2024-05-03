import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePropsCustomization } from '../../editor/PropsCustomizer';
import { Form, Button } from 'react-bootstrap';
import { PropsModel } from '../PropsModel';

const PropsUI = () => {
  const { checkBoxes, setModelsState } = usePropsCustomization();
  const [checkedState, setCheckedState] = useState({});
  const [sliderState, setSliderState] = useState({});
  const propStatesRef = useRef({});
  const modelsStateRef = useRef({});
  const maxX = 15;
  const minX = -15;
  const maxZ = 12;
  const minZ = -12;

  const handleCheckboxChange = useCallback((checkbox) => {
    setCheckedState((prevCheckedState) => {
      const newCheckedState = {
        ...prevCheckedState,
        [checkbox.name]: !prevCheckedState[checkbox.name],
      };
      
      return newCheckedState;
    });
  }, []);

  useEffect(() => {
    const newModelsState = { ...modelsStateRef.current };

    Object.entries(checkedState).forEach(([name, isChecked]) => {
        const initialProps = checkBoxes.find(checkbox => checkbox.name === name);
        if (isChecked && !newModelsState[name]) {
            // Initialize only if the prop doesn't already exist in the state
            newModelsState[name] = {
                visibility: true,
                x: initialProps?.x || 0, // Use existing value or 0
                z: initialProps?.z || 0, // Use existing value or 0
                path: initialProps?.path,
            };
        } else if (!isChecked && newModelsState[name]) {
            newModelsState[name].visibility = false;
        }
    });

    modelsStateRef.current = newModelsState;
    setModelsState(newModelsState); // Update the global state
}, [checkedState, checkBoxes, setModelsState]);

const adjustPosition = (propName, axis, delta) => {
    // Ensure prop entry exists in propStatesRef for uninitiated props
    if (!propStatesRef.current[propName]) {
        propStatesRef.current[propName] = { x: 0, z: 0 }; // Initialize with default positions
    }
    
    let newValue = (propStatesRef.current[propName][axis] || 0) + delta;

    // Apply boundary checks
    newValue = Math.max(Math.min(newValue, axis === 'x' ? maxX : maxZ), axis === 'x' ? minX : minZ);

    // Update propStatesRef and modelsStateRef with the new value
    propStatesRef.current[propName][axis] = newValue;
    modelsStateRef.current[propName] = {
        ...modelsStateRef.current[propName],
        [axis]: newValue,
    };

    // Update global state to reflect changes
    setModelsState({ ...modelsStateRef.current });
};

  return (
    <Form className='my-5 py-4'>
      <div key={`inline-checkbox`} className="mb-3">
        {checkBoxes.map((checkbox, index) => (
          <React.Fragment key={index}>
            <Form.Check
              label={checkbox.label}
              name={checkbox.name}
              checked={checkedState[checkbox.name] || false}
              onChange={() => handleCheckboxChange(checkbox)}
              style={{
                fontWeight: checkedState[checkbox.name] ? 'bold' : 'normal',
                color: checkedState[checkbox.name] ? '#007bff' : '#d9d9d9', // Example colors
              }}
            />
            {checkedState[checkbox.name] && (
              <Form.Group
                controlId={`inline-checkbox--${index + 1}`}
                className="arrow-keys-container"
              >
                <div></div>
                <Button className="arrow-button" onClick={() => adjustPosition(checkbox.name, 'z', -1)}>-</Button>
                <div></div>
                <Button className="arrow-button" onClick={() => adjustPosition(checkbox.name, 'x', -1)}>-</Button>
                <Button className="arrow-button" onClick={() => adjustPosition(checkbox.name, 'z', 1)}>+</Button>
                <Button className="arrow-button" onClick={() => adjustPosition(checkbox.name, 'x', 1)}>+</Button>
              </Form.Group>
            )}
            {checkedState[checkbox.name] && (
              <PropsModel 
              key={checkbox.name} 
              x={propStatesRef.current[checkbox.name]?.x} 
              z={propStatesRef.current[checkbox.name]?.z}
              visibility={true}
              path={checkbox.path}
              />         
            )}
          </React.Fragment>
        ))}
      </div>
    </Form>
  );
};

export default PropsUI;