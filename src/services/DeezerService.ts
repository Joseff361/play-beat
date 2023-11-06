import {
  AlbumResponse,
  ArtistResponse,
  TracksResponse,
} from '../models/Tracks';
import HttpService from './HttpService';

class DeezerService {
  private httpService: HttpService = new HttpService();

  public searchTracks(keyword: string): Promise<TracksResponse> {
    return this.httpService.get<TracksResponse>(`search?q=track:"${keyword}"`);
  }

  public findAlbum(albumId: string | number): Promise<AlbumResponse> {
    return this.httpService.get<AlbumResponse>(`album/${albumId}`);
  }

  public searchArtistTopTracks(artistName: string): Promise<ArtistResponse> {
    return this.httpService.get<ArtistResponse>(
      `search?q=artist:"${artistName}"`,
    );
  }
}

export default new DeezerService();
