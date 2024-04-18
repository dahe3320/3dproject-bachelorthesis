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
    { color: '#f5f5f5', name: 'white', displayColor: '#f5f5f5' },
    { color: '#000000', name: 'black', displayColor: '#000000'},
    { color: '#c0c0c0', name: 'silver', displayColor: '#c0c0c0', texture: './src/assets/silverTexture.png' },
    { color: '#ce9726', name: 'gold', displayColor: '#ce9726', texture: './src/assets/goldTexture.png'},
    { color: '#d51e39', name: 'red', displayColor: '#d51e39' },
    { color: '#ffd7e6', name: 'lightpink', displayColor: '#ffd7e6' },
    { color: '#ee2d75', name: 'cerise', displayColor: '#ee2d75' },
    { color: '#00e5ee', name: 'cyan', displayColor: '#00e5ee' },
    { color: '#abe0f5', name: 'lightblue', displayColor: '#abe0f5' },
    { color: '#1f93c5', name: 'blue', displayColor: '#1f93c5' },
  ];

  const frameColors = [
    { color: '#ffffff' }, // white
    { color: '#f26e34' }, // orange
    { color: '#d51e39' }, // red
    { color: '#f176a9' }, // lightpink
    { color: '#231f20' }, // black
    { color: '#145d38' }, // green
    { color: '#1a8e5e' }, // darkgreen
    { color: '#56caf4' }, // lightblue
    { color: '#1f93c5' }, // blue
    { color: '#403977' }, // purple
    { color: '#d5bad9' }, // lightpurple
    { color: '#ffdf8c' }, // yellow
    { color: '#fcccaf' }, // lightorange
    { color: '#d1e6bf' }, // lightgreen
    { color: '#abe0f5' }, // lightblue
    { color: '#39bfbf' }, // turquoise
    { color: '#306c7d' }, // darkblue
    { color: '#168c7e' }, // darkturquoise
    { color: '#ee2d75' }, // cerise
    { color: '#f6a4b4' }, // lightcerise
    { color: '#f0594d' }, // coral
    { color: '#f3786e' }, // lightcoral
    { color: '#cfd1d2' }, // lightgrey
    { color: '#57585a' }, // darkgrey
    { color: '#9ed064' }, // lightgreen
    { color: '#d25aa7' }, // pink
    { color: '#1db4ff' }, // skyblue
  ];


  const ModelContext = createContext();

  export const ModelProvider = (props) => {
    const [selectedModel, setSelectedModel] = useState('Closed');
    const [coverTexture, setCoverTexture] = useState(null);
    const [leftPageTxt, setLeftPageTxt] = useState(null);
    const [rightPageTxt, setRightPageTxt] = useState(null);
    const [rotation, setRotation] = useState({ x: 0, y: -Math.PI / 2, z: -Math.PI / 2 }); 
    const [positionY, setPositionY] = useState(15);
    const [positionX, setPositionX] = useState(0);
    const [positionZ, setPositionZ] = useState(0);
    const [spiralColor, setSpiralColor] = useState(spiralColors[0]);
    const [bandColor, setBandColor] = useState(bandColors[0]); 
    const [bandTexture, setBandTexture] = useState(null);
    const [frameColor, setFrameColor] = useState(frameColors[0]); 
    
    const contextValue = useMemo(() => ({
      selectedModel,
      setSelectedModel,
      coverTexture,
      setCoverTexture,
      leftPageTxt,
      setLeftPageTxt,
      rightPageTxt,
      setRightPageTxt,
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
      setBandColor,
      bandTexture,
      setBandTexture,
      frameColors,
      frameColor,
      setFrameColor
    }), [selectedModel, leftPageTxt, rightPageTxt, coverTexture, positionX, positionZ, positionY, rotation, spiralColor, bandColor, bandTexture, frameColor]);
  
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
