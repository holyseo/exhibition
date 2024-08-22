import { useContext, useEffect, useState } from "react";
import { ExhibitionContext } from "../context/ContextProvider";
import { supabase } from "../utils/supabaseClient";
const Exhibition = () => {
  const { exhibition, setExhibition } = useContext(ExhibitionContext);
  const [curations, setCurations] = useState([]);
  const [timeOut, setTimeOut] = useState(true);
  const [user, setUser] = useState(null);

  const loadCurations = async (session) => {
    const user = session?.user;
    setUser(user);
    if (user) {
      const { data, error } = await supabase
        .from("curations")
        .select("*")
        .eq("user_id", user.id);
      if (error) console.error("Error fetching curations:", error);
      else setCurations(data);
    } else {
      setCurations([]);
    }
  };

  const handleRemoveFromExhibition = async (item) => {
    const { error } = await supabase
      .from("curations")
      .delete()
      .eq("id", item.id);
    if (error) {
      console.log("Error removing item from exhibition: ", error);
    } else {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      loadCurations(session);
    }

    setTimeOut(false);
    setTimeout(() => {
      setTimeOut(true);
    }, 3000);
  };

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => loadCurations(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      loadCurations(session);
    });
    return () => subscription?.unsubscribe();
  }, []);

  return !user ? (
    <div className="flex justify-center mt-20 text-xl font-semibold">
      <div>Please login to see your saved artworks.</div>
    </div>
  ) : (
    <div className="flex justify-center mt-20 text-xl font-semibold">
      {curations.length > 0 ? (
        <div className="flex items-center justify-center bg-green-400">
          {timeOut ? (
            ""
          ) : (
            <span className="p-5">
              The object has been successfully removed from your exhibition!
            </span>
          )}
        </div>
      ) : (
        <div>Your Exhibition is empty.</div>
      )}

      <div className="grid grid-cols-3">
        {curations.map((item) =>
          typeof item.id === "string" ? (
            <div key={item.id} className="flex justify-center ">
              <div className="">
                <div className="flex flex-col justify-start m-10 bg-[#cfcfcf]">
                  <div className="flex min-h-64 ">
                    <div className="max-h-[300px] w-full">
                      {item.webImage.url !== undefined ? (
                        <img
                          src={item.webImage.url}
                          alt={item.title}
                          loading="lazy"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <p>Image is not available at the moment.</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 p-5 font-mono min-h-64 ">
                    <div>Title: {item.title}</div>
                    <hr />
                    {/* <div>Label: {item.longTitle}</div> */}
                    <div>Principal Maker: {item.principalOrFirstMaker}</div>
                    {/* <div>Physical medium: {item.physicalMedium}</div> */}
                    <div>
                      Description:
                      {!item.plaqueDescriptionEnglish ? (
                        "Not available"
                      ) : (
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              item.plaqueDescriptionEnglish.slice(0, 90) +
                              "...",
                          }}
                        ></span>
                      )}
                      <div className="mt-5 font-semibold text-[#224b72] cursor-pointer">
                        <a href={item.moreInfoLink} target="_blank">
                          See more details...
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-5 m-5">
                    <button
                      onClick={() => handleRemoveFromExhibition(item)}
                      className="self-end p-2 text-sm text-white bg-red-600 border-2 border-black rounded-md w-fit"
                    >
                      Remove from EXHIBITION
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={item.id} className="flex justify-center ">
              <div className="w-full">
                <div className="flex flex-col justify-start m-10 bg-[#cfcfcf]">
                  <div className="flex min-h-64 ">
                    <div className="max-h-[300px] w-full">
                      <img
                        src={item.webimage}
                        alt={
                          !item.thumbnail ? item.id : item.thumbnail.alt_text
                        }
                        loading="lazy"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 p-5 font-mono min-h-64">
                    <div>Title: {item.title}</div>
                    <hr />
                    <div>
                      Principal Maker: {item.description.slice(0, 25) + "..."}
                    </div>
                    {/* <div>Physical medium: {item.medium_display}</div> */}
                    <div>
                      Description:
                      {!item.publication_history ? (
                        " Not available"
                      ) : (
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              item.publication_history.slice(0, 85) + "...",
                          }}
                        ></span>
                      )}
                    </div>
                    <div className="mt-5 font-semibold text-[#224b72] cursor-pointer">
                      <a
                        href={`https://www.artic.edu/artworks/${item.id}`}
                        target="_blank"
                      >
                        See more details...
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-end gap-5 m-5">
                    <button
                      onClick={() => handleRemoveFromExhibition(item)}
                      className="self-end p-2 text-sm text-white bg-red-600 border-2 border-black rounded-md w-fit"
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
    </div>
  );
};

export default Exhibition;
