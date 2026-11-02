# Static website deployment

This branch exports a brochure site to `out/`. It does not require a Node.js web server.

1. Run `npm ci` with Node.js 20 or newer.
2. Run `npm run lint`, `npm run build`, then `npm run typecheck`.
3. Serve the contents of `out/` at the root of the selected HTTPS web host. Keep the `_next/` directory and all locale directories.
4. `/` is a language selector. Public pages are `/en/`, `/ru/`, `/tk/`, plus each locale's `/contact/`.
5. Configure the host to serve directory `index.html` files and `404.html` for missing pages. No server-side rewrites or middleware are needed.

The contact form opens the visitor's email program, addressed to `info@rysgallytech.com`. It does not submit to Formspree or claim server delivery. The visitor must send the email. Receiving mailbox/forwarding must be verified by the owner separately.

Before production publication: verify the selected hosting account, preserve existing DNS/MX records, check HTTPS, and confirm that corporate email reaches its owner. No hosting subscription, DNS change or public deployment was performed as part of this branch.

Company history since 1994 and cotton activities are supplied by the owner. No land scans, acreage, registration scans, permits, stock quantities or contractual export guarantees are published.
