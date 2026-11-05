const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const pages = fs.readdirSync('.').filter(p => p.endsWith('.html'));
test('public site has content pages', () => assert.ok(pages.length >= 9));
for (const file of pages) {
 test(`${file}: metadata, structured data and local links`, () => {
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /name="viewport"/);
  assert.match(html, /<h1[\s>]/);
  for (const block of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(block[1]);
  for (const [, url] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
   if (/^(?:[a-z]+:|\/\/)/i.test(url)) continue;
   const local = decodeURIComponent(url.split(/[?#]/)[0]);
   if (local) assert.ok(fs.existsSync(path.resolve(path.dirname(file), local)), `${file}: missing ${url}`);
  }
 });
}
