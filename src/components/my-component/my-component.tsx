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
  searchWidget: __esri.widgetsSearch;

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
  }

  componentDidRender() {
    this.createEsriMapView();
  }

  createEsriMapView() {
    return loadModules(["esri/views/MapView", "esri/widgets/Search"], this.esriMapOptions).then(
      ([EsriMapView, Search]: [__esri.MapViewConstructor, __esri.widgetsSearchConstructor]) => {
        const mapDiv = this.hostElement.querySelector("div");

        this.esriMapView = new EsriMapView({
          container: mapDiv,
          zoom: 13,
          center: [-78.6382, 35.7796],
          map: this.esriMap
        });

        this.searchWidget = new Search({
          view: this.esriMapView
        });
        this.esriMapView.ui.add(this.searchWidget, {
          position: "top-left",
          index: 2
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