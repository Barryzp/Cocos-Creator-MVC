
//FIXME:BUG
Array.prototype.contain=function(t){
    for(let v of this){
        if(v===t)return true;
    }

    return false;
}

Array.prototype.remove=function(t){
    let id = this.indexOf(t);
    return id>=0?this.splice(id,1):null;
}