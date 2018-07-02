javascript:(
    function () {
        Array.from(document.links).forEach(function (link) {
            console.log(link.href);
        });
    }
)();
