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
        <FontAwesomeIcon widthAuto icon={faK} className="fa-xl"/>{" "}
        <FontAwesomeIcon widthAuto icon={faE} className="fa-2xs" />{" "}
        <FontAwesomeIcon widthAuto icon={faL} className="fa-2xs" />{" "}
        <FontAwesomeIcon widthAuto icon={faL} className="fa-2xs" />{" "}
        <FontAwesomeIcon widthAuto icon={faE} className="fa-2xs" />{" "}
        <FontAwesomeIcon widthAuto icon={faN} className="fa-2xs pe-2" />{" "}
        <FontAwesomeIcon widthAuto icon={faS} className="fa-xl"/>{" "}
        <FontAwesomeIcon widthAuto icon={faT} className="fa-2xs" />{" "}
        <FontAwesomeIcon widthAuto icon={faU} className="fa-2xs" />{" "}
        <FontAwesomeIcon widthAuto icon={faA} className="fa-2xs" />{" "}
        <FontAwesomeIcon widthAuto icon={faR} className="fa-2xs" />{" "}
        <FontAwesomeIcon widthAuto icon={faT} className="fa-2xs" />
        </>
    );
};

export default KellenStuartLogo;