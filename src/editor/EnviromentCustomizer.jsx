import { createContext, useContext, useState } from 'react';

const backgroundImages = [
    {
      src: './src/assets/beige-asset-wall.jpg',
      alt: 'First slide'
    },
    {
      src: './src/assets/beige-plaster-wall.jpg',
      alt: 'Second slide'
    },
    {
      src: './src/assets/white-brick-wall.jpg',
      alt: 'Third slide'
    }
  ];
  
  const groundTxts = [
    {
      placeholder: './models/textures/floor_tiles/floor_tiles_02_diff_4k.jpg',
      // ao: './models/textures/floor_tiles/floor_tiles_02_ao_4k.jpg',
      // arm: './models/textures/floor_tiles/floor_tiles_02_arm_4k.jpg',
      diffuse: './models/textures/floor_tiles/floor_tiles_02_diff_4k.jpg',
      displacement: './models/textures/floor_tiles/floor_tiles_02_disp_4k.jpg',
      normal: './models/textures/floor_tiles/floor_tiles_02_nor_4k.jpg',
      roughness: './models/textures/floor_tiles/floor_tiles_02_rough_4k.jpg'
    },
    {
      placeholder: './models/textures/laminate_floor/laminate_floor_02_diff_4k.jpg',
      // ao: './models/textures/laminate_floor/laminate_floor_02_ao_4k.jpg',
      // arm: './models/textures/laminate_floor/laminate_floor_02_arm_4k.jpg',
      diffuse: './models/textures/laminate_floor/laminate_floor_02_diff_4k.jpg',
      displacement: './models/textures/laminate_floor/laminate_floor_02_disp_4k.jpg',
      normal: './models/textures/laminate_floor/laminate_floor_02_nor_4k.jpg',
      roughness: './models/textures/laminate_floor/laminate_floor_02_rough_4k.jpg'
    },
    {
      placeholder: './models/textures/wood_table/wood_table_001_diff_4k.jpg',
      // ao: './models/textures/wood_table/wood_table_001_ao_4k.jpg',
      // arm: './models/textures/wood_table/wood_table_001_arm_4k.jpg',
      diffuse: './models/textures/wood_table/wood_table_001_diff_4k.jpg',
      displacement: './models/textures/wood_table/wood_table_001_disp_4k.jpg',
      normal: './models/textures/wood_table/wood_table_001_nor_4k.jpg',
      roughness: './models/textures/wood_table/wood_table_001_rough_4k.jpg'
    }
  ];

  const EnviromentContext = createContext();

  export const EnviromentProvider = (props) => {
    const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);
    const [groundTxt, setGroundTxt] = useState(groundTxts[0]);

    return (
        <EnviromentContext.Provider
            value={{
                backgroundImage,
                setBackgroundImage,
                groundTxt,
                setGroundTxt,
                backgroundImages,
                groundTxts
            }}
        >  
            {props.children}
        </EnviromentContext.Provider>
    );
  };

  export const useEnviromentCustomization = () => {
    const context = useContext(EnviromentContext);
    if (!context) {
        throw new Error('useEnviromentCustomization must be used within a EnviromentProvider');
    }
    return context;
  };