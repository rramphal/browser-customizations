javascript:function appendAll(a){
  /*
     Adds a Base64 encoder/decoder (on top of any page).
     Taken from https://mikebywaters.wordpress.com/2012/07/17/javascript-base-64-encoderdecoder-bookmarklet-2/
  */

  for(var b=0;b<a.length;b++){for(var c=0;c<a[b].c.length;c++){a[b].p.appendChild(a[b].c[c])}}}function getDocDims(){return[Math.max(Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),Math.max(document.body.offsetWidth,document.documentElement.offsetWidth),Math.max(document.body.clientWidth,document.documentElement.clientWidth)),Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight))]}if(document.getElementById("base64container")!=null)document.body.removeChild(document.getElementById("base64container"));var dims=getDocDims();var div=document.createElement("div");div.id="base64container";div.setAttribute("style","width:"+dims[0]+"px;height:"+dims[1]+"px;top:0;left:0;position:absolute;");var basebg=document.createElement("div");basebg.id="base64blackout";basebg.setAttribute("style","width:"+dims[0]+"px;height:"+dims[1]+"px;position:absolute;z-index:100000000;top:0;left:0;background:#000;opacity:0.8;filter:alpha(opacity=80);-moz-opacity:0.8;-khtml-opacity:0.8;");var wrap=document.createElement("div");wrap.id="base64wrap";wrap.setAttribute("style","position:fixed;top:0;left:0;width:100%;height:100%;z-index:200000000;");wrap.onclick=function(a){if(a.target==this){document.getElementById("base64container").parentNode.removeChild(document.getElementById("base64container"))}};var inner=document.createElement("div");inner.id="base64inner";inner.setAttribute("style","position:relative;width:500px;height:200px;z-index:200000000;margin:10px auto;background:white;border-radius:5px;box-shadow:0px 0px 20px -5px #000");var textbit=document.createElement("div");textbit.id="base64textbit";textbit.setAttribute("style","position:relative;width:500px;height:auto;z-index:200000000;margin:10px auto 10px auto;border-radius:5px;text-align:center;font-family:monospace;color:#fff;font-size:25px;text-shadow: 0px 0px 10px black;");textbit.innerHTML="encoder < &nbsp; > decoder";var leftArea=document.createElement("div");leftArea.id="base64leftarea";leftArea.setAttribute("style","float:left;width:235px;height:180px;border-radius:3px;margin:10px 0px 10px 10px;");var rightArea=document.createElement("div");rightArea.id="base64rightarea";rightArea.setAttribute("style","float:left;width:235px;height:180px;border-radius:3px;margin:10px;");var rightTextArea=document.createElement("textarea");rightTextArea.id="base64righttextarea";rightTextArea.setAttribute("style","width:233px;height:100%;border-radius:3px;border-color:#888;padding:0;box-shadow:inset 1px 1px 5px #aaa;");rightTextArea.onkeyup=function(){leftTextArea.value=atob(this.value)};var leftTextArea=document.createElement("textarea");leftTextArea.id="base64lefttextarea";leftTextArea.setAttribute("style","width:233px;height:100%;border-radius:3px;border-color:#888;padding:0;box-shadow:inset 1px 1px 5px #aaa;");leftTextArea.onkeyup=function(){rightTextArea.value=btoa(this.value)};appendAll([{p:leftArea,c:[leftTextArea]},{p:rightArea,c:[rightTextArea]},{p:inner,c:[leftArea,rightArea]},{p:wrap,c:[inner,textbit]},{p:div,c:[basebg,wrap]},{p:document.body,c:[div]}]);
