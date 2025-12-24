function enableMouseZoom(scene, camera) {
    let minZ = -8;   // 最近距离
    let maxZ = -40;  // 最远距离
  
    window.addEventListener("wheel", (event) => {
      const delta = event.deltaY;
  
      // 沿着 Z 轴前后移动（dolly）
      camera.position.z += delta * 0.05;
  
      // 限制范围
      if (camera.position.z > minZ) camera.position.z = minZ;
      if (camera.position.z < maxZ) camera.position.z = maxZ;
    });
  }
  