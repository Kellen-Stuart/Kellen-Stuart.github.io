import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function PrintEmploymentHeader({ title, company, employmentTimeSpan }) {
  return (
      <div className="row">
        <div className="col-8">
          <h6 className="ms-2">{title}, {company}</h6>
        </div>
        <div className="col-4 text-end">
          <h6 className="me-2">{employmentTimeSpan}</h6>
        </div>
      </div>
  );
}

export default PrintEmploymentHeader;