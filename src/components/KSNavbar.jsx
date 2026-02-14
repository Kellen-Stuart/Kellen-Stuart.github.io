import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faGithub,
  faGitlab,
  faStackOverflow,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import {
  faFile,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";
import KellenStuartLogo from "./KellenStuartLogo";
import SeniorSoftwareEngineerLogo from "./SeniorSoftwareEngineerLogo";

function KSNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="px-3 print-hide">
      <Navbar.Brand as={Link} to="/" className="link-black">
        <KellenStuartLogo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Navbar.Brand>
            <SeniorSoftwareEngineerLogo />
          </Navbar.Brand>
          <Nav.Link as={Link} to="/resume">
            <FontAwesomeIcon icon={faFile} className="fa-xl link-black" />
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            <FontAwesomeIcon icon={faAddressCard} className="fa-xl link-black" />
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com/in/kellenstuart" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="fa-xl link" />
          </Nav.Link>
          <Nav.Link href="https://github.com/kellen-stuart" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} className="fa-xl link-black" />
          </Nav.Link>
          <Nav.Link href="https://stackoverflow.com/users/5361412/kellen-stuart" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faStackOverflow} className="fa-xl link-orange" />
          </Nav.Link>
          <Nav.Link href="https://gitlab.com/kellenstuart" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGitlab} className="fa-xl link-orange" />
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com/kellenmstuart" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="fa-xl link-pink" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default KSNavbar;
