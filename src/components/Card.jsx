import { ShareIcon, TrashIcon } from "./Icons";
import { Tweet } from "react-tweet";
import axios from "axios";

export function Card({ type, title, link, id }) {
  const handleDelete = async () => {
    await axios.post("http://localhost:3000/api/v1/content/delete", {
      postId: id,
    });
    console.log("post with the id is deleted ", id);
  };
  return (
    <div
      id={id}
      className="bg-white shadow-md border border-slate-300 rounded-lg p-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex  flex-wrap items-center gap-2">
          <ShareIcon size="5" />
          <div className="font-medium text-lg sm:text-xl">{title}</div>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <ShareIcon size="5" />
          <div onClick={handleDelete}>
            <TrashIcon size="5" />
          </div>
        </div>
      </div>

      <div className="text-sm">
        {type === "tweeter" && (
          <div className="w-full relative  overflow-hidden">
            <Tweet id={link.split("/status/")[1]} />
          </div>
        )}

        {type === "youtube" && (
          <div className="relative w-full pt-[50%] rounded overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={link.replace("watch?v=", "embed/")}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
