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
    <div className="app-stat-card">
      <div>
        <p className="app-stat-label">{title}</p>
        <p className="app-stat-value">{value}</p>
      </div>

      <div className="app-stat-icon">
        <Icon />
      </div>
    </div>
  );
}
