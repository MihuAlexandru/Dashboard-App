import Card from "../../components/Card/Card";
import Clock from "../../components/Clock/Clock";

export default function Home() {
  return (
    <>
      <Card aria-label="Clock widget">
        <Clock />
      </Card>
    </>
  );
}
