import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCustomization } from "../editor/Customize";
import { Form } from "react-bootstrap";
import PropsModel from "./PropsModel";

const Props = () => {
  const { checkBoxes, setModelsState } = useCustomization();
  const [checkedState, setCheckedState] = useState({});
  const [propStates, setPropStates] = useState({});

  const handleCheckboxChange = (checkbox) => {
    
    setCheckedState((prevCheckedState) => {
      const newCheckedState = {
      ...prevCheckedState,
      [checkbox.name]: !prevCheckedState[checkbox.name],
    };

    setModelsState((prevModelsState) => ({
      ...prevModelsState,
      [checkbox.name]: {
        ...prevModelsState[checkbox.name],
        visibility: newCheckedState[checkbox.name],
      x: propStates[checkbox.name]?.x || 0,
      z: propStates[checkbox.name]?.z || 0,
      },

    }));

    return newCheckedState;
  });

    if (!checkedState[checkbox.name]) {
      setPropStates((prevPropStates) => ({
        ...prevPropStates,
        [checkbox.name]: {
          x: 0,
          z: 0,
        },
      }));
    }
  };


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
              key={index} 
              x={propStates[checkbox.name]?.x} 
              z={propStates[checkbox.name]?.z}
              />         
            )}
          </React.Fragment>
        ))}
      </div>
    </Form>
  );
};

export default Props;