import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div style={{ width: "40%" }}>
          <h3>My Shop</h3>
          <p>
            As the Online Fashion Center in Asia, we create endless style
            possibilities by expanding our product range, from international
            products to coveted local products. We make you the center. With My
            Shop, You Own Now.
          </p>
        </div>
        <div style={{ width: "20%" }}>
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
        <div style={{ width: "20%" }}>
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
        MyShop created with Love @2022
      </div>
    </>
  );
};

export default Footer;
