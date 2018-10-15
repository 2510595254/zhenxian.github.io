//this 当前对象  采取就近原则（它离哪个对象最近 它就代表哪个对象）
	(function($){
				$.fn.extend({
						playImg:0,//记录当前播放到哪一张图片的下标
						imgNum:0,//存储所有图片的数量
						imgWidth:0,//存储图片的宽度
						timmerid:null,//存储定时器id
						times:2000,//存储动画执行间隔时间 默认是2000
						//初始化 做一些基本的工作
						initial:function(){
							var o=this;//给当前对象一个别名
							var firstImg=this.children('img').first().clone();
							this.append(firstImg);
							var $imgs=this.children('img');
							//获取图片的数量 和图片宽度
							this.imgNum=$imgs.length;
							this.imgWidth=$imgs.width();
							//给所有图片一个外层包裹元素
							$imgs.wrapAll('<div id="box"/>');
							//外层包裹元素的宽度为 所有图片的宽度总和
							var divWidth=this.imgNum*this.imgWidth;
							this.find('div').css({
								width:divWidth,
								height:224,
								position:'absolute'
							});
							this.hover(function(){
								clearInterval(o.timmerid);
							},function(){
								o.autoPlay();
							});
						},
						bindPreNext:function(){
							var o=this;
							var pre=$('<a/>',{
								id:'preview',
								href:'javascript:void(0)'
							}).css({
								position:'absolute',
								left:0,
								width:100,
								height:50,
								top:'50%',
								marginTop:-25,
								color:"#FFF",
								background:'rgba(0,0,0,0.5)'
							}).appendTo(this).html('上一张').click(function(){
								o.playImg -=2;
								if(o.playImg<0){
									o.find('div#box').css({
										left:-(o.imgNum-1)*o.imgWidth
									});
									o.playImg=o.imgNum-2;
								}
								o.nextImg();
							});

							var next=$('<a/>',{
								id:'nextview',
								href:'javascript:void(0)'
							}).css({
								position:'absolute',
								right:0,
								width:100,
								height:50,
								top:'50%',
								marginTop:-25,
								color:"#FFF",
								background:'rgba(0,0,0,0.5)'
							}).appendTo(this).html('下一张').click(function(){
								o.nextImg();
							});
						},
						//生成图片对应的下标
						bindIcon:function(){
							var o=this;//  obj==>object
							var ul=$('<ul/>').appendTo(this).css({
								position:'absolute',
								zIndex:2,
								listStyle:'none',
								bottom:10,
								left:'50%',
								transform:'translate(-50%)'
							});
							for(var i =1;i<this.imgNum;i++){
								$('<li/>').html(i).css({
									width:20,
									height:20,
									background:'#F00',
									float:'left',
									marginLeft:5,
									borderRadius:10,
									textAlign:'center',
									cursor:'pointer'
								}).appendTo(ul);
							}
							this.find('li:first').css('background','#00f');
							//给下标绑定事件
							this.find('li').click(function(){
								var index=$(this).index();
								o.playImg=index;
								o.nextImg();
							});
						},
						//计算下一次应该显示哪一张图片
						nextImg:function(){
							     var o=this;
							     //判断是否是最后一张图片 如果是 那么就从0开始
								var moveWidth= -this.playImg*this.imgWidth;//计算div移动距离
								//改变下标图标的颜色
								this.find('li').css('background','#F00').eq(o.playImg).css('background','#00f');
								
								this.playImg++;//下一张图片 就是当前播放图片+1
								this.find('div#box').stop(true).animate({
									left:moveWidth
								},500,function(){
									//动画执行完成的时候判断是否最后一张
									if(o.playImg>=o.imgNum){
										o.playImg=0;//播放图片的位置归0
										o.find('div').css({left:0});//div的距离左边的距离归0
										o.nextImg();//进入下一次播放
									}
								});
								
						},
						//用定时器实现自动轮播
						autoPlay:function(){
							var o=this;
							o.timmerid=setInterval(function(){
								o.nextImg();
							},o.times);
						},
						imgscroll:function(param){
							//this===> jquery对象 +  { } 自定义对象 + element元素对象
							this.initial();
							if(typeof param.times == 'number'  && parseInt(param.times)>100){
								this.times=param.times;
							}
							if(typeof param.next == 'boolean' && param.next==true){
								this.bindPreNext();
							}
							if(typeof param.bottomicon == 'boolean' && param.bottomicon==true){
								this.bindIcon();
							}
							if(typeof param.autoplay == 'boolean' && param.autoplay==true){
								this.autoPlay();
							}
						},
					});
	})(jQuery);
	