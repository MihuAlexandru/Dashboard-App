import Calendar from "../../components/Calendar/Calendar";
import Card from "../../components/Card/Card";
import Clock from "../../components/Clock/Clock";
import ToDoSection from "../../components/ToDoSection/ToDoSection";
import Weather from "../../components/Weather/Weather";
import { Provider } from "react-redux";
import { store } from "../../store/store";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "stretch",
        justifyContent: "space-evenly",
        gap: "20px",
      }}
    >
      <Card aria-label="Clock widget">
        <Clock />
      </Card>
      <Card aria-label="Weather widget">
        <Weather />
      </Card>
      <Card>
        <Calendar aria-label="Calendar widget" />
      </Card>
      <Card>
        <Provider store={store}>
          <ToDoSection />
        </Provider>
      </Card>
    </div>
  );
}
