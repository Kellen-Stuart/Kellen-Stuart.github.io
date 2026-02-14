import React from "react";

const PrintEmployment = ({
  title,
  company,
  employmentTimeSpan,
  paragraphText,
  bulletPoints,
}) => {
  return (
    <>
      <div className="row mt-1">
        <div className="col-8">
          <h6 className="ms-2 fw-bold">
            {title}, {company}
          </h6>
        </div>
        <div className="col-4 text-end">
          <h6 className="me-2 fw-bold">{employmentTimeSpan}</h6>
        </div>
      </div>
      <div className="row">
        <p className="ms-2">{paragraphText}</p>
      </div>
      <div className="row">
        <ul className="ms-5">
          {bulletPoints.map((bulletPoint, index) => (
            <li key={index}>{bulletPoint}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PrintEmployment;
