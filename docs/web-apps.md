# Apex installable apps

Two online-first apps share the existing website and authentication:

| App | Launch | Manifest | App identity |
| --- | --- | --- | --- |
| Apex Curtains | `/` | `/web-apps/apex.webmanifest` | `/?app=apex-curtains` |
| Apex Admin | `/admin` | `/web-apps/admin.webmanifest` | `/admin?app=apex-admin` |

Admin metadata overrides the public manifest and Apple icon throughout `/admin`, including the Atelier, gallery, posts and login. Both use standalone display. The Admin navigation uses full navigations so the Atelier's existing unsaved-change `beforeunload` guard remains effective. Installing does not change permissions or grant staff access.

Installation guidance appears in the public footer and Admin app bar. On supported Chromium browsers, an explicit install button uses the browser's deferred installation offer. Safari users follow Share → Add to Home Screen, keeping Open as Web App enabled when shown. Desktop Safari uses File → Add to Dock. The offer is discarded when moving between the two app identities. No automatic installation prompt or automatic page reload is used.

`public/apex-sw.js` is deliberately network-only for navigations. It caches only the two static, non-personal reconnect notices; it never caches customer pages, surveys, photos, PDFs, authentication responses or API data. APIs, authentication callbacks, downloads and non-navigation requests pass through untouched. A network failure during an Admin navigation shows the Admin reconnect notice; ordinary HTTP responses such as authentication redirects or server errors are preserved. Older caches are removed only within the `apex-offline-` namespace. Bump that cache name when changing an offline notice.

This version does not support offline surveys or background uploads. The Admin connection notice asks users to keep their current screen open, reconnect and confirm saving before closing. Existing saving and error behaviour remains authoritative. `navigator.onLine` is an early connection hint, not proof that a save succeeded.

Icons reuse the existing Apex brand artwork with padding for maskable icons. Run `node scripts/web-app-icons.mjs` to regenerate 180, 192 and 512 pixel variants.

Verification: `npm run test:web-app` checks distinct manifests and icon dimensions, the offline cache allowlist, cache ownership, network-only private navigation, offline routing and API/auth/upload/download exclusions. Run the production build and inspect the login, public install guide and mobile Atelier in a browser. Actual installation on iOS/iPadOS is completed by the device owner.

Platform references: [Apple installation guide](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios), [MDN install prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event), [MDN manifest scope](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/scope).
