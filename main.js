// import { loadBalls } from "./balls.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

async function main() {
  const scene = createBaseScene(engine, canvas);

  await loadTree(scene);
  await loadStar(scene);
  await loadGifts(scene);

  const balls = await loadBalls(scene);

    // 示例：把第一个球放到树上
    balls[0].position = new BABYLON.Vector3(0.5, 2.2, 0.3);
    balls[0].scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
    balls[0].parent = scene.tree;

    // 第二个球
    balls[1].position = new BABYLON.Vector3(-0.4, 1.8, -0.2);
    balls[1].scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
    balls[1].parent = scene.tree;

    // 第三个球
    balls[2].position = new BABYLON.Vector3(0.2, 3.0, -0.1);
    balls[2].scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
    balls[2].parent = scene.tree;

    balls[3].position = new BABYLON.Vector3(0.1, 1.0, 0.5);
    balls[3].scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
    balls[3].parent = scene.tree;

    balls[4].position = new BABYLON.Vector3(0.05, 0.8, -0.5);
    balls[4].scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
    balls[4].parent = scene.tree;

    await loadSnowflakes(scene);


  setupInteraction(scene);



  engine.runRenderLoop(() => scene.render());
}

main();

window.addEventListener("resize", () => engine.resize());
