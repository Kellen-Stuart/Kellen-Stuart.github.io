import React from "react";

const PrintContactInfo = ({ contacts }) => {
  return (
    <div className="row">
      <div className="col-12 ps-1 pe-2 fs-6">
        {contacts.map((contact, index) => (
          <span key={index}>
            <span className="fs-6">{contact}</span>
            {index < contacts.length - 1 && <span> | </span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PrintContactInfo;
