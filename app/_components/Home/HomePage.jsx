import React from "react";
import Hero from "../Hero";
import Navbar from "../Navbar";
import Banner from "../Banner";
import { TrustCompany } from "../TrustCompanyLogo";
import { Feture } from "../Feture";
import { Testimonial } from "../Testimonial";
import Promotion from "../Promotion";
import FAQ from "../FAQsections";
import Footer from "../Footer";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Navbar />
      <Hero />
      <TrustCompany />
      <Feture />
      <Promotion />
      <Testimonial />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
