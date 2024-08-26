import { useToken } from "../store/tokenDistributor";

const Service = () => {
  const { services } = useToken();

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid-three-cols">
        {Array.isArray(services) && services.length > 0 ? (
          services.map(({ price, description, provider, service, imageUrl, _id }, index) => (
            <div className="card" key={`${_id}-${index}`}>
              <div className="card-img">
                <img
                  src={imageUrl || "https://thumbs.dreamstime.com/b/conceptual-hand-writing-showing-our-services-concept-meaning-occupation-function-serving-intangible-products-male-wear-160644151.jpg"}
                  alt="Service"
                  width={200}
                />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Unable to fetch data or no services available.</p>
        )}
      </div>
    </section>
  );
};

export default Service;
