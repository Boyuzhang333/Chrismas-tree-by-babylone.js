function enableMouseRotate(scene) {
    let isDown = false;
    let lastX = 0;
  
    scene.onPointerObservable.add((info) => {
      const event = info.event;
  
      if (info.type === BABYLON.PointerEventTypes.POINTERDOWN) {
        isDown = true;
        lastX = event.clientX;
      }
  
      if (info.type === BABYLON.PointerEventTypes.POINTERUP) {
        isDown = false;
      }
  
      if (info.type === BABYLON.PointerEventTypes.POINTERMOVE && isDown) {
        const dx = event.clientX - lastX;
  
        // 旋转树的 pivot
        scene.treePivot.rotation.y += dx * 0.01;
  
        lastX = event.clientX;
      }
    });
  }
  