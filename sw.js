/*
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */


version = '1.1';

let cacheName = "Tykki's Musik" + version;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './views/chat.html',
        './views/login.html',
        './views/map.html',
        './views/profile.html',
        './dexie.min.js',
        './db.js',
        './fb.js',
        './styles.css',
        './app.js',
        './sw.js',
        './favicon.ico',
        './manifest.json',
        './192x192.png',
        './512x512.png'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

// https://stackoverflow.com/questions/41009167/what-is-the-use-of-self-clients-claim

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});