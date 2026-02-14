import React from "react";
import PDFModal from "./PDFModal";
import CharacterSheet from "./CharacterSheet";
import ContactButton from "./ContactButton";

function Resume() {
  return (
    <div>
      <PDFModal />
      <CharacterSheet />
      <ContactButton />
      <div className="container">
        {/* Resume Content Here - Adjusted class to className, and inline event handling */}
        <div className="row justify-content-center mt-4">
          <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
            <hr />
            <h3 className="text-center">
              Kellen Stuart{" "}
              <small className="text-muted">Senior Software Engineer</small>
            </h3>
            <hr />
          </div>
        </div>

        {/* Education Section */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
            <strong>education</strong>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <a
              href="https://western.edu/"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Western State Colorado University
            </a>
            <br />
            {/* Adjusting inline event handler to React style if needed */}
            Bachelor of Computer Science
            <br />
            GPA: 3.91
            <br />
            Summa Cum Laude
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <i>July 2016</i>
          </div>
        </div>

        {/* Work Experience - Tech Disc */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
            <b>work</b>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <a className="link" href="https://techdisc.com/">
              Tech Disc
            </a>
            <br />
            <i>Senior Full Stack Developer</i>
            <br />
            <p className="pl-3">
              Build and maintain a web platform for a disc golf simulator that
              helps players improve throw performance by returning detailed
              throw analytics.
            </p>
            <p className="pl-3">
              Focused on Bluetooth device connectivity hardening for production
              reliability, with near-term roadmap work supporting multiple discs
              connected to a single web session.
            </p>
            <ul className="ul-dashes ul-padding-gentle">
              <li>React</li>
              <li>Typescript</li>
              <li>Node.JS</li>
              <li>Google Cloud / Firebase Storage</li>
              <li>Bluetooth device integration</li>
              <li>Security vulnerability patching (dependency/package updates)</li>
              <li>Github Actions</li>
              <li>WSL 2 (Ubuntu)</li>
              <li>ZSH</li>
              <li>Copilot</li>
            </ul>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <i>December 2025 - Present</i>
          </div>
        </div>

        {/* Work Experience - Tasso */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12"></div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <a className="link" href="https://www.tassoinc.com/">
              Tasso Inc.
            </a>
            <br />
            <i>Senior Full Stack Developer</i>
            <br />
            <p className="pl-3">
              At Tasso, a startup specializing in at-home blood collection
              devices, I developed software to streamline the blood sample
              collection process.
            </p>
            <ul>
              <li>Built and maintained AWS cloud infrastructure</li>
              <li>Developed React frontends for user-facing applications</li>
              <li>Created and managed APIs and databases for partner integrations</li>
            </ul>
            <p className="pl-3">
              Led implementation of company-wide feature flags and frequently
              facilitated technical design sessions to determine implementation
              approaches for new features.
            </p>
            <p className="pl-3">
              Supported development in a regulated environment requiring HIPAA,
              PHI, ePHI, BAA, and HITECH-aligned operational controls.
            </p>
            <ul className="ul-dashes ul-padding-gentle">
              <li>React / Material UI / Tailwind / Bootstrap 5</li>
              <li>Node.JS</li>
              <li>Express.JS</li>
              <li>Nest.JS</li>
              <li>AWS / AWS CLI & CDK</li>
              <li>RESTful API</li>
              <li>Typescript</li>
              <li>Python</li>
              <li>Java</li>
              <li>Docker</li>
              <li>PostgreSQL</li>
              <li>Gitlab CI/CD</li>
              <li>Agile</li>
              <li>Test Driven Development / Cucumber / Gherkin / Selenium</li>
              <li>Launch Darkly / Unleash / Gitlab Unleash / Unleash React SDK</li>
              <li>Linux / Sonoma Automation ZSH BASH</li>
            </ul>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <i>December 2021 - November 2024</i>
          </div>
        </div>

        {/* Work Experience - Flavor Forge AI, LLC */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <a className="link" href="https://flavorforgeai.com">
              Flavor Forge AI, LLC
            </a>
            <br />
            <i>Founder</i>
            <br />
            <p className="pl-3">
              <i>Independent product R&amp;D (not released)</i>
            </p>
            <p className="pl-3">
              Flavor Forge AI was an independent product concept that explored
              pantry-based recipe recommendations. Although the product was not
              released, it was meaningful full-stack experience that
              strengthened my Django backend capabilities and hands-on work with
              modern React frameworks.
            </p>
            <ul className="ul-dashes ul-padding-gentle">
              <li>Modern React frameworks / Tailwind CSS</li>
              <li>Python Django</li>
              <li>OpenAI API GPT-4 DALLE-3</li>
              <li>Postgres SQL</li>
              <li>Stripe</li>
              <li>Github Actions</li>
              <li>VS Code CoPilot</li>
              <li>Business Administration</li>
            </ul>
          </div>
        </div>

        {/* Work Experience - Tyler Technologies */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <a className="link" href="https://www.tylertech.com/">
              Tyler Technologies
            </a>
            <br />
            <i>Software Engineer</i>
            <br />
            <p className="pl-3">
              This position entails developing critical payment systems for a
              large utility billing software suite called 
              <a
                href="https://municipalonlinepayments.com/goldenco"
                className="link"
              >
                InSite
              </a>
              . The core responsiblity is to ensure payments can be executed
              enmasse. Autopay is my core focus; it's a large source of
              recurring revenue for Tyler Tech. Each month, our website is
              responsbile for reminding, scheduled, and processing a users
              utility bill. Originally, the system could barely support 5,000
              autopayments a day; we are now able to handle 500,000+ due to my
              efforts.
            </p>
            <p className="pl-3">
              Furthermore, I modernize the look and feel of our systems;
              <a
                href="https://www.expresslanedefensivedriving.com"
                className="link"
              >
                ExpressLane Defensive Driving
              </a>
              is a production example of a redesign I did during my time at
              Tyler Tech.
            </p>
            <ul className="ul-dashes ul-padding-gentle">
              <li>Full Stack C# .NET Core Blazor / Razor Pages</li>
              <li>Upgrade ORM from LINQ To SQL to Entity Framework Core</li>
              <li>Redesign UI's to look modern</li>
              <li>Greatly improve database performance</li>
              <li>Scale monoliths into microservices</li>
              <li>Upgrade projects from .NET Framework to .NET Core</li>
              <li>Develop API's using the latest .NET Core standards</li>
              <li>Develop test suites to promote test driven development</li>
              <li>Standardize UI by following material design practices</li>
              <li>Upgrade the email system to support SendGrid</li>
              <li>Support text messaging by integrating with Twilio</li>
            </ul>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <i>August 2018 - December 2021</i>
          </div>
        </div>

        {/* Work Experience - Lockheed Martin */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12"></div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <a
              href="https://www.lockheedmartin.com/en-us/index.html"
              className="link"
            >
              Lockheed Martin
            </a>
            <br />
            <i>Software Engineer II</i>
            <p className="pl-3">
              This position entailed supporting a missile defense system by
              integrating new technology with the old. After my internship, I
              was tasked to upgrade the internal employee tracking system -
              everything was tracked by an excel sheet; my task was to create a
              web application that automated the process. Concurrently, I helped
              the IT team automate their repetitive processes with the use of
              PowerShell. Also during this time, I attained a
              <a
                href="https://www.comptia.org/certifications/security"
                className="link"
              >
                CompTIA Security+ Certificate
              </a>
              .
            </p>
            <p className="pl-3">
              Soon after, I was promoted to another missile defense project. The
              goal was to move from a desktop application to a web based
              application. My job was to identify the best web technology for
              this upgrade and present it. Furthermore, I was tasked to research
              how to hookup this new technology with legacy server-side code.
              Soon after my promotion, I was recruited by Tyler Technologies; a
              big reason for this change was to stay technologically relevent
              within the industry and to continually improve my skillset.
            </p>
            <ul className="ul-dashes ul-padding-gentle">
              <li>Frontend redesign (Angular)</li>
              <li>Database conversions (MongoDB)</li>
              <li>Analyze ways to integrate legacy with new services</li>
              <li>Full stack development (Angular / Java & LAMP)</li>
              <li>Administrator of a highly secure RedHat Linux environment</li>
            </ul>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <i>December 2015 - March 2018</i>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
            <b>certifications</b>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <a
              href="https://www.comptia.org/certifications/security"
              className="link"
            >
              CompTIA Security +
            </a>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <i>January 2018</i>
          </div>
        </div>

        {/* Teaching Section */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
            <b>teaching</b>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <a href="https://western.edu" className="link">
              Western State Colorado University
            </a>
            <br />
            <i>Computer Science Tutor & Grader</i>
            <br />
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
            <i>December 2015 - December 2016</i>
          </div>
        </div>

        {/* Proficient */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
            <b>proficient</b>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <b>languages</b>
            <p>Typescript, Javascript (ES6+), Python, C#, Java, SQL</p>
            <b>frameworks</b>
            <p>React, Django, Node.js, Express.js, Nest.JS, .NET Core, ASP.NET MVC, Blazor, Angular</p>
            <b>front end</b>
            <p>React (Vite & CRA), React Router, Tailwind CSS, Material UI, Bootstrap 5, CSS, SASS, LESS</p>
            <b>mobile</b>
            <p>React Native</p>
            <b>cloud</b>
            <p>AWS (CDK, AWS CLI), Google Cloud Platform (GCP), Firebase Storage, Azure</p>
            <b>databases</b>
            <p>PostgreSQL, SQL Server, MySQL, DynamoDB, MongoDB</p>
            <b>orm</b>
            <p>Entity Framework, Dapper, LINQ to SQL, Django ORM</p>
            <b>api</b>
            <p>REST APIs, GraphQL, OAuth 2.0, ASP.NET Web API</p>
            <b>security</b>
            <p>Dependency vulnerability remediation, package patching, secure release practices</p>
            <b>connectivity</b>
            <p>Bluetooth / BLE device integration and reliability hardening</p>
            <b>dev ops / ci-cd</b>
            <p>GitHub Actions, GitLab CI/CD, Dotnet Publish, TeamCity, Octopus Deploy</p>
            <b>ide</b>
            <p>
              VS Code, Visual Studio, Jetbrains Rider, WebStorm, Eclipse,
              IntelliJ IDEA
            </p>
            <b>automation / cli</b>
            <p>
              WSL 2, Ubuntu Linux, AWS CLI, ZSH, Oh My Zsh!, BASH, Powershell 7,
              Dotnet CLI, IIS Administration, Active Directory
            </p>
            <b>testing frameworks</b>
            <p>NUnit, XUnit, Selenium, Cucumber / Gherkin</p>
            <b>package management</b>
            <p>Homebrew, Chocolatey, Apt-Get, NPM, PowerShellGet</p>
            <b>version control</b>
            <p>Git, GitHub, GitLab, Bitbucket</p>
            <b>authentication</b>
            <p>Microsoft Identity Platform</p>
            <b>cryptography</b>
            <p>Public / Private Key Encryption, Hashing, HMAC, AES, RSA</p>
            <b>networking</b>
            <p>SSH, RDP, OpenWRT</p>
            <b>productivity</b>
            <p>VIM, GitHub Copilot, ChatGPT, Codex</p>
            <b>debugging</b>
            <p>DotMemory, DotTrace</p>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"></div>
        </div>

        {/*todo: add section about security /*}

        {/* Familiar */}
        <div className="row mb-4">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
            <b>familiar</b>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <p>Haskell, Scala, LISP</p>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"></div>
        </div>

        {/*John Peterson Section*/}
        <div id="john-peterson" className="row mb-4" tabIndex="0">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-12">
            <b>john peterson</b>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-12">
            <p>
              My professor{" "}
              <a
                href="https://archive.gunnisontimes.com/obituaries/john-peterson"
                className="link"
              >
                John Peterson
              </a>{" "}
              was an aboslute legend. John suffered a rock climbing accident at
              the Moab Arches in 2017 and has since passed away...
            </p>
            <p>
              John was one of the authors of the{" "}
              <a href="https://www.haskell.org/onlinereport/" className="link">
                Haskell Report
              </a>{" "}
              and the{" "}
              <a href="https://www.haskell.org/tutorial/" className="link">
                Gentle Introduction to Haskell
              </a>
              . Futhermore, he participated in the early development of
              Functional Reactive Programming and the arrow-based
              <a href="https://hackage.haskell.org/package/Yampa" className="link">
                Yampa Library
              </a>
              . He is well respected in the community and I plan to dedicate a
              page on my site for him in the future. People may not consider
              Western State a premiere CS school, but when John was around, it
              was....
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
