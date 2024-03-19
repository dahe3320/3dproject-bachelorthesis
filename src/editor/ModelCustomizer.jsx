import { createContext, useContext, useMemo, useState } from "react";

const spiralColors = [
    { color: '#eeedeb', name: 'white' },
    { color: '#343332', name: 'black' },
    { color: '#d65050', name: 'red' },
    { color: '#f2cee5', name: 'pink' },
    { color: '#eadfb6', name: 'silver' },
    { color: '#be9946', name: 'gold' }
  ];
  
  const bandColors = [
    { color: '#eeedeb', name: 'white' },
    { color: '#343332', name: 'black' },
    { color: '#eadfb6', name: 'silver' },
    { color: '#be9946', name: 'gold' },
    { color: '#954140', name: 'red' },
    { color: '#d6a8a7', name: 'lightpink' },
    { color: '#c75283', name: 'cerise' },
    { color: '#90bbad', name: 'cyan' },
    { color: '#87a0b1', name: 'lightblue' },
    { color: '#5067a8', name: 'blue' }
  ];

  const ModelContext = createContext();

  export const ModelProvider = (props) => {
    const [coverTexture, setCoverTexture] = useState(null);
    const [rotation, setRotation] = useState({ x: 0, y: -Math.PI / 2, z: -Math.PI / 2 }); 
    const [positionY, setPositionY] = useState(15);
    const [positionX, setPositionX] = useState(0);
    const [positionZ, setPositionZ] = useState(0);
    const [spiralColor, setSpiralColor] = useState('#ffffff'); // Default color is white
    const [bandColor, setBandColor] = useState('#ffffff'); // Default color is white
    
    const contextValue = useMemo(() => ({
      coverTexture,
      setCoverTexture,
      positionX,
      setPositionX,
      positionZ,
      setPositionZ,
      positionY,
      setPositionY,
      rotation,
      setRotation,
      spiralColors,
      spiralColor,
      setSpiralColor,
      bandColors,
      bandColor,
      setBandColor
    }), [coverTexture, positionX, positionZ, positionY, rotation, spiralColor, bandColor]);
  
    return (
      <ModelContext.Provider value={contextValue}>
        {props.children}
      </ModelContext.Provider>
    );
  };

    export const useModelCustomization = () => {
        const context = useContext(ModelContext);
        if (!context) {
        throw new Error("useModel must be used within a ModelProvider");
        }
        return context;
    };
