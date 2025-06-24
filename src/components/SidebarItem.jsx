export function SidebarItem({ isOpen, onClick, icon, text }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center ${
        isOpen ? "text-emerald-400 ease-in-out" : "hover:text-emerald-400"
      }  p-1`}
    >
      {icon}
      <div className="pl-4 p-6">{text}</div>
    </div>
  );
}
