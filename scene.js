function createBaseScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.08);
  
    // 环境光
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.8;
  
    // 聚光灯
    const spot = new BABYLON.SpotLight(
      "spot",
      new BABYLON.Vector3(0, 10, 0),
      new BABYLON.Vector3(0, -1, 0),
      Math.PI / 2,
      20,
      scene
    );
    spot.intensity = 1.2;
    scene.spotLight = spot;
  
    // ✅ 用 ArcRotateCamera 实现“3D 模型查看器”的感觉
    const alpha = -Math.PI / 2;   // 水平角
    const beta  = Math.PI / 2.5;    // 俯仰角
    const radius = 22;            // 与模型的距离
    const target = new BABYLON.Vector3(0, 3, 0); // 看向树的中心
  
    const camera = new BABYLON.ArcRotateCamera("camera", alpha, beta, radius, target, scene);
  
    // 限制上下旋转角度，避免翻过头
    camera.lowerBetaLimit = 0.2;
    camera.upperBetaLimit = Math.PI / 2;
  
    // 限制缩放范围
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 40;
  
    camera.attachControl(canvas, true); // 允许鼠标控制相机
  
 // 圆形地面
    const ground = BABYLON.MeshBuilder.CreateDisc(
        "ground",
        { radius: 8, tessellation: 64 }, // tessellation 越高越圆
        scene
    );
    
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.95, 0.95, 1);
    ground.material = groundMat;
    
    // 让圆形地面水平放置
    ground.rotation.x = Math.PI / 2;
    
    return scene;
  
  }
  