import { type ComponentPropsWithoutRef } from "react";
import "./Card.css";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  center?: boolean;
};

export default function Card({
  center = true,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`card ${center ? "card--center" : ""} ${className}`.trim()}
    />
  );
}
