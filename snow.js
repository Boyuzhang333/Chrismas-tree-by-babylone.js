window.loadSnowflakes = async function (scene) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "./",
      "snowflakes_animation.glb",
      scene
    );
  
    // 你现在不需要动画，所以这句可以留着也可以删掉
    result.animationGroups.forEach(group => group.start());
  
    const baseFlake = result.meshes.find(m => m.getTotalVertices() > 0);
  
    if (!baseFlake) {
      console.error("没有找到雪花 mesh");
      return [];
    }
  
    baseFlake.setParent(null);
    baseFlake.scaling = new BABYLON.Vector3(1, 1, 1);
  
    const FIXED_SCALE = 0.4;
    const count = 80;
    const flakes = [];
  
    for (let i = 0; i < count; i++) {
      const flake = baseFlake.clone("snowflake_" + i);
  
      flake.scaling = new BABYLON.Vector3(0.6, FIXED_SCALE, FIXED_SCALE);
  
      randomizeSnowflakeTransform(flake);
      flakes.push(flake);
    }
  
    baseFlake.setEnabled(false);
  
    // ⭐⭐ 整片雪花阵列缓慢下落 ⭐⭐
    scene.onBeforeRenderObservable.add(() => {
      flakes.forEach(flake => {
        flake.position.y -= 0.01; // 下落速度
  
        if (flake.position.y < -2) {
          flake.position.y = 12; // 回到顶部
        }
      });
    });
  
    return flakes;
  };
  
  function randomizeSnowflakeTransform(flake) {
    flake.position = new BABYLON.Vector3(
      (Math.random() - 0.5) * 16,
      Math.random() * 10 + 2,
      (Math.random() - 0.5) * 16
    );
  
    flake.rotation = new BABYLON.Vector3(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
  }
  