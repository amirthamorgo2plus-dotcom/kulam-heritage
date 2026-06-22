export default function Stars({
  value,
  size = "text-sm",
}: {
  value: number;
  size?: string;
}) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className={`${size} text-kulam-gold`} aria-label={`${value} out of 5`}>
      {"★".repeat(full)}
      {half ? "⯨" : ""}
      <span className="text-stone-300">
        {"★".repeat(5 - full - (half ? 1 : 0))}
      </span>
    </span>
  );
}
