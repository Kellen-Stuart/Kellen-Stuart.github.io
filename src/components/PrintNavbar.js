import React from "react";
import SeniorSoftwareEngineerLogo from "./SeniorSoftwareEngineerLogo";
import { Navbar } from "react-bootstrap";
import KellenStuartLogo from "./KellenStuartLogo";

function PrintNavbar() {
  return (
    <>
      <Navbar expand="lg" className="px-3 navbar bg-light-purple pt-5">
        <Navbar.Brand>
          <KellenStuartLogo />
        </Navbar.Brand>
        <div className="ms-auto">
          <Navbar.Brand>
            <SeniorSoftwareEngineerLogo />
          </Navbar.Brand>
        </div>
      </Navbar>
    </>
  );
}

export default PrintNavbar;
