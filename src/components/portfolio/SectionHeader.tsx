export function SectionHeader({ number, label, title }: { number: string; label: string; title: string }) {
  return (
    <header className="section-heading">
      <div className="section-kicker"><span>{number}</span><span>{label}</span></div>
      <h2>{title}</h2>
    </header>
  );
}