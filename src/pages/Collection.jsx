import { useContext, useState } from "react";
import { ExhibitionContext } from "../context/ContextProvider";

const Collection = () => {
  const { exhibition, setExhibition } = useContext(ExhibitionContext);
  console.log(exhibition);
  const [timeOut, setTimeOut] = useState(true);
  const handleRemoveFromCollection = (item) => {
    setExhibition((prev) => {
      const newExhibition = prev.filter(
        (exhibitionItem) => exhibitionItem.id !== item.id
      );
      setExhibition(newExhibition);
      return newExhibition;
    });
  };

  const handleAddToExhibition = (item) => {
    setTimeOut(false);
    setTimeout(() => {
      setTimeOut(true);
    }, 3000);
    const storedCurations = JSON.parse(localStorage.getItem("curations")) || [];
    const exists = storedCurations.some(
      (curationItem) => curationItem.id === item.id
    );
    if (!exists) {
      const newCurations = [...storedCurations, item];
      localStorage.setItem("curations", JSON.stringify(newCurations));
      setExhibition((prevExhibition) => [...prevExhibition, item]);
      console.log("Item added successfully");
    } else {
      console.log("Item already exists in curations");
    }
    handleRemoveFromCollection(item);
  };

  return exhibition.length < 1 ? (
    <div>
      <div className="flex items-center justify-center bg-green-400">
        {timeOut ? (
          ""
        ) : (
          <span className="p-5">
            The object has been successfully added to your exhibition!
          </span>
        )}
      </div>
      <div className="flex justify-center mt-20 text-xl font-semibold">
        Your Collection is empty.
      </div>
    </div>
  ) : (
    <div>
      <div className="flex items-center justify-center bg-green-400">
        {timeOut ? (
          ""
        ) : (
          <span className="p-5">
            The object has been successfully added to your exhibition!
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 ">
        {exhibition.map((item) =>
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
                      onClick={() => handleRemoveFromCollection(item)}
                      className="self-end p-2 mt-10 text-xs bg-white border border-white rounded-md w-fit"
                    >
                      Remove from COLLECTION
                    </button>
                    <button
                      onClick={() => handleAddToExhibition(item)}
                      className="self-end p-2 mt-10 text-xs bg-white border border-white rounded-md w-fit"
                    >
                      ADD TO EXHIBITION
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={item.id} className="flex justify-center ">
              <div className="w-full ">
                <div className="flex flex-col justify-start m-10  bg-[#9c8876]">
                  <div className="flex min-h-[425px]">
                    <div className="">
                      <img
                        src={`https://www.artic.edu/iiif/2/${
                          !item.image_id ? item.alt_image_ids[0] : item.image_id
                        }/full/843,/0/default.jpg`}
                        alt={
                          !item.thumbnail ? item.id : item.thumbnail.alt_text
                        }
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col gap-2 p-5 font-mono">
                      <div>Title: {item.title}</div>
                      <hr />
                      {/* <div>
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
                    </div> */}
                      <div>Principal Maker: {item.artist_display}</div>
                      <div>Physical medium: {item.medium_display}</div>
                      <div>
                        Description:
                        {!item.description ? (
                          "Not available"
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.description.slice(0, 85) + "...",
                            }}
                          ></span>
                        )}
                      </div>
                      <div className="mt-2 font-semibold text-[#224b72] cursor-pointer">
                        <a
                          href={`https://www.artic.edu/artworks/${item.id}`}
                          target="_blank"
                        >
                          See more details...
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-5 mb-5">
                    <button
                      onClick={() => handleRemoveFromCollection(item)}
                      className="self-end p-2 text-sm text-white bg-red-600 border-2 border-black rounded-md w-fit"
                    >
                      Remove from COLLECTION
                    </button>
                    <button
                      onClick={() => handleAddToExhibition(item)}
                      className="self-end p-2 mt-10 text-sm text-white bg-green-600 border border-white rounded-md w-fit"
                    >
                      Add to Exhibition
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Collection;
