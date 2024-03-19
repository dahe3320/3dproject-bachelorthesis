import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePropsCustomization } from '../../editor/PropsCustomizer';
import { Form } from 'react-bootstrap';
import { PropsModel } from '../PropsModel';

const PropsUI = () => {
  const { checkBoxes, setModelsState } = usePropsCustomization();
  const [checkedState, setCheckedState] = useState({});
  const [sliderState, setSliderState] = useState({});
  const propStatesRef = useRef({});
  const modelsStateRef = useRef({});

  const handleCheckboxChange = useCallback((checkbox) => {
    console.log(`Model Path: ${checkbox.path}`);
    
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
    const newPropStates = { ...propStatesRef.current };

    Object.entries(checkedState).forEach(([name, isChecked]) => {
      newModelsState[name] = {
        ...newModelsState[name],
        visibility: isChecked,
        x: propStatesRef.current[name]?.x || 0,
        z: propStatesRef.current[name]?.z || 0,
        path: checkBoxes.find(checkbox => checkbox.name === name)?.path,
      };
  
      if (!isChecked) {
        newPropStates[name] = {
          x: 0,
          z: 0,
        };
      }
    });

    modelsStateRef.current = newModelsState;
    propStatesRef.current = newPropStates;
    setModelsState(newModelsState); // update the global state
  }, [checkedState, checkBoxes, setModelsState]);
  
  
    const handleXChange = (e, prop) => {
      const newXValue = Number(e.target.value);
      propStatesRef.current = {
        ...propStatesRef.current,
        [prop.name]: { ...propStatesRef.current[prop.name], x: newXValue },
      };

      setSliderState(propStatesRef.current);
  
      setModelsState((prevModelsState) => ({
        ...prevModelsState,
        [prop.name]: {
          ...prevModelsState[prop.name],
          x: newXValue,
        },
      }));
    };
  
    const handleZChange = (e, prop) => {
      const newZValue = Number(e.target.value);
      propStatesRef.current = {
        ...propStatesRef.current,
        [prop.name]: { ...propStatesRef.current[prop.name], z: newZValue },
      };

      setSliderState(propStatesRef.current);
  
      setModelsState((prevModelsState) => ({
        ...prevModelsState,
        [prop.name]: {
          ...prevModelsState[prop.name],
          z: newZValue,
        },
      }));
    };

    return (
      <Form>
        <div key={`inline-checkbox`} className="mb-3">
          {checkBoxes.map((checkbox, index) => (
            <React.Fragment key={index}>
              <Form.Check
                label={checkbox.label}
                name={checkbox.name}
                checked={checkedState[checkbox.name] || false}
                onChange={() => handleCheckboxChange(checkbox)}
              />
              {checkedState[checkbox.name] && (
                <Form.Group
                  controlId={`inline-checkbox--${index + 1}`}
                  className="mb-3 align-items-center"
                >
                  <Form.Label className="mx-2">X:</Form.Label>
                  <Form.Range
                    value={sliderState[checkbox.name]?.x || 0}
                    onChange={(e) => handleXChange(e, checkbox)}
                    size="sm"
                    min={-20}
                    max={20}
                    step={1}
                    style={{ width: "80%" }}
                  />
                  <Form.Label className="mx-2">Z:</Form.Label>
                  <Form.Range
                    value={sliderState[checkbox.name]?.z || 0}
                    onChange={(e) => handleZChange(e, checkbox)}
                    size="sm"
                    min={-20}
                    max={20}
                    step={1}
                    style={{ width: "80%" }}
                  />
                </Form.Group>
              )}
              {checkedState[checkbox.name] && (
                <PropsModel 
                key={checkbox.name} 
                x={propStatesRef[checkbox.name]?.x} 
                z={propStatesRef[checkbox.name]?.z}
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