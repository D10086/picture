function picture(el,options){
    var out = document.querySelector(el)
    // if(options.row && options.col && options.row * options.col !=out.children.length){
    //     throw 'col && row err'
    // }

    var defaultOp = {
        maxw:350,
        maxh:400,
        minw:200,
        minh:50
    }
    // 合并宽高数据
    Object.assign(defaultOp,options);

    // 设置盒子宽高
    out.style.width = (defaultOp.maxw+(defaultOp.row-1)*defaultOp.minw)+'px'

    // 计时动画效果
    var timer = null;
    var stime = new Date().getTime();
    function activepic(index){
        if(timer){
            clearInterval(timer)
        }
        var ntime = new Date().getTime();
        if(ntime - stime<500){
            timer = setTimeout(function(){
                activepic(index)
            },500)
            return
        }
        stime = ntime

        // 格子变化规律
        var cx = index % defaultOp.row
        var cy = parseInt(index/defaultOp.row)
        for(var y = 0;y<defaultOp.col;y++){
            for(var x = 0;x<defaultOp.row;x++){
                var cindex = defaultOp.row * y + x 
                if(x == cx && y == cy){
                    // 最大格子
                    out.children[cindex].style.width = defaultOp.maxw+'px'
                    out.children[cindex].style.height = defaultOp.maxh+'px'
                }else if(x==cx){
                    // 同一列
                    out.children[cindex].style.width = defaultOp.maxw+'px'
                    out.children[cindex].style.height = defaultOp.minh+'px'
                }else if(y==cy){
                    // 同一行
                    out.children[cindex].style.width = defaultOp.minw+'px'
                    out.children[cindex].style.height = defaultOp.maxh+'px'
                }else{
                    out.children[cindex].style.width = defaultOp.minw+'px'
                    out.children[cindex].style.height = defaultOp.minh+'px'
                }
            }
        }
    }
    for(var i = 0;i<out.children.length;i++){
        out.children[i].index = i
        out.children[i].onclick = function(){
            activepic(this.index)
        }
    }
}