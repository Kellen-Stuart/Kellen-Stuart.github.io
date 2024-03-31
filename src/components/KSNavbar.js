import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGitlab,
  faStackOverflow,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import {
  faK,
  faS,
  faE,
  faL,
  faN,
  faT,
  faU,
  faA,
  faR,
  faFile,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";

function KSNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand href="/" className="link-black">
        <FontAwesomeIcon icon={faK} className="fa-xl"/>{" "}
        <FontAwesomeIcon icon={faE} className="fa-2xs" />{" "}
        <FontAwesomeIcon icon={faL} className="fa-2xs" />{" "}
        <FontAwesomeIcon icon={faL} className="fa-2xs" />{" "}
        <FontAwesomeIcon icon={faE} className="fa-2xs" />{" "}
        <FontAwesomeIcon icon={faN} className="fa-2xs pe-2" />{" "}
        <FontAwesomeIcon icon={faS} className="fa-xl"/>{" "}
        <FontAwesomeIcon icon={faT} className="fa-2xs" />{" "}
        <FontAwesomeIcon icon={faU} className="fa-2xs" />{" "}
        <FontAwesomeIcon icon={faA} className="fa-2xs" />{" "}
        <FontAwesomeIcon icon={faR} className="fa-2xs" />{" "}
        <FontAwesomeIcon icon={faT} className="fa-2xs" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/resume">
            <Nav.Link>
              <FontAwesomeIcon icon={faFile} className="fa-xl link-black" />
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contact">
            <Nav.Link>
              <FontAwesomeIcon icon={faAddressCard} className="fa-xl link-black" />
            </Nav.Link>
          </LinkContainer>
          <Nav.Link href="https://www.linkedin.com/in/kellenstuart">
            <FontAwesomeIcon icon={faLinkedin} className="fa-xl link" />
          </Nav.Link>
          <Nav.Link href="https://github.com/kellen-stuart">
            <FontAwesomeIcon icon={faGithub} className="fa-xl link-black" />
          </Nav.Link>
          <Nav.Link href="https://stackoverflow.com/users/5361412/kellen-stuart">
            <FontAwesomeIcon icon={faStackOverflow} className="fa-xl link-orange" />
          </Nav.Link>
          <Nav.Link href="https://gitlab.com/kellenstuart">
            <FontAwesomeIcon icon={faGitlab} className="fa-xl link-orange" />
          </Nav.Link>
          <Nav.Link href="https://www.instagram.com/kellenmstuart">
            <FontAwesomeIcon icon={faInstagram} className="fa-xl link-pink" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default KSNavbar;
