import React from "react";
import BlogImage from "../components/blog/BlogImage";
import BlogPostLayout from "../components/blog/BlogPostLayout";

function Custom4x12Veteran30CreambackWiringPost({ post }) {
  return (
    <BlogPostLayout
      title={post.title}
      date={post.date}
      lastUpdated={post.lastUpdated}
      category={post.category}
      readTime={post.readTime}
      heroImage={post.heroImage}
      updates={post.updates}
    >
      <p>
        This is the shop plan for rewiring my custom 4x12 after swapping the two
        Celestion Seventy 80s for two Celestion G12M-65 Creamback 12 inch, 65 watt,
        8 ohm speakers. The cabinet already has two WGS Veteran 30 speakers in it,
        and those are staying. The final cabinet load needs to remain 8 ohm mono so
        it can keep working with the same amp output setting.
      </p>

      <p>
        I am also replacing the spade connector wiring with soldered connections and
        16 AWG speaker wire. I have had a cabinet with loose, untrustworthy
        connections before, and that is not a harmless failure mode with a tube amp.
        If the speaker connection opens while the amp is running, the amp may no
        longer see a proper load.
      </p>

      <h2 className="h4 mt-4">Final Speaker Set</h2>
      <p>
        All four speakers are 8 ohm speakers, which is what makes the 8 ohm
        series/parallel layout work cleanly.
      </p>

      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th scope="col">Speaker</th>
              <th scope="col">Quantity</th>
              <th scope="col">Impedance</th>
              <th scope="col">Power rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WGS Veteran 30</td>
              <td>2</td>
              <td>8 ohm each</td>
              <td>60 watts each</td>
            </tr>
            <tr>
              <td>Celestion G12M-65 Creamback</td>
              <td>2</td>
              <td>8 ohm each</td>
              <td>65 watts each</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Because every speaker is the same impedance, each speaker should receive an
        equal share of the amp power in this wiring scheme. The conservative cabinet
        power rating is therefore 240 watts: four speakers sharing power evenly, with
        the 60 watt Veteran 30s setting the limit.
      </p>

      <h2 className="h4 mt-4">Speaker Positions From the Back</h2>
      <p>
        The cabinet is already laid out in an X pattern. Looking into the open back
        of the cabinet at the speaker frames, the WGS Veteran 30s are top left and
        bottom right. The current Celestion Seventy 80s are top right and bottom
        left, and those are the two positions getting the G12M-65 Creambacks.
      </p>

      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th scope="col">Position from rear</th>
              <th scope="col">Speaker after swap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Top left</td>
              <td>WGS Veteran 30</td>
            </tr>
            <tr>
              <td>Top right</td>
              <td>Celestion G12M-65 Creamback</td>
            </tr>
            <tr>
              <td>Bottom left</td>
              <td>Celestion G12M-65 Creamback</td>
            </tr>
            <tr>
              <td>Bottom right</td>
              <td>WGS Veteran 30</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="h4 mt-4">The Wiring Plan</h2>
      <p>
        The target is 8 ohm mono series/parallel wiring. That means building two 16
        ohm series pairs, then connecting those two pairs in parallel at the input
        jack.
      </p>

      <BlogImage
        src="/blog/music/guitar/4x12-8-ohm-series-parallel-wiring-diagram.png"
        alt="4x12 8 ohm mono series parallel speaker wiring diagram"
        caption="Four 8 ohm speakers wired as two 16 ohm series pairs in parallel for an 8 ohm mono cabinet load."
      />

      <p>
        I am pairing one Veteran 30 with one Creamback in each series branch. That
        keeps the mixed speakers evenly distributed electrically as well as
        physically.
      </p>

      <div className="table-responsive">
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th scope="col">Branch</th>
              <th scope="col">Connection order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Top branch</td>
              <td>
                Jack tip to top-left Veteran 30 positive, top-left Veteran 30
                negative to top-right Creamback positive, top-right Creamback
                negative to jack sleeve.
              </td>
            </tr>
            <tr>
              <td>Bottom branch</td>
              <td>
                Jack tip to bottom-left Creamback positive, bottom-left Creamback
                negative to bottom-right Veteran 30 positive, bottom-right Veteran
                30 negative to jack sleeve.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        In plain language: the two branch starts land on the jack tip, and the two
        branch ends land on the jack sleeve. Inside each branch, the negative
        terminal of the first speaker jumps to the positive terminal of the second
        speaker. That is what makes each pair a 16 ohm series pair.
      </p>

      <h2 className="h4 mt-4">Parts and Tools</h2>
      <ul>
        <li>Two Celestion G12M-65 Creamback 12 inch, 65 watt, 8 ohm speakers.</li>
        <li>16 AWG stranded speaker wire.</li>
        <li>Rosin-core solder and a soldering iron with enough heat for speaker tabs.</li>
        <li>Wire cutters, wire strippers, and needle-nose pliers.</li>
        <li>Heat shrink tubing or another clean strain-relief plan.</li>
        <li>Multimeter for resistance and continuity checks.</li>
        <li>A real speaker cable for the amp connection, not an instrument cable.</li>
      </ul>

      <h2 className="h4 mt-4">Step-by-Step</h2>
      <ol>
        <li>
          <strong>Disconnect the amp completely.</strong> This is cabinet work, not
          amp chassis work, but the head should be unplugged from the cab before
          anything is opened up. Do not run a tube amp without a proper speaker load.
        </li>
        <li>
          <strong>Photograph the original wiring.</strong> Take a clear picture
          before removing anything. The goal is not to copy the old spade wiring, but
          the picture gives a fallback reference for the jack plate, speaker
          positions, and polarity markings.
        </li>
        <li>
          <strong>Label the four speaker positions from the rear.</strong> Use top
          left, top right, bottom left, and bottom right. This avoids confusion once
          the cabinet is rotated on the bench.
        </li>
        <li>
          <strong>Remove the two Seventy 80s.</strong> The top-right and bottom-left
          speakers come out. Keep the mounting hardware organized and support each
          speaker as the last screws come loose.
        </li>
        <li>
          <strong>Install the two Creambacks.</strong> Put the new G12M-65 Creambacks
          in the top-right and bottom-left positions. Tighten the mounting screws
          evenly. They need to be secure, but the frame does not need to be crushed.
        </li>
        <li>
          <strong>Plan the wire runs before soldering.</strong> Cut the 16 AWG wire
          with enough slack for service loops and strain relief. Keep the runs tidy
          and away from places where the back panel or insulation can pull on the
          joints.
        </li>
        <li>
          <strong>Wire the top series branch.</strong> Solder jack tip to top-left
          Veteran 30 positive. Solder top-left Veteran 30 negative to top-right
          Creamback positive. Solder top-right Creamback negative back to jack
          sleeve.
        </li>
        <li>
          <strong>Wire the bottom series branch.</strong> Solder jack tip to
          bottom-left Creamback positive. Solder bottom-left Creamback negative to
          bottom-right Veteran 30 positive. Solder bottom-right Veteran 30 negative
          back to jack sleeve.
        </li>
        <li>
          <strong>Inspect every solder joint.</strong> Look for cold joints, loose
          strands, accidental bridges between positive and negative, and anything
          that can move when the cabinet vibrates.
        </li>
        <li>
          <strong>Secure the harness.</strong> Add heat shrink where useful and make
          sure the wires cannot rattle against the speaker frames or tug on the
          terminals.
        </li>
      </ol>

      <h2 className="h4 mt-4">Meter Checks Before Plugging In an Amp</h2>
      <p>
        With the cabinet disconnected from any amp, measure across the cabinet input
        jack. An 8 ohm speaker cabinet will not usually read exactly 8 ohms on a
        multimeter because the meter reads DC resistance, not nominal speaker
        impedance. A healthy 8 ohm cabinet will usually measure lower than 8 ohms.
      </p>

      <p>
        If the meter reads open or infinite resistance, the amp would not see a load.
        Stop and find the broken connection. If it reads close to 0 ohms, there is a
        short. Stop and find the accidental bridge. Either condition is wrong and
        should be fixed before the amp is connected.
      </p>

      <p>
        After the resistance check, use continuity mode to verify the intended series
        jumpers and confirm that tip and sleeve are not shorted. A quick low-voltage
        battery click test can also confirm that all four speakers move the same
        direction, but the important thing is consistency across all four cones.
      </p>

      <h2 className="h4 mt-4">First Power Test</h2>
      <p>
        Once the wiring checks out, connect the cabinet to the amp with a speaker
        cable and use the amp's 8 ohm output. Start at low volume and listen for all
        four speakers. If one speaker is silent, scratchy, or obviously weaker, shut
        down and recheck the wiring before turning up.
      </p>

      <p>
        After the first short test, I like to move the cabinet a bit, tap around the
        jack plate gently, and recheck the meter. The whole reason for soldering this
        harness is reliability under vibration, so it is worth confirming the wiring
        stays stable after the cabinet has been handled.
      </p>

      <h2 className="h4 mt-4">Expected Result</h2>
      <p>
        The finished cabinet should be an 8 ohm mono 4x12 with two WGS Veteran 30s
        and two Celestion G12M-65 Creambacks in an X pattern. The wiring gives each
        speaker an equal share of the power, keeps one of each speaker model in each
        series branch, and removes the loose-spade-connector risk that made me want
        to rebuild the harness in the first place.
      </p>
    </BlogPostLayout>
  );
}

export default Custom4x12Veteran30CreambackWiringPost;
