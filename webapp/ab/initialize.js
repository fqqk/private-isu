// webサービスの初期化を行うシナリオ
import http from 'k6/http';
import { sleep } from 'k6';
import { url } from './config.js';

export default function () {
  http.get(url('/initialize'), {
    timeout: '10s',
  });
  // 実際に負荷を与える前の猶予期間として1秒待つ
  sleep(1);
}
