import React from "react";
import { useCustomization } from "../editor/Customize";
import { Form } from "react-bootstrap";

const Props = () => {
  const { checkBoxes, selectedProp, setSelectedProps } = useCustomization();

  const handleCheckboxChange = (e) => {
    const selectedProp = checkBoxes.find(prop => prop.name === e.target.value);
    setSelectedProps(selectedProp);
  }

  return (
    <Form>
      <div key={`inline-checkbox`} className="mb-3">
        {checkBoxes.map((checkbox, index) => (
          <React.Fragment key={index}>
            <Form.Check
              label={checkbox.label}
              name={checkbox.name}
              checked={selectedProp.name === checkbox.name}
              onChange={() => handleCheckboxChange(checkbox)}
            />
            {checkbox.name === selectedProp.name && (
              <Form.Group controlId={`inline-checkbox--${index + 1}`} className="mb-3 d-flex align-items-center">
                <Form.Label className="mx-2">X</Form.Label>
                <Form.Control type="number" size='sm' style={{ width: '20%' }} />
                <Form.Label className="mx-2">Z</Form.Label>
                <Form.Control type="number" size='sm' style={{ width: '20%' }} />
              </Form.Group>
            )}
          </React.Fragment>
        ))}
      </div>
    </Form>
  );
};

export default Props;