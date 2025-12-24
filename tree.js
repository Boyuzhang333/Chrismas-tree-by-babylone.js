function createTreeLights(scene, tree) {
    const lights = [];
    const lightCount = 50;     
    const height = 3.5;        
  
    const radiusBottom = 1.0;   // 底部半径
    const radiusTop = 0.3;      // 顶部半径
  
    const turns = 3;           
    const bulbSize = 0.07;     
  
    const colors = [
      new BABYLON.Color3(1, 0.3, 0.3),  
      new BABYLON.Color3(0.3, 1, 0.3),  
      new BABYLON.Color3(1, 0.8, 0.3),  
      new BABYLON.Color3(1, 0.6, 0.2)   
    ];
  
    for (let i = 0; i < lightCount; i++) {
  
      // ⭐ 只生成上半圈灯带（避免碰地）
      const t = 0.1 + (i / lightCount) ;  // 从 0.5 → 1
  
      // 半径随高度变小
      const radius = radiusBottom * (1 - t) + radiusTop * t;
  
      // 螺旋路径
      const angle = t * turns * Math.PI * 2;
      const y = t * height;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
  
      const bulb = BABYLON.MeshBuilder.CreateSphere("bulb" + i, { diameter: bulbSize }, scene);
      bulb.position = new BABYLON.Vector3(x, y, z);
      bulb.parent = tree;
  
      const color = colors[i % colors.length];
  
      const mat = new BABYLON.StandardMaterial("bulbMat" + i, scene);
      mat.diffuseColor = color;
      mat.emissiveColor = color.scale(2);
      bulb.material = mat;
  
      lights.push(bulb);
    }
  
    return lights;
  }
    
  function shakeTree(tree, scene) {
    const anim = new BABYLON.Animation(
      "shake",
      "rotation.z",
      60,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
  
    const keys = [
      { frame: 0, value: 0 },
      { frame: 5, value: 0.05 },
      { frame: 10, value: -0.05 },
      { frame: 15, value: 0.03 },
      { frame: 20, value: -0.02 },
      { frame: 25, value: 0 },
    ];
  
    anim.setKeys(keys);
  
    tree.animations = [];
    tree.animations.push(anim);
  
    scene.beginAnimation(tree, 0, 25, false);
  }
  
async function loadTree(scene) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "./",
      "christmas_tree_model.glb",
      scene
    );
  
    const tree = result.meshes[0];
    tree.scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
    tree.position.y = 0;
  
    // ⭐ 让树保持原色，但整体亮一点
    tree.getChildMeshes().forEach(m => {
      if (m.material && m.material.diffuseColor) {
        // emissive = diffuse × 0.3（亮度提升但不改变颜色）
        m.material.emissiveColor = m.material.diffuseColor.scale(0.3);
      }
    });
  
    // ⭐ 慢慢自转（可选）
    scene.registerBeforeRender(() => {
      tree.rotation.y += 0.0015;
    });
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
          const pick = scene.pick(scene.pointerX, scene.pointerY);
          if (pick.hit && pick.pickedMesh && pick.pickedMesh.isDescendantOf(tree)) {
            shakeTree(tree, scene);
          }
        }
      });
      
    createTreeLights(scene, tree)

    scene.tree = tree;
  }
  