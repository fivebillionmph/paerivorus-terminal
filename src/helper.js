function userStyle(style, userStyles) {
    if(!userStyles) return style;
    for(var prop in style) {
        if(userStyles.hasOwnProperty(prop)) {
            style[prop] = userStyles[prop];
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

function sharedStart(array){
    // from: http://stackoverflow.com/a/1917041
    var A= array.concat().sort(), 
    a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
    while(i<L && a1.charAt(i)=== a2.charAt(i)) i++;
    return a1.substring(0, i);
}

export {
    userStyle,
    maxArrayLengthFront,
    sharedStart
};
