import { Component, h, Element } from "@stencil/core";
import { loadModules } from "esri-loader";

@Component({
  tag: "my-component",
  styleUrl: "my-component.scss"
})
export class MyComponent {
  @Element() hostElement: HTMLElement;
  // @Prop() match: MatchResults;
  // @Prop() history: RouterHistory;

  ncodUrl = 'https://maps.raleighnc.gov/arcgis/rest/services/Planning/Overlays/MapServer/9';
  /**
   * esri-loader options
   */
  esriMapOptions = {
    url: `https://js.arcgis.com/4.11/`
  };

  /**
   * Properties to hold the map, mapview and featurelayer
   */
  esriMap: __esri.Map;
  esriMapView: __esri.MapView;
  municipalitiesFeatureLayer: __esri.FeatureLayer;
  // mapId = '368e5788d14f4f05a90114404fd8189e';

  constructor() { 
    
    loadModules(
      ["esri/Map", "esri/layers/FeatureLayer"],
      this.esriMapOptions
    ).then(
      ([EsriMap, FeatureLayer]: [
        __esri.MapConstructor,
        __esri.FeatureLayerConstructor
      ]) => {
        this.esriMap = new EsriMap({
          basemap: "topo"
        });

        this.municipalitiesFeatureLayer = new FeatureLayer({
          url:
            "https://maps.raleighnc.gov/arcgis/rest/services/Planning/Overlays/MapServer/9",
            popupTemplate: {
              content: "{*}"
            }
        });

        this.esriMap.add(this.municipalitiesFeatureLayer);
      }
    );
  }
  /**
   * The component is loaded and has rendered.
   * Only called once per component lifecycle
   */
  componentDidLoad() {
    console.log("componentDidLoad");
    this.createEsriMapView();

  }

  componentDidRender() {
    console.log("componentDidRender");
    // this.initializeMap();
  }

  createEsriMapView() {
    return loadModules(["esri/views/MapView"], this.esriMapOptions).then(
      ([EsriMapView]: [__esri.MapViewConstructor]) => {
        const mapDiv = this.hostElement.querySelector("div");

        this.esriMapView = new EsriMapView({
          container: mapDiv,
          zoom: 13,
          center: [-78.6382, 35.7796],
          map: this.esriMap
        });
      }
    );
  }

  // async initializeMap() {
  //   try {


  //     const [WebMap, MapView] = await loadModules([
  //       'esri/Map',
  //       'esri/views/MapView'
  //     ]);
  //     const webmap = new WebMap({
  //       portalItem: { // autocasts as new PortalItem()
  //         id: 'f2e9b762544945f390ca4ac3671cfa72'
  //       }
  //     });
  //     let mapDiv = this.hostElement.querySelector("div");

  //     // and we show that map in a container w/ id #viewDiv
  //     this.esriMapView = new MapView({
  //       container: mapDiv,
  //       zoom: 13,
  //       center: [-78.6382, 35.7796],
  //       map: webmap
  //     });

  //     return this.esriMapView;
  //   } catch (error) {
  //     console.log('EsriLoader: ', error);
  //   }
  // }
  render() {

    return (
      <main style={{ height: "100%" }}>

        <div class="my-component" ></div>
      </main>
    );
  }
}


 // loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);

    // loadModules(
    //   ["esri/Map", "esri/layers/FeatureLayer"],
    //   this.esriMapOptions
    // ).then(
    //   ([EsriMap, FeatureLayer]: [
    //     __esri.MapConstructor,
    //     __esri.FeatureLayerConstructor
    //   ]) => {
    //     this.esriMap = new EsriMap({
    //       basemap: "streets"
    //     });

    //     this.municipalitiesFeatureLayer = new FeatureLayer({
    //       url:
    //         "https://services.arcgis.com/Li1xnxaTwJ2lGrgz/arcgis/rest/services/Kommuner/FeatureServer/0"
    //     });

    //     return this.esriMap.add(this.municipalitiesFeatureLayer);
    //   }
    // );