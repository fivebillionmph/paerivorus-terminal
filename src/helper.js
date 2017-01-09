function userStyle(style, userStyle) {
    if(!userStyle) return style;
    for(var prop in style) {
        if(userStyle.hasOwnProperty(prop)) {
            style[prop] = userStyle[prop];
        }
    }
    return style;
}

function maxArrayLengthFront(array, max) {
    var infiniteCounter = 0;    // prevent infinite loop
    while(array.length > max) {
        array.shift();
        infiniteCounter++;
        if(infiniteCounter > 100) break;
    }
    return array;
}

export {
    userStyle,
    maxArrayLengthFront
};
