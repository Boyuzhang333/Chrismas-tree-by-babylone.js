function setupInteraction(scene) {
    let mode = 0;
  
    scene.onPointerObservable.add((info) => {
      if (info.type === BABYLON.PointerEventTypes.POINTERDOWN) {
        const pick = info.pickInfo;
  
        if (pick.hit && pick.pickedMesh && pick.pickedMesh.parent === scene.tree) {
          mode = (mode + 1) % 3;
  
          if (mode === 0) scene.spotLight.diffuse = new BABYLON.Color3(1, 0.8, 0.3);
          if (mode === 1) scene.spotLight.diffuse = new BABYLON.Color3(0.3, 0.8, 1);
          if (mode === 2) scene.spotLight.diffuse = new BABYLON.Color3(1, 0.2, 0.2);
        }
      }
    });
  }
  