import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Pane from "../../components/Pane/Pane";
import TourCard from "../../components/TourCard/TourCard";
import { useToursContext } from "../../hooks/useToursContext";
function Home() {
  const { tours } = useToursContext();
  const [tourComponent, setTourComponent] = useState();
  useEffect(() => {
    if (!tours) return;
    let comp = [];

    // just get the first 3 tours and make a tourComponent

    for (let i = 0; i < 3; i++) {
      comp.push(<TourCard key={i} tour={tours[i]} />);
    }

    setTourComponent(comp);
  }, [tours]);
  
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
