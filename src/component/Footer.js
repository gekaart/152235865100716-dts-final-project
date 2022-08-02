import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div style={{ width: "50%" }}>
          <h3>My Shop</h3>
          <p>
            MyShop was created using React JS as a final training project
            organized by{" "}
            <a
              style={{ textDecoration: "none" }}
              variant="link"
              rel="noreferrer"
              target="_blank"
              href="https://digitalent.kominfo.go.id/"
            >
              digitalent
            </a>{" "}
            The product data used is dummy data obtained from the rest API{" "}
            <a
              style={{ textDecoration: "none" }}
              variant="link"
              rel="noreferrer"
              target="_blank"
              href="https://fakeapi.platzi.com/"
            >
              platzi.com
            </a>{" "}
            which is also used by other developers simultaneously. The UI
            display used is inspired by the{" "}
            <a
              style={{ textDecoration: "none" }}
              variant="link"
              rel="noreferrer"
              target="_blank"
              href="https://zalora.co.id/"
            >
              ZALORA Indonesia
            </a>{" "}
            website which has been modified as needed. Therefore some features
            and pages cannot be used properly. Thank you for visiting MyShop!!!
          </p>
        </div>
        <div style={{ width: "30%" }}>
          <h4>Services</h4>
          <ul>
            <li>help</li>
            <li>Product Index</li>
            <li>Promo Partner</li>
            <li>Transfer Confirmation</li>
            <li>Contact US</li>
            <li>Status Order</li>
          </ul>
        </div>
        <div style={{ width: "30%" }}>
          <h4>About Us</h4>
          <ul>
            <li>Promotion your brand</li>
            <li>Pers/Media</li>
            <li>Carier</li>
            <li>Responsible Disclosure</li>
            <li>Affiliate Marketing</li>
            <li>Influencer Program</li>
          </ul>
        </div>
        <div>
          <h4>New on My Shop</h4>
          <p>
            Get $100 VOUCHER (plus the latest fashion news and brand launches)
            just by subscribing to our newsletter.
          </p>
          <p>Your Email Address</p>
          <input
            style={{ width: "80%" }}
            placeholder="someone@example.com"
          ></input>
          <p>By registering, you agree to the terms in our Privacy Policy.</p>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: "black",
          paddingBottom: "10px",
        }}
      >
        MyShop created with Proud by Geka Arissta @2022
      </div>
    </>
  );
};

export default Footer;
