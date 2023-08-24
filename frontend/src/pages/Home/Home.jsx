import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Pane from "../../components/Pane/Pane";
import TourCard from "../../components/TourCard/TourCard";
function Home() {
  const [tourComponent, setTourComponent] = useState();
  useEffect(() => {
    let comp = [];
    for (let i = 0; i < 3; i++) {
      comp.push(<TourCard />);
    }
    setTourComponent(comp);
  }, []);
  return (
    <div className="home-container">
      <div className="home">
        <Hero />
        <Pane
          paneTitle="Latest Tour's"
          paneButtonLead="tours"
          paneCardComponent={tourComponent}
          paneHasButton={true}
        />
        <Pane
          paneTitle="Latest Tour's"
          paneButtonLead="tours"
          paneCardComponent={tourComponent}
          paneHasButton={true}
        />
      </div>
    </div>
  );
}

export default Home;
