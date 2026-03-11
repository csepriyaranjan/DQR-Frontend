import type { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold text-black mt-1">{value}</p>
      </div>

      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        <Icon className="text-2xl text-black" />
      </div>
    </div>
  );
}
