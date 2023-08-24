import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
function Tour() {
  const { tourId } = useParams();

  useLayoutEffect(() => {}, [tourId]);

  return <div className="tour-container">{tourId}</div>;
}

export default Tour;
