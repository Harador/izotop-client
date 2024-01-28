// ui
export interface ITile {
  id: number,
  country: ICountryDto | null,
  geo: IGeoDto | null,
}

// ui
export interface IMapData {
  tiles: ITile[],
  countries: ICountryDto[],
  geoLayers: IGeoDto[],
}

// map page http
export interface IMapDataDto {
  tiles: ITileDto[],
  countries: ICountryDto[],
  geoLayers: IGeoDto[],
}

export interface ITileDto {
  id: number,
  countryId: number,
  geoId: number,
}

export interface ICountryDto {
  id: number,
  title: string,
  tileColor: string,
}

export interface IGeoDto {
  id: number,
  title: string,
  tileColor: string,
}
