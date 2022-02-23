function picture(el, options) {

    var out = document.querySelector(el)
    // el:dom元素 
    // options:希望用户传入的参数  用户自己指定显示几行几列,
    // 用户也可以指定 块显示的最大宽度/最小宽度  
    // 希望用户指定的书籍比较多,所以options我们以对象的形式来定义

    // 确保用户传入参数的合法性
    if (options.row && options.col && options.row * options.col !=out.children.length) {
        throw 'col && row err'
    }
    
    // 默认的格子大小
    var defaultOp = {
        maxw:380,
        maxh:450,
        minw:200,
        minh:80,
    }
    // 把传入的选项和默认项进行合并,Object.assign(targar,obj1,obj2); target:目标对象,obj1...要进行合并的项
    Object.assign(defaultOp,options);

    // 设置out宽度
    out.style.width = (defaultOp.maxw + (defaultOp.row-1)*defaultOp.minw)+'px'

    var timer = null;
    var stime = new Date().getTime();
    function activepic(index){
        
            if(timer){
                clearTimeout(timer)
            }
            var ntime = new Date().getTime();
            if(ntime - stime <500){
                timer =  setTimeout(function(){
                    activepic(index)
                    
                },500)
                return
            }
            stime = ntime; 
        
        // 格子变化规律,都在这个函数中完成

        var cx = index % defaultOp.row
        var cy = parseInt(index/defaultOp.row)

        // 先把格子网格化
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
        out.children[i].onmouseenter = function(){
            activepic(this.index)
        }
    }


}
