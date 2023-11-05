import { TracksResponse } from '../models/Tracks';
import HttpService from './HttpService';

class DeezerService {
  private httpService: HttpService = new HttpService();

  public searchTracks(keyword: string): Promise<TracksResponse> {
    return this.httpService.get<TracksResponse>(`search?q=track:"${keyword}"`);
  }
}

export default new DeezerService();
