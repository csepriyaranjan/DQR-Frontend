interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="app-header">
      <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
      <span className="app-header-status"><i /> Live workspace</span>
    </div>
  );
}
