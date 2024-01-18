const ConfiguratorUI = () => {
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log('File uploaded:', file);
        // You can perform additional actions with the uploaded file here
      }
    };
  
    const handleTextChange = (e) => {
      const textValue = e.target.value;
      console.log('Text entered:', textValue);
      // You can perform additional actions with the entered text here
    };
  
    return (
      <div className="configurator-ui">
        <div className="controls-container">
          <label htmlFor="file-upload">Choose a file:</label>
          <input
            type="file"
            id="file-upload"
            accept=".obj, .stl, .gltf" // Adjust accepted file types as needed
            onChange={handleFileUpload}
          />
  
          <label htmlFor="text-input">Enter text:</label>
          <input
            type="text"
            id="text-input"
            placeholder="Type something..."
            onChange={handleTextChange}
          />
  
          <button className="config-button" onClick={() => console.log('Button clicked')}>
            Click me
          </button>
        </div>
      </div>
    );
  };