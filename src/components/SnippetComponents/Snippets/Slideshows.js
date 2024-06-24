export const slideshowSnippets = [
    {
      title: 'Automatic Image Slideshow',
      jsxCode: `(props) => {
        const [currentIndex, setCurrentIndex] = React.useState(0);
        const images = [
          'https://picsum.photos/id/1000/800/600',
          'https://picsum.photos/800/600?blur=2',
          'https://picsum.photos/id/1020/800/600',
        ];
  
        // Automatically transition to next slide every 2 seconds (faster)
        React.useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
          }, 2000); // Change slide every 2 seconds (adjust timing here)
  
          return () => clearInterval(interval); // Cleanup interval on component unmount
        }, []);
  
        return (
          <div className="slideshow-container">
            <div className="slide-image-container">
              <img src={images[currentIndex]} alt={\`Slide \${currentIndex + 1}\`} className="slide-image" />
              <button className="prev" onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}>&#10094;</button>
              <button className="next" onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}>&#10095;</button>
            </div>
          </div>
        );
      }`,
      cssCode: `.slideshow-container {
        position: relative;
        max-width: 800px; /* Adjusted maximum width */
        margin: auto;
        overflow: hidden;
        border: 2px solid #ddd;
        border-radius: 10px;
      }
      .slide-image-container {
        position: relative;
        width: 100%;
      }
      .slide-image {
        width: 100%;
        height: auto; /* Ensure images maintain aspect ratio */
        display: block;
      }
      .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50px; /* Adjust button size */
        height: 50px;
        padding: 10px; /* Adjust padding for better appearance */
        color: white;
        font-weight: bold;
        font-size: 24px; /* Larger font size */
        transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */
        border: none; /* Remove default button border */
        outline: none; /* Remove default button outline */
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        border-radius: 50%; /* Circle shape */
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0; /* Initially hidden */
      }
      .slide-image-container:hover .prev,
      .slide-image-container:hover .next {
        opacity: 1; /* Show buttons on hover */
      }
      .prev {
        left: 10px;
      }
      .next {
        right: 10px;
      }
      .prev:hover, .next:hover {
        background-color: rgba(0, 0, 0, 0.8); /* Darker background on hover */
        transform: scale(1.1); /* Scale up on hover */
      }`,
    },
    {
      title: 'Manual Image Slideshow',
      jsxCode: `(props) => {
        const [currentIndex, setCurrentIndex] = React.useState(0);
        const images = [
          'https://picsum.photos/id/1000/800/600',
          'https://picsum.photos/800/600?blur=2',
          'https://picsum.photos/id/1020/800/600',
        ];
  
        const handlePrevClick = () => {
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        };
  
        const handleNextClick = () => {
          setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        };
  
        return (
          <div className="slideshow-container">
            <div className="slide-image-container">
              <img src={images[currentIndex]} alt={\`Slide \${currentIndex + 1}\`} className="slide-image" />
              <button className="prev" onClick={handlePrevClick}>&#10094;</button>
              <button className="next" onClick={handleNextClick}>&#10095;</button>
            </div>
          </div>
        );
      }`,
      cssCode: `.slideshow-container {
        position: relative;
        max-width: 800px; /* Adjusted maximum width */
        margin: auto;
        overflow: hidden;
        border: 2px solid #ddd;
        border-radius: 10px;
      }
      .slide-image-container {
        position: relative;
        width: 100%;
      }
      .slide-image {
        width: 100%;
        height: auto; /* Ensure images maintain aspect ratio */
        display: block;
      }
      .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50px; /* Adjust button size */
        height: 50px;
        padding: 10px; /* Adjust padding for better appearance */
        color: white;
        font-weight: bold;
        font-size: 24px; /* Larger font size */
        transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */
        border: none; /* Remove default button border */
        outline: none; /* Remove default button outline */
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        border-radius: 50%; /* Circle shape */
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1; /* Always visible for manual slideshow */
      }
      .prev {
        left: 10px;
      }
      .next {
        right: 10px;
      }
      .prev:hover, .next:hover {
        background-color: rgba(0, 0, 0, 0.8); /* Darker background on hover */
        transform: scale(1.1); /* Scale up on hover */
      }`,
    },
  ];
  