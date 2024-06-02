import React from "react";
import { useAuth } from "../src/store/auth";

const Service = () => {
  const { services } = useAuth();

  if (!services) {
    // Handle the case where services is not available yet (loading state)This is a common pattern in React to handle asynchronous data fetching.
    return <p>Loading...</p>;
  }

  if (!Array.isArray(services)) {
    // Handle the case where services is not an array
    // Without these checks, if the services data is not available immediately (perhaps due to asynchronous fetching), the component might try 
    // to map over undefined or a non-array value, leading to the "services.map is not a function" error.
    console.error("Services is not an array:", services);
    return <p>Error loading services</p>;
  }
  // By adding these checks, you ensure that the component handles loading states and potential data structure issues
  //  gracefully, providing a better user experience and avoiding runtime errors.

  return (
    <>
      <div className="servicemain">
        {services.map((currEle, index) => {
          const { price, productId, productName, provider, service, type } =
            currEle;
          return (
            <div className="serv" key={index}>
              <p>
                hello {type}, {price}, {productId}, {productName}, {provider},{" "}
                {service}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Service;
