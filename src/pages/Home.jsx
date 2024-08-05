import { useContext, useEffect, useState } from "react";
import { fetchData, fetchDataChicago } from "../api";
import { SyncLoader } from "react-spinners";
import { MuseumContext } from "../context/ContextProvider";
import Objects from "../components/Objects";
import { sanitiseObjects } from "../utils/utils";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { museum, setMuseum } = useContext(MuseumContext);
  const [artworks, setArtworks] = useState([]);

  const getDataRijks = async () => {
    setLoading(true);
    const response = await fetchData();
    if (response) {
      const newArtworks = sanitiseObjects(response.artObjects, museum);
      setArtworks(newArtworks);
      console.log(artworks);
    } else {
      console.error("No data found in response:", response);
    }
    setLoading(false);
  };

  const getDataChicago = async () => {
    setLoading(true);
    const response = await fetchDataChicago();
    if (response) {
      const newArtworks = sanitiseObjects(response.data, museum);
      setArtworks(newArtworks);
      console.log(artworks);
    } else {
      console.log("No data from Chicago Museum");
    }
    setLoading(false);
  };

  useEffect(() => {
    setArtworks([]);
    if (museum === "rijks") {
      getDataRijks();
    } else if (museum === "chicago") {
      getDataChicago();
    }
  }, [museum]);

  const handleClick = (m) => {
    setMuseum(m);
  };

  return (
    <div className="flex justify-center p-10 m-auto">
      {loading ? (
        <div className="mt-56 text-center h-svh">
          <SyncLoader
            color="#487eb0"
            size={12}
            speedMultiplier={0.7}
            margin={10}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="py-5 mx-auto ">
            <select
              className="p-2 border border-black cursor-pointer "
              value={museum}
              onChange={(e) => handleClick(e.target.value)}
            >
              <option value="">Select a Museum</option>
              <option value="rijks">Rijks Museum</option>
              <option value="chicago">Art Institute Chicago</option>
            </select>
          </div>
          <Objects museum={museum} artworks={artworks} />
        </div>
      )}
    </div>
  );
};

export default Home;
