function Progress(opt){
	var def={
		cvs:"#progress",
		color:"red",
		speed:3,
		val:0.5
	}
	//设置默认参数
	this.set=this.extend({},def,opt);
	this.init();
	this.creat();
	this.creatPro()
}
Progress.prototype={
	constructor:Progress,
	//初始化默认参数
	init:function(){
		this.cvs=document.querySelector(this.set.cvs);
		this.ctx=this.cvs.getContext("2d");
		this.color=this.set.color;
		this.speed=this.set.speed;
		this.val=this.set.val;
		this.deg=Math.PI/180;
		this.size={
			w:this.cvs.width,
			h:this.cvs.height
		}
		this.ctx.translate(this.size.w/2,this.size.h/2);
		this.r=(this.size.h-40)/2;
	},
	//扩展参数
	extend:function(){
		for(var i=1;i<arguments.length;i++){
			for(var k in arguments[i]){
				arguments[0][k]=arguments[i][k];
			}
		}
		return arguments[0];
	},
	//创建进度条
	creat:function(){
		//首先创建圆
		this.ctx.beginPath();
		this.ctx.lineWidth=20/600*this.size.w;
		this.ctx.strokeStyle="#ccc";
		this.ctx.arc(0,0,this.r,0,360*this.deg);
		this.ctx.stroke()
	}, 		
	creatPro:function(){
		//结束的角度
		var end=this.val*360;
		var ctx=this.ctx;
		var step=0;
		var that=this;
		requestAnimationFrame(draw);
		function draw(){
			step+=that.speed;
			ctx.beginPath();
			ctx.strokeStyle=that.color;
			ctx.arc(0,0,that.r,-90*that.deg,(step-90)*that.deg)
			ctx.stroke();
			if(step<end){
				requestAnimationFrame(draw);
			}
			//写百分比
			ctx.clearRect(-40,-25,80,50)
			ctx.beginPath();
			ctx.font=30/600*that.size.w+"px 微软雅黑"
			ctx.fillText(parseInt(step/360*100)+"%",-30/600*that.size.w,15/600*that.size.h);
		}
	}
}