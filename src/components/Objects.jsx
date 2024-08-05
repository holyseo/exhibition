import { ObjectCard } from "./ObjectCard";

const Objects = ({ museum, artworks }) => {
  return museum ? (
    <div>
      <div className="p-5 my-20 text-5xl font-semibold border">
        {museum === "rijks" ? (
          <span>THE RIJKSMUSEUM</span>
        ) : (
          <span>ART INSTITUTE CHICAGO</span>
        )}
      </div>
      <div className="grid mx-auto gap-14 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2">
        {artworks.map((object) => (
          <ObjectCard key={object.id} object={object} />
        ))}
      </div>
    </div>
  ) : (
    <div className="mx-auto mt-20">
      <div className="text-3xl font-semibold ">
        Please choose a museum to see featured art objects
      </div>
    </div>
  );
};

export default Objects;
