window.onload=function(){
    var score=document.querySelector('.Score');//获取分数
    var startscreen=document.querySelector('.StartScreen');//启动提示框
    var gamearea=document.querySelector('.GameArea');
    var player={ speed:5,score:0};//创建一个玩家对象
    var highest=0;
    //console.log("test");
    startscreen.addEventListener('click',start);//单击启动游戏
    //创建用户操作按键的对象
    var keys={ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};
    //添加事件监听
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);
    //用户敲击向下方向键
    function keyDown(ev)
    {
        ev.preventDefault();//取消事件的默认动作
        keys[ev.key]=true;
    }
    //用户敲击向上方向键
    function keyUp(ev)
    {
        ev.preventDefault();//取消事件的默认动作
        keys[ev.key]=false; 
    }
    //判断是否相撞
    function isCollide(a,b)
    {
        aRect=a.getBoundingClientRect();//返回元素的大小及其相对于视口的位置
        bRect=b.getBoundingClientRect();
        //判断两物体边界是否有相交
        return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
    }
    function moveLines()//道路中间线的移动
    {
        var lines=document.querySelectorAll('.lines');
        lines.forEach(function(item)
        {
            if(item.y>=700)
            {
                item.y-=750;
            }
            item.y+=player.speed;
            item.style.top=item.y+'px';
    
        })
    }
    //游戏结束
    function endGame()
    {
        player.start=false;
        startscreen.classList.remove('hide');
    }
    
    function moveCar(car)
    {
        var other=document.querySelectorAll('.other');//获取障碍物
        other.forEach(function(item)//forEach对所有元素操作
        {
            //判断如果车和障碍相撞
            if(isCollide(car,item))
            {
                console.log('HIT'+item.y);
                endGame();//相撞 游戏结束
            }
            if(item.y>=750)
            {
                item.y=-300;//高度定位到屏幕中间位置
                item.style.left=Math.floor(Math.random()*350) + 'px';//横向位置随机 Math.random()生成一个0-1之间的随机数
            }
            item.y+=player.speed;//障碍移动高度
            item.style.top=item.y+'px';//赋值top属性 使其显示在屏幕
    
        })
    }
    
    function gamePlay()
    {
    
        var car=document.querySelector('.car');
        var road=gamearea.getBoundingClientRect();//获取游戏区域大小
    
        if(player.start)
        {
    
            moveLines();//调用背景线运动函数
            moveCar(car);//调用车运动函数并判断相撞情况
            if(keys.ArrowUp && player.y>(road.top+70))//向下移动一个速度单位
            {
                player.y-=player.speed;
            }
            if(keys.ArrowDown && player.y<(road.bottom-70))//向上移动一个速度单位
            {
                player.y+=player.speed;
            }
            if(keys.ArrowLeft && player.x>0)//向左移动一个速度单位
            {
                player.x-=player.speed;
            }
            if(keys.ArrowRight && player.x<(road.width-50))//向右移动一个速度单位
            {
                player.x+=player.speed;
            }
            //对样式赋值 使其显示在屏幕
            car.style.top=player.y + 'px';
            car.style.left=player.x + 'px';
    
            window.requestAnimationFrame(gamePlay);//页面通过requestAnimationFrame不停重绘实现动态效果
            player.score++;
            if(player.score>=highest)//判断并替换最高分
            {
                highest=player.score;
            }
            score.innerHTML="当前得分:"+ player.score+"<br><br>"+"最高得分:"+highest;

        }
        
    }

    function Reset()
    {
        highest=0;
    }

    function start()//初始化函数
    {
        //gamearea.classList.remove('hide');
        startscreen.classList.add('hide');
        gamearea.innerHTML="";
    
        player.start=true;
        player.score=0;
        window.requestAnimationFrame(gamePlay);//页面通过requestAnimationFrame不停重绘实现动态效果
        //创建道路中间线
        for(x=0;x<5;x++)
        {
            var roadline=document.createElement('div');
            roadline.setAttribute('class','lines');
            roadline.y=(x*150);
            roadline.style.top=roadline.y+'px';
            gamearea.appendChild(roadline);
        }
        //创建赛车
        var car=document.createElement('div');
        car.setAttribute('class','car');
        gamearea.appendChild(car);
    
        player.x=car.offsetLeft;
        player.y=car.offsetTop;
    
        //创建障碍物
        for(x=0;x<3;x++)
        {
            var othercar=document.createElement('div');
            othercar.setAttribute('class','other');
            othercar.y=((x+1)*350)* -1;//一开始在y轴负轴
            //对样式赋值 使其显示在屏幕
            othercar.style.top=othercar.y+'px';
            othercar.style.left=Math.floor(Math.random()*350) + 'px';
            gamearea.appendChild(othercar);
        }
    }
    
}
