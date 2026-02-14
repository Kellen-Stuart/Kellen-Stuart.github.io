import React from "react";
import ContactButton from "./ContactButton";

function CoverLetter() {
  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <img
            src="/kellen1.png"
            className="img-fluid img-thumbnail"
            alt="Kellen"
          />
          <div className="row">
              <ContactButton />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <hr />
          <div className="row">
            <h3>
              Kellen Stuart{" "}
              <small className="text-muted">Senior Software Engineer</small>
            </h3>
          </div>
          <hr />
          <div className="row mt-3">
            <h3>Education</h3>
            <p>
              Kellen graduated from{" "}
              <a href="https://western.edu/" className="link">
                Western State Colorado University
              </a>{" "}
              with a bachelor in computer science; Kellen was awarded Summa Cum
              Laude as one of the top performers of his computer science class.
              Kellen was lucky enough to have been a student of professor{" "}
              <a
                href="https://archive.gunnisontimes.com/obituaries/john-peterson"
                className="link"
              >
                John Peterson
              </a>{" "}
              before his untimely death in 2017. John Peterson graduated from
              Yale and is known for contributing to the creation and
              documentation for the functional programming language Haskell.
            </p>
          </div>
          <div className="row">
            <h3>Professional Experience</h3>
            <p>
              Kellen has been working professionally for 8 years as a software
              engineer. Beginning with an internship at Lockheed Martin, Kellen
              gained experience in multiple industries and programming
              languages.
            </p>
            <p>
              Kellen began his career at Lockheed Martin where he worked on a
              missile defense project. He worked closely with the IT team and
              gained a deep knowledge of system administration while also coding
              an application to track internal hires / departs.
            </p>
            <p>
              In 2018, Kellen moved to Tyler Technologies. He would switch focus
              from defense to local government. Kellen was responsible for
              writing custom payment processing software (similar to Stripe) for
              processing users utility bills. This allowed Tyler Technologies to
              save cost on payment processor fees which greatly increased
              revenue for the company and thus increased revenue for
              shareholders.
            </p>
            <p>
              In 2022, Kellen moved to Tasso Inc. He would switch focus to
              biomedical technologies.{" "}
              <a href="https://www.tassoinc.com/" className="link">
                Tasso
              </a>{" "}
              is a startup company that makes devices to draw blood via suction
              (in a painless manner). This revolutionary technology will allow
              people to get blood tests from the comfort of their home. Kellen
              works on API's and frontends to enable customers to place orders
              for said devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverLetter;
