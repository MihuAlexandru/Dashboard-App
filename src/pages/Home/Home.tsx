import Card from "../../components/Card/Card";
import Clock from "../../components/Home/Clock/Clock";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import "./Home.css";
import ToDoSection from "../../components/Home/ToDoSection/ToDoSection";
import Weather from "../../components/Home/Weather/Weather";
import Calendar from "../../components/Home/Calendar/Calendar";

export default function Home() {
  return (
    <div className="home-grid">
      <div className="home-grid__todo">
        <Card>
          <Provider store={store}>
            <ToDoSection />
          </Provider>
        </Card>
      </div>

      <div className="home-grid__clock">
        <Card aria-label="Clock widget">
          <Clock />
        </Card>
      </div>

      <div className="home-grid__weather">
        <Card aria-label="Weather widget">
          <Weather />
        </Card>
      </div>

      <div className="home-grid__calendar">
        <Card>
          <Calendar aria-label="Calendar widget" />
        </Card>
      </div>
    </div>
  );
}
