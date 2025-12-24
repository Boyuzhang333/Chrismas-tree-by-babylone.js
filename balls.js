// balls.js
// 只加载并拆分圣诞球，并让材质稍微变亮

window.loadBalls = async function (scene) {
    // 1. 加载 GLB
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "./",
      "game_ready__free_christmas_tree_balls.glb",
      scene
    );
  
    // 2. 拆分所有球（排除 root）
    const balls = result.meshes.filter(m => m.name !== "__root__");
  
    // 3. 取消父子关系 + 调亮材质
    balls.forEach(ball => {
      ball.setParent(null);
  
      const mat = ball.material;
      if (mat) {
        // ⭐ 让贴图亮度提高一点点（1.0 → 1.3）
        if (mat.albedoTexture) {
          mat.albedoTexture.level = 1.3;
        }
  
        // ⭐ 让基础颜色稍微亮一点（乘以 1.1）
        if (mat.albedoColor) {
          mat.albedoColor = mat.albedoColor.scale(1.1);
        }
  
        // ⭐ 让金属感更亮一点（可选）
        if (mat.metallic !== undefined) {
          mat.metallic = Math.min(1, mat.metallic + 0.1);
        }
      }
    });
  
    return balls;
  };
  