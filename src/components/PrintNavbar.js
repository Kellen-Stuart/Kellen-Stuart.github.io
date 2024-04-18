import React from "react";
import SeniorSoftwareEngineerLogo from "./SeniorSoftwareEngineerLogo";
import { Navbar } from "react-bootstrap";
import KellenStuartLogo from "./KellenStuartLogo";

function PrintNavbar() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="px-3 navbar">
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
