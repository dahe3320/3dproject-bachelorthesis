import { createContext, useContext, useState } from "react";

const spiralColors = [
    { color: '#ffffff', name: 'white' },
    { color: '#000000', name: 'black' },
    { color: '#ff0000', name: 'red' },
    { color: '#00ff00', name: 'green' },
    { color: '#0000ff', name: 'blue' },
    { color: '#ffff00', name: 'yellow' },
    { color: '#ff00ff', name: 'magenta' },
    { color: '#00ffff', name: 'cyan' }
  ];
  
  const bandColors = [
    { color: '#ffffff', name: 'white' },
    { color: '#000000', name: 'black' },
    { color: '#ff0000', name: 'red' },
    { color: '#00ff00', name: 'green' },
    { color: '#0000ff', name: 'blue' },
    { color: '#ffff00', name: 'yellow' },
    { color: '#ff00ff', name: 'magenta' },
    { color: '#00ffff', name: 'cyan' }
  ];

  const ModelContext = createContext();

  export const ModelProvider = (props) => {
    const [coverTexture, setCoverTexture] = useState(null);
    const [positionX, setPositionX] = useState(0);
    const [positionZ, setPositionZ] = useState(0);
    const [spiralColor, setSpiralColor] = useState('#ffffff'); // Default color is white
    const [bandColor, setBandColor] = useState('#ffffff'); // Default color is white
    const [textValue, setTextValue] = useState(''); // Default text is empty string 
    const [textColor, setTextColor] = useState('#000000'); // Default color is black

    return (
        <ModelContext.Provider
            value={{
                coverTexture,
                setCoverTexture,
                positionX,
                setPositionX,
                positionZ,
                setPositionZ,
                spiralColors,
                spiralColor,
                setSpiralColor,
                bandColors,
                bandColor,
                setBandColor,
                textValue, 
                setTextValue,
                textColor,
                setTextColor
            }}
        >  
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
