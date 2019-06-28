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

  esriMapOptions = {
    url: `https://js.arcgis.com/4.11/`,
    css: true
  };

  /**
   * Properties to hold the map, mapview and featurelayer
   */
  esriMap: __esri.Map;
  esriMapView: __esri.MapView;
  ncodFeatureLayer: __esri.FeatureLayer;
  popupTemplate: __esri.PopupTemplate;
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

        this.ncodFeatureLayer = new FeatureLayer({
          url: this.ncodUrl,
          popupTemplate: {
            content: "{*}"
          }
        });

        this.esriMap.add(this.ncodFeatureLayer);
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
    return loadModules(["esri/views/MapView", "esri/PopupTemplate"], this.esriMapOptions).then(
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

  render() {

    return (
      <div class="my-component" ></div>
    );
  }
}