import Carousel from "react-bootstrap/Carousel";

const Slider = () => {
  return (
    <Carousel className="slider">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.maya.ph/hubfs/Maya%20deals%202022/Maya%20deals%20page%202022/June%202022/Zalora-x-Maya-Deals-1.jpg"
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.landbank.com/images/news_awards/1655454367_Web%20-%20Visa%20x%20Zalora.jpg"
          alt="Second slide"
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mancode.id/media/images/Sambut_Lebaran_Zalora_Tebar_Promo.2e16d0ba.fill-1200x800.jpg"
          alt="Third slide"
        />

        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
