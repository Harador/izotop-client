import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapHttpDataService } from '../../services';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  @ViewChild('svgContainer', {static: true}) svgContainer!: ElementRef;
  //@ViewChild('object') object!: ElementRef<HTMLObjectElement>

  public svg!: SVGSVGElement;
  public P!: Element[];

  //выбранный слой карты
  public selectLayer = 'pol';
  //выбран ли инструмент админа
  public selectEditGeo = '';
  //выбранная провка (для ngIF детального окна)
  public selectedPath?: any = null;

  public selectedSvgSize = '99%';
  public defaultFill = 'gainsboro';
  //данные в левом верхнем углу, обновляются при наведении
  public detailData = {
    image: '',
    country: '',
    countryColor: 'gray',
    geo: '',
    geoColor: 'gray',
  }

  constructor(
    //private readonly _mapService: MapService,
    private _cd: ChangeDetectorRef,
    private _mapHttpDataService: MapHttpDataService,
  ) {
  }

  public ngOnInit(): void {
    this._mapHttpDataService.map$().subscribe(res => {
      this.svgContainer.nativeElement.innerHTML = res.svg;
      console.log(res);
      this._initSvg();
    })
  }

  public changeSvgSize(): void {
    //this.svg.style.width = this.selectedSvgSize;
    this.svg.style.height = this.selectedSvgSize;
    // вырезать
    // this.object.nativeElement.style.width = this.selectedSvgSize;
    // this.object.nativeElement.style.height = this.selectedSvgSize;
  }

  public closeDetail(): void {
    this.selectedPath = null;
    this._cd.detectChanges();
  }

  public changeLayer(): void {
    if(this.P && Array.isArray(this.P)){
      this.P.forEach((el: Element) => {
        this._fillPath(el);
      })
    }
  }

  private _mouseOver = (event: Event): void => {
    let p = event.target as Element;
    p.setAttribute('fill', 'red');
    this.detailData.country = p.getAttribute('var:country') || '';
    this.detailData.geo = p.getAttribute('var:geo') || '';
    this.detailData.countryColor = p.getAttribute('var:countryColor') || '';
    this.detailData.geoColor = p.getAttribute('var:geoColor') || '';
    this._cd.detectChanges();
  }

  private _mouseOut = (event: Event): void => {
    let p = event.target as Element;
    this._fillPath(p);
  }

  private _fillPath(p: Element): void {
    let color = this.defaultFill;

    if(this.selectLayer === 'geo'){
      color = p.getAttribute('var:geoColor') || this.defaultFill;
    } else
    if (this.selectLayer === 'pol'){
      color = p.getAttribute('var:countryColor') || this.defaultFill;
    }

    p.setAttribute('fill', color);
  }


  private _initSvg(): void {
    this.svg = this.svgContainer.nativeElement.querySelector('svg');
    this.changeSvgSize();
    this.P = Array.from(this.svgContainer.nativeElement.querySelectorAll('path'));
    this._initSVGEvents();
  }

  private _initSVGEvents():void{
    this.P.forEach((el: Element) => {
      el.setAttribute('fill', this.defaultFill);
      el.addEventListener('mouseover', this._mouseOver);
      el.addEventListener('mouseout', this._mouseOut);
      el.addEventListener('click', this._clickPath);
      // el.addEventListener('click', () => {
      //   console.log(el.getBoundingClientRect());
      // })
    })
  }

  private _clickPath = (e: Event): void => {
    if(this.selectEditGeo){
      this.selectedPath = null;
      this._editPathGeo(e);
    }else{
      let p = e.target as Element;
      let country = p.getAttribute('var:country');
      this.selectedPath = {};
      this.selectedPath.country = country;
      this._cd.detectChanges();
    }
  }

  private _editPathGeo = (e: Event): void => {
    let p= e.target as Element;
    let g = this.selectEditGeo;
    if(g){
      if(g == 'fields'){
        p.setAttribute('var:geoColor', 'MediumSpringGreen')
      }else if(g == 'forest'){
        p.setAttribute('var:geoColor', 'green')
      }else if(g == 'gills'){
        p.setAttribute('var:geoColor', 'lightsalmon')
      }else if(g == 'mountains'){
        p.setAttribute('var:geoColor', "maroon")
      }
      p.setAttribute('var:geo', g);
    }
  }
}
