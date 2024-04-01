import { Injectable } from '@angular/core';
import { IMapData, IMapDataDto, ITile } from '../../interfaces/tile-info.interface';
import { forkJoin, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapHttpDataService {

  constructor(
    private _http: HttpClient,
  ) {
  }

  public map$(): Observable<{svg: string, mapData: IMapData}> {
    return forkJoin(
      this._svg$(),
      this._loadMapData()
    ).pipe(
      map(([svg, mapDataDto]: [string, IMapDataDto]) => ({svg, mapData: this._transformData(mapDataDto)}))
    )
  }

  private _svg$(): Observable<string> {
    return this._http.get('api/maps/map-03.30.2024.22.38.1711827496478.svg', {responseType: 'text'})
  }

  private _loadMapData(): Observable<IMapDataDto> {
    return of(this._mockData())
  }


  private _transformData(dataDto: IMapDataDto): IMapData {
    const tiles: ITile[] = dataDto.tiles.map(tileDto => ({
        id: tileDto.id,
        country: dataDto.countries.find(country => country.id === tileDto.countryId) || null,
        geo: dataDto.geoLayers.find(geo => geo.id === tileDto.geoId) || null,
    }))

    return {
      tiles: tiles,
      countries: dataDto.countries,
      geoLayers: dataDto.geoLayers,
    }
  }
  private _mockData(): IMapDataDto {
    return {
      tiles: [
        {
          id: 0,
          countryId: 0,
          geoId: 0,
        },
        {
          id: 1,
          countryId: 1,
          geoId: 1,
        },
        {
          id: 2,
          countryId: 0,
          geoId: 1,
        },
      ],
      countries: [
        {
          id: 0,
          title: 'Голубая лагуна',
          tileColor: 'blue'
        },
        {
          id: 1,
          title: 'Зеленый свет',
          tileColor: 'green'
        },
      ],
      geoLayers: [
        {
          id: 0,
          title: 'Поле',
          tileColor: 'yellow',
        },
        {
          id: 1,
          title: 'Гора',
          tileColor: 'brown',
        }
      ],
    }
  }
}
