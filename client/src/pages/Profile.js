import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylist,
  getTopArtists,
  getTopTracks,
} from "../spotify";
import { SectionWrapper, ArtistsGrid, TrackList, PlaylistsGrid, Loader  } from "../Components";
import { StyledHeader } from "../styles";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylist();
      setPlaylists(userPlaylists.data);

      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <>
          <StyledHeader type="user">
            <div className="header__inner">
              {profile.images.length && profile.images[0].url ? (
                <img
                  className="header__img"
                  src={profile.images[0].url}
                  alt="Avatar"
                />
              ) : (
                <img
                  className="header__img"
                  src="data:image/png;base64,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"
                  alt="User"
                />
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  {playlists && (
                    <span>
                      {playlists.total} Playlists
                      {playlists.total !== 1 ? "s" : ""}
                    </span>
                  )}

                  <span>
                    {profile.followers.total} Followers
                    {profile.followers.total !== 1 ? "s" : ""}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
        </>
      )}

      {topArtists && topTracks && playlists ? (
        <main>
          <SectionWrapper
            title="Top artists from the last 6 months"
            seeAllLink="/top-artists"
          >
            <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
          </SectionWrapper>


          <SectionWrapper
            title="Top tracks from the last 6 months"
            seeAllLink="/top-tracks"
          >
            <TrackList tracks={topTracks.items.slice(0, 10)} />
          </SectionWrapper>


          <SectionWrapper
            title="Playlists"
            seeAllLink="/playlists"
          >
            <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
          </SectionWrapper>
        </main>
      ) : (
        <Loader/>
      )}
    </>
  );
};

export default Profile;
