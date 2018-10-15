$.fn.extend({
    createEle:function () {
        this.append( $('<div></div>').addClass('small'));
        this.find('.small').append($('<img src="images/small.jpg"/>').css({
            width:350,
        }))
        this.find('.small').append($('<div></div>').addClass('mask'));
        this.find('.small').append($('<div></div>').addClass('big'));
        this.find('.big').append($('<img src="images/big.jpg"/>'))
    },//创建元素并确定好页面结构
    cover:function () {
        var i=this;
        this.hover(function () {
            i.find('.mask').css('display','block');
            i.find('.big').css('display','block');
        },function () {
            i.find('.mask').css('display','none');
            i.find('.big').css('display','none');
        });
    },//遮挡层移入移出事件

    moveOn:function () {
        var g=this;
        this.find('.small').mousemove(
            function (event) {
                var EndX=event.pageX;
                var EndY=event.pageY;

                var runX=EndX-g.offset().left-(g.find('.mask').width()/2);
                var runY=EndY-g.offset().top-(g.find('.mask').height()/2);
//    console.log(runX);
//    console.log(runY);
                if(runX<0){
                    runX=0;
                }
                if(runX>g.find('.small').width()-g.find('.mask').width()){
                    runX=g.find('.small').width()-g.find('.mask').width();
                }
                if(runY<0){
                    runY=0;
                }
                if(runY>g.find('.small').height()-g.find('.mask').height()){
                    runY=g.find('.small').height()-g.find('.mask').height();
                }
                g.find('.mask').css('left',runX);
                g.find('.mask').css('top',runY);
                var bl=parseInt(g.find('.big img').width()/g.find('.small').width());
                g.find('.big img').css('marginLeft',-bl*runX);//此时
                g.find('.big img').css('marginTop',-bl*runY);
            });
    },//大小图片联动

    paly:function () {
        this.createEle();
        this.cover();
        this.moveOn()
    }//执行放大镜效果
});
$('#box').paly();