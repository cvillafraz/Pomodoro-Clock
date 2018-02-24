window.onload=()=>{
    //variables
    const plus=document.querySelectorAll('.plus');
    const minus=document.querySelectorAll('.minus');
    const start=document.querySelector('#start');
    const stop=document.querySelector('#stop');
    const timer=document.querySelector('#timer');
    const breakL = document.querySelector('#break');
    const session = document.querySelector('#session');
    let sessionInterval,sessionTimeOut,breakInterval,breakTimeOut,counter=0,timeLeft=1500,breakMin=300,breakCounter=0,done=true;
    //set defalut time
    timer.textContent = convertS(timeLeft - counter);
    //functions
    function convertS(s) {
        let min = ('0' + Math.floor(s / 60)).slice(-2);
        let sec = ('0' + s % 60).slice(-2);
        return `${min}:${sec}`;
    }

    function changeT() {
        timer.classList.remove('text-warning');
        timer.classList.add('text-info');
        timer.textContent = convertS(timeLeft - counter);
        counter++;
        sessionInterval = setInterval(() => {
            if (counter <= timeLeft) {
                timer.textContent = convertS(timeLeft - counter);
                counter++;
            } else {
                clearInterval(sessionInterval);
                breakTimeOut = setTimeout(changeB, 0);
                if (breakCounter > breakMin) {
                    breakCounter = 0;
                }
            }
        }, 1000);
    }
    function changeB() {
        timer.classList.remove('text-info');
        timer.classList.add('text-warning');
        timer.textContent = convertS(breakMin - breakCounter);
        breakCounter++;
        breakInterval = setInterval(() => {
            if (breakCounter <= breakMin) {
                timer.textContent = convertS(breakMin - breakCounter);
                breakCounter++;
            } else {
                clearInterval(breakInterval);
                counter = 0;
                sessionTimeOut = setTimeout(changeT, 0);

            }
        }, 1000)
    }
    //events
    plus.forEach((btn) => {
        btn.addEventListener('click',e=>{
            e.preventDefault();
            e.stopPropagation();
            if(done){
                e.target.previousElementSibling.textContent = parseInt(e.target.previousElementSibling.textContent) + 1;
                if (e.target.previousElementSibling == session) {
                    counter=0;
                    timeLeft = parseInt(session.textContent) * 60;
                    timer.textContent = convertS(timeLeft);
                } else {
                    breakMin = parseInt(breakL.textContent) * 60;
                }
            }else{
                return;
            }
            
        });
    });
    minus.forEach(btn=>{
        btn.addEventListener('click',e=>{
            e.preventDefault();
            e.stopPropagation();
            if(done){
                if (e.target.nextElementSibling.textContent < 2 == false) {

                    e.target.nextElementSibling.textContent = parseInt(e.target.nextElementSibling.textContent) - 1;
                }
                if (e.target.nextElementSibling == session) {
                    counter=0;
                    timeLeft = parseInt(session.textContent) * 60;
                    timer.textContent = convertS(timeLeft);
                } else {
                    breakMin = parseInt(breakL.textContent) * 60;
                }
            }else{
                return;
            }
            
        });
    });
    
    start.addEventListener('click',()=>{
        done=false;
        if(counter==0){counter=1;}
        sessionTimeOut=setTimeout(changeT,0);
    });
    stop.addEventListener('click',()=>{
        done=true;
        clearInterval(sessionInterval);
        clearInterval(breakInterval);
    }); 
};