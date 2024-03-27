import { createContext, useContext, useMemo, useState } from "react";

const spiralColors = [
    { color: '#f5f5f5', name: 'white' },
    { color: '#000000', name: 'black' },
    { color: '#e03434', name: 'red' },
    { color: '#f176a9', name: 'pink' },
    { color: '#c0c0c0', name: 'silver' },
    { color: '#ce9726', name: 'gold' }
  ];
  
  const bandColors = [
    { color: '#f5f5f5', name: 'white' },
    { color: '#000000', name: 'black' },
    { color: '#c0c0c0', name: 'silver' },
    { color: '#ce9726', name: 'gold' },
    { color: '#d51e39', name: 'red' },
    { color: '#ffd7e6', name: 'lightpink' },
    { color: '#ee2d75', name: 'cerise' },
    { color: '#00e5ee', name: 'cyan' },
    { color: '#abe0f5', name: 'lightblue' },
    { color: '#1f93c5', name: 'blue' }
  ];

  const ModelContext = createContext();

  export const ModelProvider = (props) => {
    const [selectedModel, setSelectedModel] = useState('Closed');
    const [coverTexture, setCoverTexture] = useState(null);
    const [rotation, setRotation] = useState({ x: 0, y: -Math.PI / 2, z: -Math.PI / 2 }); 
    const [positionY, setPositionY] = useState(15);
    const [positionX, setPositionX] = useState(0);
    const [positionZ, setPositionZ] = useState(0);
    const [spiralColor, setSpiralColor] = useState('#ffffff'); // Default color is white
    const [bandColor, setBandColor] = useState('#ffffff'); // Default color is white
    
    const contextValue = useMemo(() => ({
      selectedModel,
      setSelectedModel,
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
    }), [selectedModel, coverTexture, positionX, positionZ, positionY, rotation, spiralColor, bandColor]);
  
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
