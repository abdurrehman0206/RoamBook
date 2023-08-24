import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import TourCard from "../TourCard/TourCard";
function Pane(props) {
  const nav = useNavigate();
  const { paneTitle, paneButtonLead, paneCardComponent, paneHasButton } = props;
  return (
    <div className="pane-container">
      <div className="pane">
        <div className="pane-header">
          <h2>{paneTitle}</h2>
          {paneHasButton && (
            <BsFillArrowRightCircleFill
              className="view-all-icon c-ac1"
              onClick={() => nav(`/${paneButtonLead}`)}
            />
          )}
        </div>
        <div className="pane-body">{paneCardComponent}</div>
      </div>
    </div>
  );
}

export default Pane;
