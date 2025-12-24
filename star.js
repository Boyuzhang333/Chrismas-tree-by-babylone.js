async function loadStar(scene) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "./",
      "gold_glitter_star.glb",
      scene
    );
  
    const star = result.meshes[0];
    
    //⭐ 隐藏 GLB 里自带的地面 
    star.getChildMeshes().forEach(m => { 
        const bbox = m.getBoundingInfo().boundingBox;
        const height = bbox.maximum.y - bbox.minimum.y; 
        // 如果 mesh 非常扁平（高度 < 0.05），基本就是地面 
        if (height < 0.05) { m.setEnabled(false); 
        // 隐藏 
      }
    });
    
  
    // ⭐ 星星大小（你可以随便改）
    star.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
  
    // ⭐ 星星位置（你只需要改这里）
    // 你可以先用这个大概位置，然后用 Inspector 微调
    star.position = new BABYLON.Vector3(
      0,    // 左右
      3.7,  // 高度（主要调这个）
      0.1     // 前后
    );
    star.rotation = new BABYLON.Vector3(0,Math.PI / 2,0)
  
    

    // ⭐ 让星星跟着树
    star.parent = scene.tree;
  
    // ⭐ 发光效果
    const glow = new BABYLON.GlowLayer("glow", scene);
    glow.intensity = 1;
  
    star.getChildMeshes().forEach(m => {
      if (m.material) {
        m.material.emissiveColor = new BABYLON.Color3(1, 0.9, 0.3);
      }
    });
  }
  