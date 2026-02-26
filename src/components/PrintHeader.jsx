import React from "react";

function PrintHeader({ title }) {
  return (
    <div className="row bg-light-purple">
        <div className="col-12 ps-2 pe-2">
            <h4 className="mb-0">{title}</h4>
        </div>
    </div>
  );
}

export default PrintHeader;
