import {
  DocumentIcon,
  LinkIcon,
  ShareIcon,
  TweetIcon,
  YoutubeIcon,
} from "./Icons";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <>
      <div className="hidden z-200 sm:block w-72 border-r-2 rounded h-screen bg-gray-600 border-black  text-white fixed left-0 top-0 p-4">
        <div>
          <h1 className="text-4xl flex justify-center font-bold ">
            <span className="text-sky-400">Info</span>
            <span className="text-emerald-400">cean</span>
          </h1>
        </div>

        <div className="pt-6 text-lg font-medium  tracking-widest duration-75 ease-in-out">
          <SidebarItem icon={<TweetIcon />} text="Tweet" />
          <SidebarItem icon={<YoutubeIcon />} text="Videos" />
          <SidebarItem icon={<DocumentIcon />} text="Document" />
          <SidebarItem icon={<LinkIcon />} text="Link" />
        </div>
      </div>
    </>
  );
}
