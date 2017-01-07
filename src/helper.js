function userStyle(style, userStyle) {
    if(!userStyle) return style;
    for(var prop in style) {
        if(userStyle.hasOwnProperty(prop)) {
            style[prop] = userStyle[prop];
        }
    }
    return style;
}

export { userStyle };
