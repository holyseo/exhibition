import { useContext, useEffect, useState } from "react";
import { ExhibitionContext } from "../context/ContextProvider";
const Exhibition = () => {
  const { exhibition, setExhibition } = useContext(ExhibitionContext);
  console.log(exhibition);

  const [curations, setCurations] = useState([]);

  const getExhibitionFromStorage = () => {
    const storedExhibition = localStorage.getItem("curations");
    return storedExhibition ? JSON.parse(storedExhibition) : [];
  };

  const handleRemoveFromExhibition = (item) => {
    const storedCurations = JSON.parse(localStorage.getItem("curations")) || [];
    const newCurations = storedCurations.filter(
      (curationItem) => curationItem.id !== item.id
    );
    localStorage.setItem("curations", JSON.stringify(newCurations));
    setExhibition((prevExhibition) =>
      prevExhibition.filter((exhibitionItem) => exhibitionItem.id !== item.id)
    );
    console.log("Item removed successfully");
  };

  useEffect(() => {
    const storedItems = getExhibitionFromStorage();
    setCurations(storedItems);
  }, [localStorage.getItem("curations")]);

  return curations.length < 1 ? (
    <div className="flex justify-center mt-20 text-xl font-semibold">
      Your Exhibition is empty.
    </div>
  ) : (
    <div>
      {curations.map((item) =>
        typeof item.id === "string" ? (
          <div key={item.id} className="flex justify-center pb-20 ">
            <div className="w-4/5">
              <div className="flex justify-start m-20 bg-[#9c8876]">
                <div className="w-3/5">
                  {item.webImage.url !== undefined ? (
                    <img
                      src={item.webImage.url}
                      alt={item.title}
                      className="object-cover w-full h-full "
                      loading="lazy"
                    />
                  ) : (
                    <p>Image is not available at the moment.</p>
                  )}
                </div>
                <div className="flex flex-col w-3/5 gap-5 p-20 font-mono">
                  <div>Title: {item.title}</div>
                  <hr />
                  <div>Label: {item.longTitle}</div>
                  <div>Principal Maker: {item.principalOrFirstmaker}</div>
                  {/* <div>Physical medium: {item.physicalMedium}</div> */}
                  <div>Description: {item.description}</div>
                  <div className="mt-10 font-semibold text-[#224b72] cursor-pointer">
                    <a href={item.moreInfoLink} target="_blank">
                      See more details...
                    </a>
                  </div>
                  <button
                    onClick={() => handleRemoveFromExhibition(item)}
                    className="self-end p-2 mt-10 text-xs bg-white border border-white rounded-md w-fit"
                  >
                    Remove from EXHIBITION
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key={item.id} className="flex justify-center ">
            <div className="w-4/5">
              <div className="flex justify-start m-20 bg-[#9c8876]">
                <div className="h-auto">
                  <img
                    src={`https://www.artic.edu/iiif/2/${
                      !item.image_id ? item.alt_image_ids[0] : item.image_id
                    }/full/843,/0/default.jpg`}
                    alt={!item.thumbnail ? item.id : item.thumbnail.alt_text}
                    className="h-48"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5 font-mono">
                  <div>Title: {item.title}</div>
                  <hr />
                  <div>
                    Label:
                    {!item.short_description ? (
                      " Not available"
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.short_description,
                        }}
                      ></span>
                    )}
                  </div>
                  <div>Principal Maker: {item.artist_display}</div>
                  <div>Physical medium: {item.medium_display}</div>
                  <div>
                    Description:
                    {!item.description ? (
                      " Not available"
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></span>
                    )}
                  </div>
                  <div className="mt-10 font-semibold text-[#224b72] cursor-pointer">
                    <a
                      href={`https://www.artic.edu/artworks/${item.id}`}
                      target="_blank"
                    >
                      See more details...
                    </a>
                  </div>
                  <button
                    onClick={() => handleRemoveFromExhibition(item)}
                    className="self-end p-2 mt-10 text-xs bg-white border border-white rounded-md w-fit"
                  >
                    Remove from EXHIBITION
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Exhibition;
