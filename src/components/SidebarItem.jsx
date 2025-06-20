export function SidebarItem({ icon, text }) {
  return (
    <div className="flex items-center hover:text-emerald-400  p-1">
      {icon}
      <div className="pl-4 p-6">{text}</div>
    </div>
  );
}
