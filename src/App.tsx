import { useState } from 'react'
import './App.css'

function AlbumPicker() {
  const [albums, setAlbums] = useState<string[]>([]);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      artist: { value: string };
    };
    const artist = encodeURIComponent(target.artist.value);
    const url = `https://musicbrainz.org/ws/2/release?fmt=json&query=artist:${artist}`;
    const response = await fetch(url);
    const mbResult = (await response.json()) as {
      releases: { title: string }[];
    };
    const { releases } = mbResult;
    setAlbums(releases.map(({ title }) => title));
    console.log(mbResult);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Artist name:
        <input name="artist" />
      </label>
      <button type="submit">Search</button>
      <p>Albums:</p>
      <ol>
        {albums.map((album) => (
          <li>{album}</li>
        ))}
      </ol>
    </form>
  );
}

export default AlbumPicker;



