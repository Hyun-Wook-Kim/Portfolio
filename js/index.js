"use strict";

const sections = $(".sections");
const sectionSec = $(".sections .section");
const sec2Title = $(".sec2-title");
const sec2Main = $(".section2-textBox");
const sec1 = $('.section.sec1');
const sec1pTag = $(".sec1pTag")
const sec1SubTitme = $('.subTitle')

const gnbUl = $(".gnb>ul");
const gnbLi = $(".gnb>ul>li");
const gnbLiAtag = $(".gnb>ul>li>a");


$('.list>ul>li>img').on('mouseover',()=>{
  let _target = event.target;
  $(_target).siblings().css({'visibility':"visible", "opacity" : "1"});
})

$('.list>ul>li>img').on('mouseout',()=>{
  let _target = event.target;
  $(_target).siblings().css({'visibility':"hidden", "opacity" : "0"});
})

//마우스 휠 이벤트를 막아주는 거/
let wheelAllow = true;

//sec2의 애니메이션이 한번만 실행되도록 막는 변수.
let sec2Action = true;

//i 의 번지는 윈도우 스크롤을 화면 높이로 나누어서 몇번째 섹션인지 구한다.
let i = Math.ceil(scrollY / window.innerHeight);

// 휠을 하면 기본 이벤트 방지 -> gnb의 li가 현재 i(섹션의 순서)에 맞게 class on;

window.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    event.stopPropagation();
    let deltaY = event.wheelDeltaY;
    console.log(i);
    wheelMove(deltaY);

    //이동한 후 i의 값에 해당하는 items 번지에서는 class remove
    gnbLiAtag.eq(i).addClass("show");
    sec2Animate();
    if(i == 2){
      gnbLiAtag.css('color','white')
      gnbLiAtag.eq(2).addClass('show')
    }
    else{
      gnbLiAtag.css('color','black')
    }
  },
  {
    passive: false,
    // 이거 때문에 jquery로 하면 passive evnet는 preventdefault를 할 수 없다고 뜬다..
    // 그래서 구글 개발까지 들어가봤는데 passive를 지정해 주는 함수 자체가 없다 ㅠㅠㅡㅡㅡㅡㅠㅡㅠㅡㅡㅠ
    // prevent를 쓰지 않고 함수를 통해 쓰로틀링을 줘도 마찬가지였다.
  }
);

//휠 이벤트를 1.5초에 한번씩만 적용, 마우스 방향을 감지해서 위 / 아래 구분
// 방향에 따라 이전 / 다음 section의 top으로 이동.

function wheelMove(deltaY) {
  if (wheelAllow == true) {
    gnbLiAtag.eq(i).removeClass("show");
    wheelAllow = false;
    if (deltaY < 0) {
      i++;
      if (i > sectionSec.length - 1) {
        i = sectionSec.length - 1;
      }
      let moveTop = sectionSec.eq(i).offset().top;
      window.scrollTo(0, moveTop);
    } else {
      i--;
      if (i < 0) {
        i = 0;
      }
      let moveTop = sectionSec.eq(i).offset().top;
      window.scrollTo(0, moveTop);
    }
    sectionAnimate()
    setTimeout(() => {
      wheelAllow = true;
    }, 1500);
  }
}


//화면이 이동할 때 너비가 변하는 애니메이션
function sectionAnimate(){
  $('.section').eq(i).siblings().removeClass('current');
  $('.section').eq(i).addClass('current');
}

// 화면이 2번째 섹션이 처음 진입할 경우에만 일어나는 애니메이션
function sec2Animate() {
  if ((i == 1, sec2Action == true)) {
    sec2Action = false;
    sec2Title.animate(
      {
        opacity: "1",
      },
      2000,
      () => {
        sec2Title.animate(
          {
            opacity: "0",
          },
          1000
        );
      }
    );

    setTimeout(() => {
      sec2Main.animate(
        {
          opacity: "1",
        },
        1000
      );
    }, 2000);
  }
}


gnbUl.on("click", () => {
  itemsMove();
});

//li를 클릭하면 해당 i번지로 화면이 이동하고 items도 해당 i 번지에 class 가 부여되도록 함.
function itemsMove() {
  event.preventDefault();
  let _target = event.target;
  gnbLi.each((idx, el) => {
    if (_target.parentElement == el) {
      i = idx;
      gnbLiAtag.each((idx, el) => {
        el.classList.remove("show");
      });
      // gnbLiAtag[i].classList.add('show')
      gnbLiAtag.eq(i).addClass("show");
      let moveTop = sectionSec.eq(i).offset().top;
      window.scrollTo(0, moveTop);
    }
  });
  if(i == 1){
    sec2Animate();

  }
  if(i == 2){
    gnbLiAtag.css('color','white')
  }
  else{
    gnbLiAtag.css('color','black')
  }
  sectionAnimate()
}

// 자바 스크립트로는 되는데 제이쿼리로는 안된다...?

// $(window).on('wheel',(event)=>{
//     let deltaY =(event.wheelDeltaY);
//     let currentTop = $(window).scrollTop();
//     $(window).scrollTop(currentTop);
//         if(deltaY < 0){
//             console.log('아래로');
//             i++;
//             if(i>4){
//                 i = 4;
//             }
//             let moveTop = sectionSec.eq(i).offset().top;
//             console.log(moveTop);
//             $(window).scrollTop(moveTop);
//            console.log(i)
//         }
//         else{
//             console.log('위로')
//             i--;
//             if(i<0){
//                 i = 0;
//             }
//             let moveTop = sectionSec.eq(i).offset().top;
//             $(window).scrollTop(moveTop);
//             console.log(moveTop);
//             console.log(i)
//         }
//     wheelAllow = false;
//     setTimeout(()=>{
//         wheelAllow = true
//     },1500)

//     })

const logo = $(".logo");
const title1 = $(".section1-title");
const titleText1 = $(".section1-title>p");
const bottomText1 = $(".section1-bottom>p");
const gnb = $(".gnb");

//윈도우가 로드 되면 처음 실행되는 애니메이션 함수
$(window).on("load", () => {
  loadFunc();
});


//처음 로드가 되면 일어나는 애니메이션 함수
function loadFunc() {
  if(i == 1){
    sec2Animate();
  }
  if(i == 2){
    gnbLiAtag.css('color','white')
    gnbLiAtag.eq(2).addClass('show')
  }
  else{
    gnbLiAtag.css('color','black')
  }
  wheelAllow = false;

    logo.css("opacity","1");
    logo.css("transition","all 3.5s");
    logo.css("transform","translateX(-50%) translateY(-50%) rotate(360deg)");
    setTimeout(() => {
      logo.css({'opacity':'0','display':'none'});
    }, 1000);


  setTimeout(() => {
    sec1.css({'transition':'all 1s','opacity':'1'});
    gnb.css("right", "0");
  }, 1500);

  setTimeout(()=>{

        sec1pTag.css('transition','all 1s')
        sec1pTag.css('opacity','1');
        sec1SubTitme.css({'transition':'all 2s', 'opacity':'1'})
        wheelAllow = true;
  },2000)
  
  

  // sec2Animate();

  // 윈도우가 로드 되면 첫번째 i값에 해당하는 items에 add class
  gnbLiAtag.eq(i).addClass("show");
  sectionAnimate()
}

// 윈도우 크기가 재조정 되면 window.scrollTo의 값이 달라지기 때문에
// 윈도우 크기가 재지정될 때 마다 스크롤 위치를 다시 지정해 줌.
$(window).on("resize", () => {
  let moveTop = sectionSec.eq(i).offset().top;
  window.scrollTo(0, moveTop);
});

// 제작 페이지 링크!
const myWorkImg = $(".myWorkImage");
myWorkImg.on("click", () => {
  window.open("http://kho9508@kho9508.dothome.co.kr/Heavenly/index.html");
});




const sec3ItemsUl = $('.section3-left>ul');
const sec3ItemsLi = $('.section3-left>ul>li');
const aboutUl = $('.section3-right>ul');
const aboutLi = $('.section3-right>ul>Li');
const uldefault = $('.default');

sec3ItemsUl.on('click',()=>{
  let _target =event.target;
  
  uldefault.css('opacity','0')

  sec3ItemsLi.each((idx,items)=>{
    if(items == _target){
      sec3ItemsLi.eq(idx).addClass('liShow')
      sec3ItemsLi.eq(idx).siblings().removeClass('liShow')
      aboutLi.eq(idx).addClass('ConShow');
      aboutLi.eq(idx).siblings().removeClass('ConShow');

    }
})

})



$('.imgBox>img').on('mouseover',()=>{
  $('.imgBoxDesc').css({"visibility":"visible","opacity":"1", 'transition':'all 0.5s'})
})


$('.imgBox>img').on('mouseout',()=>{
  $('.imgBoxDesc').css({"visibility":"hidden","opacity":"0"})
})
