import React, { useEffect, useCallback, useRef, useState } from "react";
import { usePropsCustomization } from "../editor/PropsCustomizer";
import { Form } from "react-bootstrap";
import PropsModel from "./PropsModel";

const Props = () => {
  const { checkBoxes, setModelsState } = usePropsCustomization();
  const [checkedState, setCheckedState] = useState({});
  const [propStates, setPropStates] = useState({});

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
    Object.entries(checkedState).forEach(([name, isChecked]) => {
      setModelsState((prevModelsState) => ({
        ...prevModelsState,
        [name]: {
          ...prevModelsState[name],
          visibility: isChecked,
          x: propStates[name]?.x || 0,
          z: propStates[name]?.z || 0,
          path: checkBoxes.find(checkbox => checkbox.name === name)?.path,
        },
      }));
  
      if (!isChecked) {
        setPropStates((prevPropStates) => ({
          ...prevPropStates,
          [name]: {
            x: 0,
            z: 0,
          },
        }));
      }
    });
  }, [checkedState, setModelsState, setPropStates, propStates, checkBoxes]);


  const handleXChange = (e, prop) => {
    const newXValue = Number(e.target.value);
    setPropStates((prevPropStates) => ({
      ...prevPropStates,
      [prop.name]: { ...prevPropStates[prop.name], x: newXValue },
    }));

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
    setPropStates((prevPropStates) => ({
      ...prevPropStates,
      [prop.name]: { ...prevPropStates[prop.name], z: newZValue },
    }));

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
                className="mb-3 d-flex align-items-center"
              >
                <Form.Label className="mx-2">X:</Form.Label>
                <Form.Control
                  type="number"
                  value={propStates[checkbox.name]?.x || 0}
                  onChange={(e) => handleXChange(e, checkbox)}
                  size="sm"
                  style={{ width: "20%" }}
                />
                <Form.Label className="mx-2">Z:</Form.Label>
                <Form.Control
                  type="number"
                  value={propStates[checkbox.name]?.z || 0}
                  onChange={(e) => handleZChange(e, checkbox)}
                  size="sm"
                  style={{ width: "20%" }}
                />
              </Form.Group>
            )}
            {checkedState[checkbox.name] && (
              <PropsModel 
              key={checkbox.name} 
              x={propStates[checkbox.name]?.x} 
              z={propStates[checkbox.name]?.z}
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

export default Props;