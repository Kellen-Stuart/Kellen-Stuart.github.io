import React from "react";
import { InlineWidget } from "react-calendly";
function Contact() {
  return (
    <>
      <div className="App">
        <InlineWidget url="https://calendly.com/kellenstuart?hide_gdpr_banner=1" />
      </div>
    </>
  );
}

export default Contact;