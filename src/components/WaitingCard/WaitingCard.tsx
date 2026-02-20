import "./WaitingCard.css";

export default function WaitingCard({ text }: { text: string }) {
  return (
    <div
      className="wait-root wait-overlay"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="wait-scrim" aria-hidden="true" />
      <div className="wait-box">
        <div className="wait-spinner" />
        <div className="wait-label">{text}</div>
      </div>
    </div>
  );
}
