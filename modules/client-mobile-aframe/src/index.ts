require('aframe')
require('aframe-extras')
require('aframe-htmlembed-component')
require('three')

import { Group, Box3, Vector3, PerspectiveCamera} from "three";

AFRAME.registerComponent('reset-pos', {
        
    init() {
      this.el.object3D.traverse(function (node) {
          if (node instanceof Group) {
            node.position.set(0,0,0);
          }
        });
    }
  });

AFRAME.registerComponent("fit", {
    schema : {type: "selector"},
    init: function() {
      const target = this.data.object3D;
      const distance = this.el.object3D.position.distanceTo(target.position);
      const height = this.data.getAttribute("geometry").height;
      if(this.el.sceneEl?.camera instanceof PerspectiveCamera){
        const fov = this.el.sceneEl?.camera.fov * (Math.PI / 180);
        const newDistance = Math.abs((height / 2) / Math.tan(fov / 2));
        this.el.sceneEl.camera.zoom = distance / newDistance;
      }
    }
  });
