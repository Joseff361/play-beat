import { useEffect, useState } from 'react';

import { TrackItem } from '../../../models/TrackItem';
import DeezerService from '../../../services/DeezerService';

function Header() {
  const [tracks, setTracks] = useState<TrackItem[]>([]);

  useEffect(() => {
    searchTracks();
  }, []);

  const searchTracks = async () => {
    try {
      const { data } = await DeezerService.searchTracks('feriado');

      const mappedTracks: TrackItem[] = data.map(d => {
        return {
          url: d.preview,
          trackName: d.title,
          artistName: d.artist.name,
          image: d.album.cover_xl,
        };
      });

      setTracks(mappedTracks);

      console.log(mappedTracks);
    } catch {
      console.log('??');
    }
  };

  return (
    <header>
      {tracks.map(track => (
        <img alt="track-image" src={track.image} />
      ))}
    </header>
  );
}

export default Header;
