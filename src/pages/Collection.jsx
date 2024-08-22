import { useContext, useEffect, useState } from "react";
import { ExhibitionContext } from "../context/ContextProvider";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const { exhibition, setExhibition } = useContext(ExhibitionContext);
  const [timeOut, setTimeOut] = useState(true);
  const [existing, setExisting] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };
    fetchUser();
  }, []);

  const handleRemoveFromCollection = (item) => {
    setExhibition((prev) => {
      const newExhibition = prev.filter(
        (exhibitionItem) => exhibitionItem.id !== item.id
      );
      setExhibition(newExhibition);
      return newExhibition;
    });
  };

  const handleAddToExhibition = async (item) => {
    if (user === null) {
      alert("Please login first to save an art object to Exhibition");
      navigate("/login");
      return;
    }

    setTimeOut(false);
    setTimeout(() => {
      setTimeOut(true);
    }, 3000);

    const sourceType = typeof item.id === "string" ? "rijksmuseum" : "chicago";

    const itemDescription =
      typeof item.id === "string" ? item.description : item.medium_display;

    const principalMaker =
      typeof item.id === "string"
        ? item.principalOrFirstMaker
        : item.artist_display;

    const webImage =
      typeof item.id === "string"
        ? item.webImage.url
        : `https://www.artic.edu/iiif/2/${
            !item.image_id ? item.alt_image_ids[0] : item.image_id
          }/full/843,/0/default.jpg`;

    const moreInfoLink =
      typeof item.id === "string"
        ? `http://www.rijksmuseum.nl/en/collection/${item.objectNumber}`
        : `https://www.artic.edu/artworks/${item.id}`;

    const { data: existingItems, error: checkError } = await supabase
      .from("curations")
      .select("moreinfolink")
      .eq("moreinfolink", moreInfoLink);

    if (checkError) {
      console.log("Error checking for existing item:", checkError);
      return;
    }

    if (existingItems && existingItems.length > 0) {
      setExisting(true);
      return;
    }

    const { data, error } = await supabase.from("curations").insert({
      user_id: user.id,
      title: item.title,
      principalorfirstmaker: principalMaker,
      description: itemDescription,
      webimage: webImage,
      moreinfolink: moreInfoLink,
      source_type: sourceType,
    });

    if (error) {
      console.error("Error adding item to exhibition:", error);
    } else {
      handleRemoveFromCollection(item);
      // setExisting(false);
    }
  };

  return exhibition.length < 1 ? (
    <div>
      <div
        className={`flex items-center justify-center ${
          existing ? "bg-red-400" : "bg-green-400"
        }`}
      >
        {timeOut ? (
          ""
        ) : (
          <span className="p-5">
            {existing
              ? "The object is already saved in your exhibition"
              : "The object has been successfully added to your exhibition!"}
          </span>
        )}
      </div>
      <div className="flex justify-center mt-20 text-xl font-semibold">
        Your Collection is empty.
      </div>
    </div>
  ) : (
    <div>
      <div
        className={`flex items-center justify-center ${
          existing ? "bg-red-400" : "bg-green-400"
        }`}
      >
        {timeOut ? (
          ""
        ) : (
          <span className="p-5">
            {existing
              ? "The object is already saved in your exhibition"
              : "The object has been successfully added to your exhibition!"}
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 ">
        {exhibition.map((item) =>
          typeof item.id === "string" ? (
            <div key={item.id} className="flex justify-center ">
              <div className="w-full">
                <div className="flex flex-col justify-start m-10 bg-[#9c8876]">
                  <div className="flex min-h-[425px]">
                    <div className="max-w-[290px]">
                      {item.webImage.url !== undefined ? (
                        <img
                          src={item.webImage.url}
                          alt={item.title}
                          loading="lazy"
                        />
                      ) : (
                        <p>Image is not available at the moment.</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 p-5 font-mono">
                      <div>Title: {item.title}</div>
                      <hr />
                      <div>Principal Maker: {item.principalOrFirstmaker}</div>
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
                          href={`http://www.rijksmuseum.nl/en/collection/${item.objectNumber}`}
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
                      <div>Principal Maker: {item.artist_display}</div>
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
