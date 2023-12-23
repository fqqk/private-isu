// ファイルアップロードを含むフォームを送信

import http from 'k6/http';
import { parseHTML } from 'k6/html';
import { url } from './config.js';

const testImage = open('./assets/test-image.png', 'b');

export default function () {
  const res = http.get(url('/login'),{
    account_name: 'fqqk',
    password: 'fqqk0608',
  });
  const doc = parseHTML(res.body);
  const token = doc.find('input[name="csrf_token"]').first().attr('value');

  http.post(url('/'), {
    file: http.file(testImage, 'test-image.png', 'image/png'),
    body: 'posted by k6',
    csrf_token: token,
  });
}