var elements = document.getElementsByTagName('*');
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];
        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/(\W|^)((The\sD)|(bulge)|(Groin))(?=\W|$)]/gi, "(oWo wats this?)");
            replacedText = replacedText.replace(/(\W|^)((dick\'?s?)|(penis)|(peniz)|(cock)|(phalis))(?=\W|$)/gi, "[OwO wats this?]");
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}