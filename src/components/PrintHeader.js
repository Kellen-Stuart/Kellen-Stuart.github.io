import React from "react";

function PrintHeader({ title }) {
  return (
    <div className="row bg-light-purple">
        <div className="col-8 ms-2">
            <h4>{title}</h4>
        </div>
    </div>
  );
}

export default PrintHeader;
