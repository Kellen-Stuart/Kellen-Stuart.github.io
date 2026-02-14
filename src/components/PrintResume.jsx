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
          "linkedin.com/in/kellenstuart",
        ]}
      />
      <div className="row ms-1">
        <p className="mt-5">
          Senior leader with a track record of success in translating business
          challenges and changing user needs into innovative new features and
          products for companies including Tech Disc, Tasso Inc., and Lockheed
          Martin.
          Highly skilled in leveraging cross-functional collaboration to ensure
          the on-time completion of end-to-end software development and
          engineering lifecycles.
        </p>
      </div>
      <PrintHeader title="Professional Experience" />
      <PrintEmployment
        title="Senior Full Stack Developer"
        company="Tech Disc"
        employmentTimeSpan="Dec 2025 - Present"
        paragraphText="Build and maintain a web platform for a disc golf simulator that helps users improve throw performance through actionable throw analytics."
        bulletPoints={[
          "Led Bluetooth connectivity hardening to improve reliability for production device-to-web communication.",
          "Building support for connecting multiple Bluetooth-enabled discs to a single web application session.",
          "Developing end-to-end features across React frontends and Node.js services.",
          "Performed security vulnerability patching by remediating dependency and package vulnerabilities in the web application stack.",
          "Working within a modern cloud and developer workflow including Google Cloud Firebase Storage, TypeScript, GitHub Actions, WSL2 Ubuntu, Zsh, and Copilot.",
        ]}
      />
      <PrintEmployment
        title="Senior Full Stack Developer"
        company="Tasso Inc."
        employmentTimeSpan="Dec 2021 - Nov 2024"
        paragraphText="Led the design, development, and launch of high-impact tools and features leveraging TypeScript, React, Python, AWS CDK, and Nest.JS."
        bulletPoints={[
          "Led the planning and execution of projects such as the TassoCare API https://docs.tassocare.com/ and the TassoCare Portal https://portal.tassocare.com/, which required consistent cross-functional collaboration and communication to ensure the on-time, within budget completion of all objectives.",
          "Enabled the services team to fulfill orders by adding features and fixing bugs in the TassoCare Admin Portal.",
          "Spearheaded end-to-end integration testing using Jest, Gherkin and Selenium to ensure quality in the TassoCare product line-up.",
          "Architected a fully scalable feature flagging solution using Gitlab / Unleash / AWS CDK which enabled Tasso to develop new features quickly without immediately releasing them.",
          "Participated in hackathons to greenfield new ideas and features for the company; built a GraphQL API to demonstrate the power of GraphQL and Entity Framework to the team.",
          "Worked closely with product management in an Agile environment to ensure the timely delivery of features and bug fixes.",
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
          "Developed C# .NET Core full stack applications using Blazor / Razor Pages, Entity Framework, TypeScript, and Microsoft SQL Server.",
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
