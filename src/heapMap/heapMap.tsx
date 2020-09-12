import * as React from "react";
import * as h337 from "heatmap.js";

interface IMyState {}
/* tslint-disable no-new */
export default class HeapMap extends React.Component<any, IMyState> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    var heatmapInstance = h337.create({
      container: document.getElementById("heatmap") as HTMLElement,
    });
      var points = Array()
      var max = 0;
      var width = 19200;
      var height = 10800;
      var len = 100000;

      while (len--) {
        var val = Math.floor(Math.random()*100);
        max = Math.max(max, val);
        var point = {
          x: Math.floor(Math.random()*width),
          y: Math.floor(Math.random()*height),
          value: val
        };
        points.push(point);
      }
      // heatmap data format
      var data :any;
      data = {
        max:max,
        data:points
      }
      // if you have a set of datapoints always use setData instead of addData
      // for data initialization
      heatmapInstance.setData(data);
  }
  render() {
    return (
      <div style={{ height: "1300px" }} className="heatmap" id="heatmap">
      </div>
    );
  }
}
