import React, { useEffect } from "react";
import PrintNavbar from "./PrintNavbar";
import PrintContactInfo from "./PrintContactInfo";
import PrintHeader from "./PrintHeader";
import PrintEmployment from "./PrintEmployment";

const PrintResume = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const isPdfMode = searchParams.get("mode") === "pdf";
    const previousTitle = document.title;
    document.title = "Kellen Stuart - Resume";

    if (isPdfMode) {
      return () => {
        document.title = previousTitle;
      };
    }

    const printTimeout = window.setTimeout(() => {
      window.print();
    }, 0);

    return () => {
      window.clearTimeout(printTimeout);
      document.title = previousTitle;
    };
  }, []);
  return (
    <div className="container-fluid print-resume-page">
      <PrintNavbar />
      <PrintContactInfo
        contacts={[
          "linkedin.com/in/kellenstuart",
        ]}
      />
      <div className="row">
        <div className="col-12">
          <p className="mt-5 ps-1 pe-2">
            Senior leader with a track record of success in translating business
            challenges and changing user needs into innovative new features and
            products for companies including Tech Disc, Tasso Inc., and Lockheed
            Martin.
            Highly skilled in leveraging cross-functional collaboration to ensure
            the on-time completion of end-to-end software development and
            engineering lifecycles.
          </p>
        </div>
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
        paragraphText="Led the design, development, and launch of high-impact tools and features leveraging TypeScript, React, Python, C# .NET, Entity Framework Core, AWS CDK, and Nest.JS."
        bulletPoints={[
          "Led the planning and execution of projects such as the TassoCare API https://docs.tassocare.com/ and the TassoCare Portal https://portal.tassocare.com/, which required consistent cross-functional collaboration and communication to ensure the on-time, within budget completion of all objectives.",
          "Enabled the services team to fulfill orders by adding features and fixing bugs in the TassoCare Admin Portal.",
          "Spearheaded end-to-end integration testing using Jest, Gherkin and Selenium to ensure quality in the TassoCare product line-up.",
          "Architected a fully scalable feature flagging solution using Gitlab / Unleash / AWS CDK which enabled Tasso to develop new features quickly without immediately releasing them.",
          "Built a .NET 8 GraphQL API on top of the existing blood-device database using Entity Framework scaffolding, enabling clients to request only needed fields and reducing front-end data joins.",
          "Worked closely with product management in an Agile environment to ensure the timely delivery of features and bug fixes.",
        ]}
      />
      <PrintEmployment
        title="Software Engineer"
        company="Tyler Technologies"
        employmentTimeSpan="Aug 2018 - Dec 2021"
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
        employmentTimeSpan="Dec 2015 - Mar 2018"
        paragraphText="Supported a missile defense system by integrating new technologies."
        bulletPoints={[
            "Supported Java development of missile defense system.",
            "Upgraded internal employee tracking system stored in Excel by building a new Angular web application with a Mongo DB supporting advanced features.",
            "Automated repititive tasks for the IT team by writing scripts in Powershell.",
            "Administrator of highly secure RedHat Linux systems which requires a deep understand of unix-like systems."
        ]}
      />

      <PrintHeader title="Education" />
      <div className="row">
        <div className="col-12">
          <p className="ps-1 pe-2">
            <span className="fw-bold">Bachelor of Computer Science</span>, Western
            State Colorado University, 2016 - GPA 3.94/4.0 Summa Cum Laude
          </p>
        </div>
      </div>

      <PrintHeader title="Certifications" />
      <div className="row">
        <div className="col-12">
          <p className="ps-1 pe-2">
            <span className="fw-bold">CompTIA Security +</span>, 2016
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintResume;
