import { createContext, useContext, useState } from 'react';

const backgroundImages = [
    {
      src: './src/assets/painted_plaster_wall_diff_1k.jpg',
      alt: 'First slide'
    },
    {
      src: './src/assets/design-space-wallpaper.jpg',
      alt: 'Second slide'
    },
    {
      src: './src/assets/white-brick-wall.jpg',
      alt: 'Third slide'
    },
    {
      src: './src/assets/white-texture-background.jpg',
      alt: 'Fourth slide'
    }
  ];
  
  const groundTxts = [
    {
      placeholder: './models/textures/floor_tiles/floor_tiles_02_diff_1k.jpg',
      diffuse: './models/textures/floor_tiles/floor_tiles_02_diff_1k.jpg',
      displacement: './models/textures/floor_tiles/floor_tiles_02_disp_1k.jpg',
      normal: './models/textures/floor_tiles/floor_tiles_02_nor_gl_1k.jpg',
      roughness: './models/textures/floor_tiles/floor_tiles_02_rough_1k.jpg'
    },
    {
      placeholder: './models/textures/laminate_floor/laminate_floor_02_diff_1k.jpg',
      diffuse: './models/textures/laminate_floor/laminate_floor_02_diff_1k.jpg',
      displacement: './models/textures/laminate_floor/laminate_floor_02_disp_1k.jpg',
      normal: './models/textures/laminate_floor/laminate_floor_02_nor_gl_1k.jpg',
      roughness: './models/textures/laminate_floor/laminate_floor_02_rough_1k.jpg'
    },
    {
      placeholder: './models/textures/beige_wall/beige_wall_001_diff_1k.jpg',
      diffuse: './models/textures/beige_wall/beige_wall_001_diff_1k.jpg',
      displacement: './models/textures/beige_wall/beige_wall_001_disp_1k.jpg',
      normal: './models/textures/beige_wall/beige_wall_001_nor_gl_1k.jpg',
      roughness: './models/textures/beige_wall/beige_wall_001_rough_1k.jpg'
    }
  ];

  const tableTxts = [
    {
      placeholder: './models/textures/wood_table/wood_table_001_diff_4k.jpg',
      diffuse: './models/textures/wood_table/wood_table_001_diff_4k.jpg',
      displacement: './models/textures/wood_table/wood_table_001_disp_4k.jpg',
      normal: './models/textures/wood_table/wood_table_001_nor_4k.jpg',
      roughness: './models/textures/wood_table/wood_table_001_rough_4k.jpg'
    },
    {
      placeholder: './models/textures/oak_veneer/oak_veneer_01_diff_4k.jpg',
      diffuse: './models/textures/oak_veneer/oak_veneer_01_diff_4k.jpg',
      displacement: './models/textures/oak_veneer/oak_veneer_01_disp_4k.jpg',
      normal: './models/textures/oak_veneer/oak_veneer_01_nor_gl_4k.jpg',
      roughness: './models/textures/oak_veneer/oak_veneer_01_rough_4k.jpg'
    },
    {
      placeholder: './models/textures/wood_planks/wood_planks_diff_4k.jpg',
      diffuse: './models/textures/wood_planks/wood_planks_diff_4k.jpg',
      displacement: './models/textures/wood_planks/wood_planks_disp_4k.jpg',
      normal: './models/textures/wood_planks/wood_planks_nor_gl_4k.jpg',
      roughness: './models/textures/wood_planks/wood_planks_rough_4k.jpg'
    }
  ];

  const EnviromentContext = createContext();

  export const EnviromentProvider = (props) => {
    const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);
    const [groundTxt, setGroundTxt] = useState(groundTxts[0]);
    const [tableTxt, setTableTxt] = useState(tableTxts[0]);

    return (
        <EnviromentContext.Provider
            value={{
                backgroundImage,
                setBackgroundImage,
                groundTxt,
                setGroundTxt,
                tableTxt,
                setTableTxt,
                backgroundImages,
                groundTxts,
                tableTxts
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