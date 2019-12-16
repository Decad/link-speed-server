
async function handleRequest(request) {
    const init = {
        headers: {
            'Content-Description': 'File Transfer',
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=random.dat',
            'Content-Transfer-Encoding': 'binary',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Cache-Control': 'post-check=0, pre-check=0',
            'Pragma': 'no-cache',
        },
    };

    var data = new Uint32Array(1048576);
    return new Response(data, init);
}

addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
});