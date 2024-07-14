import React, { useEffect } from "react";
import PrintNavbar from "./PrintNavbar";
import PrintContactInfo from "./PrintContactInfo";
import PrintHeader from "./PrintHeader";
import PrintEmployment from "./PrintEmployment";

const PrintResume = () => {
    useEffect(() => {
        window.print();
    },[]);
  return (
    <>
      <PrintNavbar />
      <PrintContactInfo
        contacts={[
          "[REDACTED_PHONE]",
          "[REDACTED_EMAIL]",
          "linkedin.com/in/kellenstuart",
        ]}
      />
      <div className="row ms-1">
        <p className="mt-5">
          Senior leader with a track record of success in translating business
          challenges and changing user needs into innovative new features and
          products for companies including Tasso Inc. and Lockheed Martin.
          Highly skilled in leveraging cross-functional collaboration to ensure
          the on-time completion of end-to-end software development and
          engineering lifecycles.
        </p>
      </div>
      <PrintHeader title="Professional Experience" />
      <PrintEmployment
        title="Senior Software Engineer"
        company="Tasso Inc."
        employmentTimeSpan="2021 - Present"
        paragraphText="Led the design, development, and introduction of powerful new tools and exciting features which directly resulted in significant revenue growth primarily leveraging technologies such as Typescript, React, and
Python. Additionally, certain projects required deeply diving into data services written in AWS CDK as well as stateful, realtime services built with Nest.JS."
        bulletPoints={[
          "Led the planning and execution of projects such as the TassoCare API https://docs.tassocare.com/ and the TassoCare Portal https://portal.tassocare.com/, which required consistent cross-functional collaboration and communication to ensure the on-time, within budget completion of all objectives.",
          "Enabled the business development team to fulfill orders without needing engineers to hardcode promotions into code (resulting in the biggest order growth to date).",
          "Spearheaded the founding of a full testing setup by introducing unit and integration testing using Cypress, Jest, Gherkin and Selenium which directly resulted in the ability to author end-to-end integration tests and significantly reduce bugs.",
          "Architected a fully scalable feature flagging solution using AWS ELB / Fargate / VPC which enabled Tasso to develop new features in parallel with the QA team faster.",
          "Finished planned work ahead of schedule and used the extra 2 weeks before the 2022 winter holiday season to introduce bulk ordering which increased revenue by 300k.",
          "Ran ML experiments within related to revenue to generate more accurate predictions for leadership.",
          "Participated in hackathons to greenfield new ideas and features for the company; built a GraphQL API for the TassoCare Portal to improve data accessibility for frontend engineers.",
        ]}
      />
      <PrintEmployment
        title="Software Engineer"
        company="Tyler Technologies"
        employmentTimeSpan="2018-2021"
        paragraphText="Played an active role as a member of a team of engineers tasked with developing C# .NET web
applications, mobile applications, and a GraphQL API essential for the success of InSite."
        bulletPoints={[
          "Recognized by executive team for the facilitation of company pivots in response to the new challenges of the COVID-19 pandemic.",
          "Authored hundreds of thousands of lines of code during the creation of new tools essential for maintaining business operations during the pandemic.",
          "Developed a C# .NET full stack applications using Entity Framework, TypeScript, and Microsoft SQL Server.",
        ]}
      />

      <PrintEmployment
        title="Software Engineer II"
        company="Lockheed Martin"
        employmentTimeSpan="2015 - 2018"
        paragraphText="Supported a missile defense system by integrating new technologies."
        bulletPoints={[
            "Supported Java development of missile defense system.",
            "Upgraded internal employee tracking system stored in Excel by building a new Angular web application with a Mongo DB supporting advanced features.",
            "Automated repititive tasks for the IT team by writing scripts in Powershell.",
            "Administrator of highly secure RedHat Linux systems which requires a deep understand of unix-like systems."
        ]}
      />

      <PrintHeader title="Education" />
      <div className="row ms-1">
        <p>
          <span className="fw-bold">Bachelor of Computer Science</span>, Western
          State Colorado University, 2016 - GPA 3.94/4.0 Summa Cum Laude
        </p>
      </div>

      <PrintHeader title="Certifications" />
      <div className="row ms-1">
        <p>
          <span className="fw-bold">CompTIA Security +</span>, 2016
        </p>
      </div>
    </>
  );
};

export default PrintResume;
