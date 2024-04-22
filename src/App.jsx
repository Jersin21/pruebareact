import { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countpage, setCountPage] = useState(1);
  const inputSearch = useRef(null);
  const [textsearch, setTextSearch] = useState("");
  const [photos, setPhotos] = useState([]);
  const API_KEY = "Client-ID vGj0Ajmw-yf-2esp6cKS9pFfYN2wq5cPJ-ewit6SM1U";

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos?per_page=20&query=${countpage}`,
          {
            headers: {
              Authorization: `Client-ID ${API_KEY}`,
            },
          }
        );
        setPhotos(response.data);
      } catch (error) {
        console.error("Error al obtener las fotos:", error);
      }
    };

    fetchPhotos();
  }, [countpage, API_KEY]);

  const fetchPhoto = async () => {
    try {
      const url = `https://api.unsplash.com/photos?query=${textsearch}`;  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });
      setPhotos(response.data);
    } catch (error) {
      console.error("Error al obtener las fotos:", error);
    }
  };

  const onChangeTextSearch = (e) => {
    e.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
    fetchPhoto(); 
  };

  return (
    <div className="container">
      <form action="">
        <input
          ref={inputSearch}
          onChange={onChangeTextSearch}
          type="text"
          name="inputSearch"
          placeholder="Buscar.."
        />
      </form>
      <div className="grid-container">
        {photos.map((photo) => (
          <div key={photo.id} className="grid-item">
            <img
              onClick={() => (window.location.href = photo.links.html)}
              src={photo.urls.small}
              alt=""
            />
            <label>{photo.alt_description}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
