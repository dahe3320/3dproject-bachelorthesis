import { createContext, useContext, useState } from 'react';

//const defaultTexture = './src/assets/moomin-9groke.jpg';

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [coverTexture, setCoverTexture] = useState(null);
  const [spiralColor, setSpiralColor] = useState('#ffffff'); // Default color is white
  const [textValue, setTextValue] = useState(''); // Default text is empty string 
  const [textColor, setTextColor] = useState('#000000'); // Default color is black

  return (
    <CustomizationContext.Provider
      value={{
        coverTexture,
        setCoverTexture,
        spiralColor,
        setSpiralColor,
        textValue, 
        setTextValue,
        textColor,
        setTextColor
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