import React, { FC, Fragment, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ChamberContainer from "../../components/ChamberContainer/ChamberContainer";
import AboutUsContainer from "../../components/AboutUsContainer/AboutUsContainer";
import ServicesContainer from "../../components/ServicesContainer/ServicesContainer";
import PartnershipContainer from "../../components/PartnershipContainer/PartnershipContainer";
import Footer from "../../components/Footer/Footer";
import EventsContainer from "../../components/EventsContainer/EventsContainer";

const Home: FC = () => {
  return (
    <div className="container">
      <Header />
      <section id="main">
        <ChamberContainer />
      </section>
      <section id="about">
        <AboutUsContainer />
      </section>
      <section id="events">
        <EventsContainer />
      </section>
      <section id="services">
        <ServicesContainer />
      </section>
      <section id="partnership">
        <PartnershipContainer />
      </section>
      <section id="contacts">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
