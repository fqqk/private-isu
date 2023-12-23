// ユーザーがログインしてコメントを投稿する

import http from 'k6/http';
import { check } from 'k6';
import { parseHTML } from 'k6/html';
import { url } from './config.js';
import { getAccount } from './account.js';

export default function () {
  // ランダムにログイン用アカウントを取得
  const account = getAccount();
  const login_res = http.post(url('/login'), {
    account_name: account.account_name,
    password: account.password,
  });

  // レスポンスステータスが200であることを確認する
  check(login_res, {
    'is status 200': (r) => r.status === 200,
  });

  // ユーザーページ /@fqqk をget
  const res = http.get(url('/@fqqk'));

  // レスポンス内容をhtmlとしてパースする
  const doc = parseHTML(res.body);

  // formのhidden要素からcsrf_token, post_idを取得する
  const token = doc.find('input[name="csrf_token"]').first().attr('value');
  const post_id = doc.find('input[name="post_id"]').first().attr('value');

  // /comment に対して、 post_id, csrf_token, commentをpost
  const comment_res = http.post(url('/comment'), {
    post_id: post_id,
    csrf_token: token,
    comment: 'k6からのコメント',
  });
  check(comment_res, {
    'is status 200': (r) => r.status === 200,
  });
}