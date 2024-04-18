import React from 'react';
import {
  faK,
  faS,
  faE,
  faL,
  faN,
  faT,
  faU,
  faA,
  faR
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const KellenStuartLogo = () => {
    return (
        <>
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
        </>
    );
};

export default KellenStuartLogo;