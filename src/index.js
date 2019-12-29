import Router from './router';

const downloadHeaders =
{
    'Content-Description': 'File Transfer',
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=data.dat',
    'Content-Transfer-Encoding': 'binary',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Cache-Control': 'post-check=0, pre-check=0',
    'Pragma': 'no-cache',
};

const blobRegex = '/blob/(.*)';

async function empty() {
    const init = {
        headers: downloadHeaders
    };

    var data = new Uint32Array(0);
    return new Response(data, init);
}

async function blob(request) {
    const init = {
        headers: downloadHeaders
    };

    const url = new URL(request.url);
    const size = Number(url.pathname.match(blobRegex)[1]);

    var data = new Uint8Array(Math.max(Math.min(104857600, size / Uint8Array.BYTES_PER_ELEMENT), 0));
    return new Response(data, init);
}

async function upload(request) {
    const body = await request.blob();
    return new Response({});
}

async function handleRequest(request) {
    const r = new Router();
    r.get('/empty', empty);
    r.post('/upload', upload);
    r.get(blobRegex, blob);
    return await r.route(request);
}

addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
});