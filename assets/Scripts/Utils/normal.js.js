
//FIXME:BUG
Array.prototype.contain=t=>{
    for(let v of this){
        if(v===t)return true;
    }

    return false;
}

Array.prototype.remove=t=>{
    let id = this.indexOf(t);
    id>=0?this.splice(id,1):null;
}