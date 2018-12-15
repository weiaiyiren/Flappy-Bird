		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
   		var flag = true; //标志位
   		var id = null; //水管的id
   		var mark = 0; //得分

   		//创建gameready
   		var ready = new Image();
   		ready.src = "images/ready.png";

   		function drawReady() {
   			context.drawImage(ready, 120, 240, 160, 40);
   		}

   		//创建gameover
   		var over = new Image();
   		over.src = "images/over.png";

   		function drawOver() {
   			context.drawImage(over, 120, 240, 160, 40);
   		}

   		//创建背景图
   		var bg = new Image();

   		function drawBg() {
   			if(mark>=2&&mark<4) {
   				bg.src = "images/bg.png";
   			}else {
   				bg.src = "images/bg_day.png";
   			}
   			context.drawImage(bg, 0, 0, 400, 600);
   		}
   			
   		//创建游戏名
   		var gamename = new Image();
   		gamename.src = "images/name.png";

   		function drawName() {
   			context.drawImage(gamename, 150, 10, 100, 20);
   		}

   		//创建默认草地
     	var ground = new Image();
     	ground.src = "images/ground.png";
   		function drawGround() {
   			context.drawImage(ground, 0, 550, 800, 200);
   		}
     	
     	//创建草地群
   		var groundArr = []
   		var groundTimer = null;

   		var createGrounds=(function () {
   			groundTimer = setInterval(function() {
   				var ground = new Image();
	   				ground.positionX =0;
	   				ground.positionY = 550;
	   				ground.src = "images/ground.png";
	   				groundArr.push(ground);
   			}, 2000);
   		}());
   		
   		function drawGrounds() {
   			for(var i = 0; i < groundArr.length; i++) {
   				context.drawImage(groundArr[i], groundArr[i].positionX, groundArr[i].positionY,800,200);
   				groundArr[i].positionX -= 2;
   				console.log(groundArr[i].positionX);
   			}
   		}

   		//创建小鸟
   		var birdImgday = ["images/b0.gif", "images/b1.gif", "images/b2.gif"];
   		var birdImg = ["images/bird_0.gif", "images/bird_1.gif", "images/bird_2.gif"];
   		birdIndex = 0,
   			bird = new Image(),
   			birdX = 100,
   			birdY = 200,
   			birdTimer = null;

   		function drawbird() {
   			if(mark>=2&&mark<4) {
   				bird.src = this.birdImg[birdIndex % 3];
   			}else{
   				bird.src = this.birdImgday[birdIndex % 3];
   			}
   			context.drawImage(bird, birdX, birdY, 40, 30);
   			setTimeout(  _=> {
   				birdIndex++;
   			}, 4000);
   		}

   		//创建水管
   		var columnArr = [];
   		var columnTimer = null;

   		setTimeout(createColumn=>{
   			columnTimer = setInterval(function() {
   				var column = {}; //水管容器
   				column.positionX = 400;
   				column.positionY = -Math.round(Math.random() * 200 + 50);
   				column.Up = new Image();
   				column.Down = new Image();
   				if(mark>=2&&mark<4) {
   					column.Up.src = 'images/up.png';
   					column.Down.src = 'images/down.png';
   				}else{
   					column.Up.src = 'images/pipe-up.png';
   					column.Down.src = 'images/pipe-down.png';
   				}
   				column.id = `${Date.now()}`;
   				columnArr.push(column);
   			}, 2000);
   		}, 2000);
   		
   		function drawColumn() {
   			for(var i = 0; i < columnArr.length; i++) {
   				context.drawImage(columnArr[i].Up, columnArr[i].positionX, columnArr[i].positionY, 70, 350);
   				context.drawImage(columnArr[i].Down, columnArr[i].positionX, columnArr[i].positionY + 500, 70, 350);
   				columnArr[i].positionX -= 2;
   			}
   		}

   		function getScore() {
   			drawColumn();
   			if(birdY >= 520 && mark == 0) {
   				fall();
   			}
   			for(var i = 0; i < columnArr.length; i++) {
   				if(birdX + 40 >= columnArr[i].positionX && birdX - 70 <= columnArr[i].positionX) {
   					//加分
   					if(columnArr[i].id != id) {
   						mark++;
   						id = columnArr[i].id;
   					}
   					//发生碰撞
   					if(birdY < columnArr[i].positionY + 350 || birdY + 30 > columnArr[i].positionY + 500) {
   						mark--;
   						gameOver();
   					}
   				}
   				if(birdY >= 520 && mark != 0) {
   					gameOver();
   				}
   			}
   		}
   		//游戏结束
   		function gameOver() {
   			clearInterval(columnTimer);
   			clearInterval(birdTimer);
   			clearInterval( groundTimer);
   			var ores = document.getElementById('res');
   			ores.style.display = 'block';
   			ores.children[0].innerHTML = `得分:${mark}`;
   			//      	if(mark > 0 && mark <= 10) {
   			//      		ores.children[1].src = 'images/gold_03.jpg';
   			//      	}
   			setTimeout( _ => {
   				ores.style.display = 'none';
   				drawOver();
   				setTimeout( _ => {
   					location.reload();
   				}, 2000);
   			}, 3000);
   		}
   		//掉落地面
   		function fall() {
   			clearInterval(columnTimer);
   			clearInterval(birdTimer);
   			clearInterval( groundTimer);
   			var ores = document.getElementById('res');
   			ores.style.display = 'block';
   			ores.children[0].innerHTML = `不要让bird坠落`;
   			ores.children[1].src = 'images/silver_03.jpg';
   			setTimeout( _=> {
   				ores.style.display = 'none';
   				drawOver();
   				setTimeout( _=> {
   					location.reload();
   				}, 2000);
   			}, 3000);
   		}

   		//游戏初始化
   		var numTimer=null;
   		var $time=document.getElementById('time');
   		var timeArr=["images/3.png","images/2.png","images/1.png"];
   		var timeIndex=0;
   		
   		function start () {
   			$time.style.display='block';
   			numTimer=setInterval( _ => {
   				$time.children[0].src=timeArr[timeIndex];
   				timeIndex++;
   				if (timeIndex>2) {
   					timeIndex=2;
   				}
   			},1000);
   		}
   		
   		//游戏加载完成
   		window.onload = function() {
   			start();
   			if(birdTimer == null) {
   				birdTimer = setInterval( _=> {
   					setTimeout( _=>{
   						flag = false;
   						birdY += 2;
   						clearInterval(numTimer);
   						$time.style.display='none';
   						if(birdY <= 0) {
   							birdY = 0;
   						}
   					}, 4000);
   					context.clearRect(0, 0, 400, 600);
   					drawBg();
   					drawbird();
   					getScore();
   					drawGrounds();
   					drawName();
   					if(flag) {
   						drawGround();
   						drawReady();
   					}
   				}, 10);
   			}
   		}
     

   		//鼠标按下
   		document.onmousedown = function(e) {
   			e = e || window.event;
   			if(!flag) {
   				birdY -= 90;
   			}
   			e.preventDefault();
   		}

   		//空格键按下
   		document.onkeydown = function(e) {
   			var e = e || event;
   			var keyCode = e.keyCode || e.which;
   			if(keyCode == 32) {
   				if(!flag) {
   					birdY -= 90;
   				}
   			}
   			if(keyCode == 80) {// P键暂停
   				clearInterval(columnTimer);
   			    clearInterval(birdTimer);
   			    clearInterval( groundTimer);
   			}
   		}