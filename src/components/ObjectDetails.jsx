import { useParams } from "react-router-dom";
import { fetchSingleObject, fetchSingleObjectChicago } from "../api";
import { useContext, useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { ExhibitionContext, MuseumContext } from "../context/ContextProvider";
import { sanitiseObjects } from "../utils/utils";

export const ObjectDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [objData, setObjData] = useState("");
  const [objDataChicago, setObjDataChicago] = useState("");
  const { museum } = useContext(MuseumContext);
  const { exhibition, setExhibition } = useContext(ExhibitionContext);
  const [status, setStatus] = useState("");
  const fetchObj = async () => {
    const response = await fetchSingleObject(id);
    try {
      if (response && response.artObject) {
        setObjData(response.artObject);
        // const artwork = sanitiseObjects(response.artObject, museum);
        // setObjData(artwork);
        console.log(response.artObject);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchObjChicago = async () => {
    const response = await fetchSingleObjectChicago(id);
    try {
      if (response) {
        setObjDataChicago(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCollection = (item) => {
    setStatus("");
    checkStatus(item);
    setExhibition((prev) => {
      const exists = prev.some(
        (exhibitionItem) => exhibitionItem.id === item.id
      );

      return !exists ? [...prev, item] : prev;
    });
  };

  const checkStatus = (item) => {
    const existingItem = exhibition.find((e) => e.id === item.id);

    if (existingItem) {
      setStatus("Aready in the collection.");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    } else {
      setStatus("Successfully added!");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };

  useEffect(() => {
    museum === "rijks" ? fetchObj() : fetchObjChicago();
    console.log(exhibition);
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="mt-56 text-center h-svh">
          <SyncLoader
            color="#487eb0"
            size={12}
            speedMultiplier={0.7}
            margin={10}
          />
        </div>
      ) : museum === "rijks" ? (
        <div className="flex justify-center pb-20 ">
          <div className="w-4/5">
            <div className="flex justify-start m-20 bg-[#9c8876]">
              <div className="w-3/5">
                {objData.webImage?.url !== undefined ? (
                  <img
                    src={objData.webImage.url}
                    alt={objData.title}
                    className="object-cover w-full h-full "
                    loading="lazy"
                  />
                ) : (
                  <p>Image is not available at the moment.</p>
                )}
              </div>
              <div className="flex flex-col w-3/5 gap-5 p-20 font-mono">
                <div>Title: {objData.title}</div>
                <hr />
                <div>Label: {objData.longTitle}</div>
                <div>Principal Maker: {objData.principalOrFirstMaker}</div>
                {/* <div>Physical medium: {objData.physicalMedium}</div> */}
                <div>Description: {objData.description}</div>
                <div className="mt-10 font-semibold text-[#224b72] cursor-pointer">
                  <a
                    href={`http://www.rijksmuseum.nl/en/collection/${objData.objectNumber}`}
                    target="_blank"
                  >
                    See more details...
                  </a>
                </div>
                <button
                  onClick={() => handleAddToCollection(objData)}
                  className="self-end p-2 mt-10 text-xs bg-white border border-white rounded-md w-fit"
                >
                  ADD TO COLLECTION
                </button>
                <span className="text-xs text-right text-red-800">
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center pb-20 ">
          <div className="w-4/5">
            <div className="flex justify-start m-20 bg-[#9c8876]">
              <div className="w-3/5">
                <img
                  src={`https://www.artic.edu/iiif/2/${
                    !objDataChicago.image_id
                      ? objDataChicago.alt_image_ids[0]
                      : objDataChicago.image_id
                  }/full/843,/0/default.jpg`}
                  alt={
                    !objDataChicago.thumbnail
                      ? objDataChicago.id
                      : objDataChicago.thumbnail.alt_text
                  }
                  className="object-cover w-full h-full "
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col w-3/5 gap-5 p-20 font-mono">
                <div>Title: {objDataChicago.title}</div>
                <hr />
                <div>
                  Label:
                  {!objDataChicago.short_description ? (
                    " Not available"
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: objDataChicago.short_description,
                      }}
                    ></span>
                  )}
                </div>
                <div>Principal Maker: {objDataChicago.artist_display}</div>
                <div>Physical medium: {objDataChicago.medium_display}</div>
                <div>
                  Description:
                  {!objDataChicago.description ? (
                    " Not available"
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: objDataChicago.description,
                      }}
                    ></span>
                  )}
                </div>
                <div className="mt-10 font-semibold text-[#224b72] cursor-pointer">
                  <a
                    href={`https://www.artic.edu/artworks/${objDataChicago.id}`}
                    target="_blank"
                  >
                    See more details...
                  </a>
                </div>
                <button
                  onClick={() => handleAddToCollection(objDataChicago)}
                  className="self-end p-2 mt-10 text-xs bg-white border border-white rounded-md w-fit"
                >
                  ADD TO COLLECTION
                </button>
                <span className="text-xs text-right text-red-800">
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
