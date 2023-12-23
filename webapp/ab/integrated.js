import initialize from "./initialize.js";
import comment from "./comment.js";
import postimage from "./postimage.js";

export { initialize, comment, postimage}

export const options = {
  scenarios: {
    initialize: {
      executor: 'shared-iterations', // 一定量の実行を複数のVUsで共有する実行機構
      vus: 1,                        // 同時実行数(初期化なので1)
      iterations: 1,                 // 繰り返し回数
      exec: 'initialize',            // 実行シナリオ関数名
      maxDuration: '10s',            // 最大実行時間
    },
    comment: {
      executor: 'constant-vus',      // 複数の VUs を並列で動かす実行機構
      vus: 4,                        // 4 VUs で実行
      duration: '30s',               // 30s で実行
      exec: 'comment',               // 実行シナリオ関数名
      startTime: '12s',              // 12s 後に開始
    },
    postimage: {
      executor: 'constant-vus',
      vus: 2,
      duration: '30s',
      exec: 'postimage',
      startTime: '12s', 
    },
  },
}