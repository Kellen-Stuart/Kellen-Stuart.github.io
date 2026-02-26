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
      <div className="row mt-1 g-0">
        <div className="col-8 ps-2 pe-2">
          <h6 className="fw-bold">
            {title}, {company}
          </h6>
        </div>
        <div className="col-4 text-end pe-2">
          <h6 className="fw-bold">{employmentTimeSpan}</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="ps-2 pe-2">{paragraphText}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ul className="ps-4 pe-2">
            {bulletPoints.map((bulletPoint, index) => (
              <li key={index}>{bulletPoint}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PrintEmployment;
