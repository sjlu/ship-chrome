// var findAndReplace = function($node) {

//   var $temp = document.createElement('div')
//   $temp.innerHTML = $node.data.replace(/^(7\d{19})|(\d{1}3\d{18})|(23\d{18})|((EA|EC|CP|RA)\d{9}US)|(82\d{8})$/g, '<a href="http://imparcel.com/track/$&">$&</a>')

//   while($temp.firstChild) {
//     console.log($node)
//     console.log($node.parentNode)
//     $node.parentNode.insertBefore($temp.firstChild, $node)
//   }

//   $node.parentNode.removeChild($node)

// }

// var traverse = function($node) {
//   for ($node = $node.firstChild; $node; $node = $node.nextSibling) {
//     if ($node.nodeType == 3) {
//       findAndReplace($node)
//     } else {
//       traverse($node)
//     }
//   }
// }

// traverse(document.body)

function wrapMatchesInNode(textNode) {

    var temp = document.createElement('div');

    temp.innerHTML = textNode.data.replace(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d|\d{22})\b/g, '<a href="http://imparcel.com/track/$&">$&</a>');

    // temp.innerHTML is now:
    // "n    This order's reference number is <a href="/order/RF83297">RF83297</a>.n"
    // |_______________________________________|__________________________________|___|
    //                     |                                      |                 |
    //                 TEXT NODE                             ELEMENT NODE       TEXT NODE

    // Extract produced nodes and insert them
    // before original textNode:
    while (temp.firstChild) {
        textNode.parentNode.insertBefore(temp.firstChild, textNode);
    }
    // Logged: 3,1,3

    // Remove original text-node:
    textNode.parentNode.removeChild(textNode);

}

function traverseChildNodes(node) {

    var next;

    if (node.nodeType === 1) {

        // (Element node)

        if (node = node.firstChild) {
            do {
                // Recursively call traverseChildNodes
                // on each child node
                next = node.nextSibling;
                traverseChildNodes(node);
            } while(node = next);
        }

    } else if (node.nodeType === 3) {

        // (Text node)

        // if (/bRFd{5}/.test(node.data)) {
            // Do something interesting here
            wrapMatchesInNode(node);
        // }

    }

}

traverseChildNodes(document.body)

// var n;
// var walk = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
// while(n = walk.nextNode()) {

//   findAndReplace(n)

// }