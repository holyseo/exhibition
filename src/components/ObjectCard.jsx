import { Link } from "react-router-dom";

export const ObjectCard = ({ object }) => {
  return (
    <div key={object.id} className="flex flex-col justify-between rounded-sm ">
      <Link to={`/object/${object.id}`}>
        <div
          className="relative bg-center bg-cover rounded-sm xl:w-72 xl:h-72 xs:w-60 xs:h-60"
          style={{
            backgroundImage: `url(${!object.image ? null : object.image})`,
          }}
        >
          <div className="absolute w-full bottom-0 flex flex-col gap-1 px-5 py-2 text-black bg-[#e3e3e3c3]">
            <div className="text-sm">{object.title}</div>
            <hr />
            <div className="text-sm">{object.artist}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
