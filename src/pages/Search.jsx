import { useContext, useEffect, useState } from "react";
import {
  fetchFacetsFromChicago,
  fetchFacetsFromRijks,
  searchByMakerFromChicago,
  searchByMakerFromRijks,
} from "../api";
import { sanitiseObjects } from "../utils/utils";
import { MuseumContext } from "../context/ContextProvider";
import { ObjectCard } from "../components/ObjectCard";
import { SyncLoader } from "react-spinners";

const Search = () => {
  const [maker, setMaker] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingObjects, setLoadingObjects] = useState(false);
  const [facetMaker, setFacetMaker] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const { museum, setMuseum } = useContext(MuseumContext);
  const [objects, setObjects] = useState([]);

  const handleSearch = (maker) => {
    setFacetMaker([]);
    setMaker(maker);
    setShowSuggestion(true);
    maker === "" ? setShowSuggestion(false) : setShowSuggestion(true);
  };

  const getFacetsMaker = async () => {
    setLoading(true);
    if (museum === "rijks") {
      const response = await fetchFacetsFromRijks();
      setFacetMaker(response);
      setLoading(false);
    } else {
      const response = await fetchFacetsFromChicago(maker);
      const result = response.map((res) => ({
        key: res.title,
        value: res.id,
      }));
      setFacetMaker(result);
      setLoading(false);
    }
  };

  const selectFromFacet = (facet) => {
    setMaker(facet);
    search(facet);
    setMaker("");
    setShowSuggestion(false);
  };

  const search = async (maker) => {
    if (museum === "rijks") {
      setLoadingObjects(true);
      const result = await searchByMakerFromRijks(maker);
      try {
        const newArtwork = sanitiseObjects(result.artObjects, museum);
        setObjects(newArtwork);
        setLoadingObjects(false);
        console.log(result.artObjects);
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoadingObjects(true);
      const result = await searchByMakerFromChicago(maker);
      console.log(result);
      try {
        const newArtwork = sanitiseObjects(result, museum);
        setObjects(newArtwork);
        setLoadingObjects(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOptionChange = (e) => {
    setMuseum(e.target.value);
  };

  useEffect(() => {
    getFacetsMaker();
  }, [maker]);

  return (
    <>
      <div className="relative flex flex-col">
        <div className="flex flex-col w-1/3 gap-5 mx-auto mt-20 place-items-center">
          <input
            type="text"
            className="w-2/3 p-1 border"
            placeholder={`${
              museum ? "Type to search" : "Choose museum to search"
            }`}
            value={maker}
            onChange={(e) => handleSearch(e.target.value)}
            disabled={museum ? false : true}
          />
          <div className="absolute max-w-[50%] z-50 mt-12 max-h-96 ">
            {showSuggestion ? (
              loading ? (
                <div className="mt-10 font-semibold">Loading...</div>
              ) : (
                facetMaker.map((facet, index) =>
                  facet.key.toLowerCase().includes(maker) ? (
                    <div
                      key={index}
                      className=" cursor-pointer text-white rounded-lg px-2 py-1 my-1 bg-[#000000c0]"
                      onClick={() => selectFromFacet(facet.key)}
                    >
                      {facet.key}
                    </div>
                  ) : null
                )
              )
            ) : null}
          </div>
          <div className="flex justify-between w-1/3">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="rijks"
                  checked={museum === "rijks" ? true : false}
                  onChange={handleOptionChange}
                />
                <span className="p-2">RJKS</span>
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="chicago"
                  checked={museum === "chicago" ? true : false}
                  onChange={handleOptionChange}
                />
                <span className="p-2">CHICAGO</span>
              </label>
            </div>
          </div>
        </div>
        <div className="relative grid gap-5 mx-auto mt-20 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
          {loadingObjects ? (
            <div className="absolute my-20 text-center">
              <SyncLoader
                color="#487eb0"
                size={10}
                speedMultiplier={0.7}
                margin={8}
              />
            </div>
          ) : (
            objects.map((object) => (
              <ObjectCard key={object.id} object={object} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
