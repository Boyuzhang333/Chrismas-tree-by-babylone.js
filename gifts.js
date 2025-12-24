async function loadGifts(scene) {

    // ⭐ 让模型保持原色但更亮
    function makeBrighter(mesh, intensity = 0.15) {
        mesh.getChildMeshes().forEach(m => {
          const mat = m.material;
          if (!mat) return;
      
          // Standard 材质
          if (mat.diffuseColor) {
            mat.emissiveColor = mat.diffuseColor.scale(intensity);
          }
      
          // PBR 材质
          if (mat.albedoColor) {
            mat.emissiveColor = mat.albedoColor.scale(intensity);
          }
        });
      }
      
  
    // 礼物盒
    const presentResult = await BABYLON.SceneLoader.ImportMeshAsync("", "./", "christmas_present.glb", scene);
    const present = presentResult.meshes[0];
    present.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
    present.position = new BABYLON.Vector3(3, 0, 2);
  
    // 礼物袋
    const bagResult = await BABYLON.SceneLoader.ImportMeshAsync("", "./", "christmas_gift_bag_low_poly.glb", scene);
    const bag = bagResult.meshes[0];
    bag.scaling = new BABYLON.Vector3(2, 2, 2);
    bag.position = new BABYLON.Vector3(-3, 0, 2);
  
    // 雪人
    const snowResult = await BABYLON.SceneLoader.ImportMeshAsync("", "./", "snow_man.glb", scene);
    const snow = snowResult.meshes[0];
    snow.scaling = new BABYLON.Vector3(0.3, 0.4, 0.4);
    snow.position = new BABYLON.Vector3(0, 0.5, -3);
    snow.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  
    // 姜饼人
    const cookieResult = await BABYLON.SceneLoader.ImportMeshAsync("", "./", "gingerbread_from_chicken_gun.glb", scene);
    const cookie = cookieResult.meshes[0];
    cookie.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
    cookie.position = new BABYLON.Vector3(0.3, 5, -2);
    cookie.rotation = new BABYLON.Vector3(0, Math.PI / 6, 0);
  
    // 圣诞老人
    const papaResult = await BABYLON.SceneLoader.ImportMeshAsync("", "./", "hw_06_santa.glb", scene);
    const papa = papaResult.meshes[0];
    papa.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    papa.position = new BABYLON.Vector3(0.3, 3, -2);
    papa.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
  
    // ⭐ 让所有模型亮一点（保持原色）
    makeBrighter(present, 0.01);
    makeBrighter(bag, 0.01);
    makeBrighter(snow, 0.01);
    makeBrighter(cookie, 0.02);
    makeBrighter(papa, 0.05);
  }
  