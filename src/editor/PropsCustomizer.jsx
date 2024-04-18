import { createContext, useContext, useState } from 'react';

const checkBoxes = [
    { label: 'Klistermärken', name: 'prop1', path: './models/klistermarken.gltf', x: 4, z: -8 },
    { label: 'Blomma', name: 'prop2', path: './models/blomma.gltf', x: -10, z: 10 },
    { label: 'Pennskrin', name: 'prop3', path: './models/pennskrin.gltf', x: 0, z: 10 },
    { label: 'Pennor', name: 'prop5', path: './models/pennor.gltf', x: 5, z: -2},
    { label: 'Kaffe', name: 'prop6', path: './models/kaffe.gltf', x: -5, z: 2},
    { label: 'Gem', name: 'prop7', path: './models/gem.gltf', x: 4, z: 4},
    { label: 'Bokmärke', name: 'prop8', path: './models/bokmarke.gltf', x: 4, z: -8},
  ];

const PropsContext = createContext();

export const PropsProvider = (props) => {
    const [modelsState, setModelsState] = useState({});

    return (
        <PropsContext.Provider
            value={{
                checkBoxes,
                modelsState,
                setModelsState
            }}
        >
            {props.children}
        </PropsContext.Provider>
    );
};

export const usePropsCustomization = () => {
    const context = useContext(PropsContext);
    if (!context) {
        throw new Error('usePropsCustomization must be used within a PropsProvider');
    }
    return context;
};