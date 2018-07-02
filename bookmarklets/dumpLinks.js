javascript:(
    function () {
        const links = Array.from(document.links).map(function (link) {
            return link.href;
        }).join('\n');
        console.log(links);
    }
)();
