import React from "react";

const PrintEmploymentDescription = ({ paragraphText, bulletPoints }) => {
  return (
    <>
      <div className="row ms-2">
        <p>{paragraphText}</p>
      </div>
    <div className="row ms-5">
        <ul>
            {bulletPoints.map((bulletPoint) => (
                <li>{bulletPoint}</li>
            ))}
        </ul>
    </div>
    </>
  );
}

export default PrintEmploymentDescription;
