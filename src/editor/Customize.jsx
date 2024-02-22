import { createContext, useContext, useState } from 'react';

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

const backgroundImages = [
  {
    src: './src/assets/Occult-dark_org.jpg',
    alt: 'First slide'
  },
  {
    src: './src/assets/2024-y2k.jpg',
    alt: 'Second slide'
  },
  {
    src: './src/assets/office_plane.jpg',
    alt: 'Third slide'
  }
];

const groundTxts = [
  {
    src: './src/assets/office_plane.jpg',
    alt: 'First ground'
  },
  {
    src: './src/assets/2024-y2k.jpg',
    alt: 'Second ground'
  },
  {
    src: './src/assets/Occult-dark_org.jpg',
    alt: 'Third ground'
  }
];

const checkBoxes = [
  { label: 'Klistermärken', name: 'prop1', x: 0, z: 0 },
  { label: 'Blomma', name: 'prop2', x: 0, z: 0 },
  { label: 'Pennskrin', name: 'prop3', x: 0, z: 0 },
  { label: 'Ljus', name: 'prop4', x: 0, z: 0},
  { label: 'Pennor', name: 'prop5', x: 0, z: 0},
  { label: 'Kaffe', name: 'prop6', x: 0, z: 0},
  { label: 'Gem', name: 'prop7', x: 0, z: 0},
];
/* Lägga till bokmärken? */ 

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [coverTexture, setCoverTexture] = useState(null);
  const [spiralColor, setSpiralColor] = useState('#ffffff'); // Default color is white
  const [bandColor, setBandColor] = useState('#ffffff'); // Default color is white
  const [textValue, setTextValue] = useState(''); // Default text is empty string 
  const [textColor, setTextColor] = useState('#000000'); // Default color is black
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);
  const [groundTxt, setGroundTxt] = useState(groundTxts[0]);
  const [modelsState, setModelsState] = useState({});

  return (
    <CustomizationContext.Provider
      value={{
        coverTexture,
        setCoverTexture,
        spiralColors,
        spiralColor,
        setSpiralColor,
        bandColors,
        bandColor,
        setBandColor,
        textValue, 
        setTextValue,
        textColor,
        setTextColor,
        backgroundImages,
        backgroundImage,
        setBackgroundImage,
        groundTxts,
        groundTxt,
        setGroundTxt,
        checkBoxes,
        modelsState,
        setModelsState
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error("useCustomization must be used within a CustomizationProvider");
  }
  return context;
};


// import { createContext, useContext, useState } from "react";

// const chairColors = [
//   {
//     color: "#683434",
//     name: "brown",
//   },
//   {
//     color: "#1a5e1a",
//     name: "green",
//   },
//   {
//     color: "#659994",
//     name: "blue",
//   },
//   {
//     color: "#896599",
//     name: "mauve",
//   },
//   {
//     color: "#ffa500",
//     name: "orange",
//   },
//   {
//     color: "#59555b",
//     name: "grey",
//   },
//   {
//     color: "#222222",
//     name: "black",
//   },
//   {
//     color: "#ececec",
//     name: "white",
//   },
// ];

// const cushionColors = [
//   {
//     color: "#683434",
//     name: "brown",
//   },
//   {
//     color: "#1a5e1a",
//     name: "green",
//   },
//   {
//     color: "#659994",
//     name: "blue",
//   },
//   {
//     color: "#896599",
//     name: "mauve",
//   },
//   {
//     color: "#ffa500",
//     name: "orange",
//   },
//   {
//     color: "#59555b",
//     name: "grey",
//   },
//   {
//     color: "#222222",
//     name: "black",
//   },
//   {
//     color: "#ececec",
//     name: "white",
//   },
// ];

// const CustomizationContext = createContext({});

// export const CustomizationProvider = (props) => {
//   const [material, setMaterial] = useState("leather");
//   const [legs, setLegs] = useState(1);
//   const [chairColor, setChairColor] = useState(chairColors[0]);
//   const [cushionColor, setCushionColor] = useState(cushionColors[0]);

//   return (
//     <CustomizationContext.Provider
//       value={{
//         material,
//         setMaterial,
//         legs,
//         setLegs,
//         chairColors,
//         chairColor,
//         setChairColor,
//         cushionColors,
//         cushionColor,
//         setCushionColor,
//       }}
//     >
//       {props.children}
//     </CustomizationContext.Provider>
//   );
// };

// export const useCustomization = () => {
//   const context = useContext(CustomizationContext);
//   return context;
// };