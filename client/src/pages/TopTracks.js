import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getTopTracks } from "../spotify";

import { SectionWrapper, TrackList, TimeRangeButtons } from "../Components";

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState(null);
    const [activeRange, setActiveRange] = useState("short");
  
    useEffect(() => {
      const fetchData = async () => {
        const usertopTracks = await getTopTracks(`${activeRange}_term`);
        setTopTracks(usertopTracks.data);
      };
  
      catchErrors(fetchData());
    }, [activeRange]);
  
  
    return (
      <main>
        {topTracks && (
          <SectionWrapper title="Top Tracks" breadcrumb="true">
          <TimeRangeButtons activeRange={activeRange} setActiveRange={setActiveRange}/>
            <TrackList tracks={topTracks.items} />
          </SectionWrapper>
        )}
      </main>
    );
};

export default TopTracks;
