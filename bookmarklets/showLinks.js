javascript:(function(){
    Array.from(document.querySelectorAll('a')).forEach((link) => link.innerHTML += ' (' + link.href + ')');
})();
