## 순수 JS
link href="참조"  
script src="참조"  

## snippet
!  
link  
sc  
".countdown-container" => ```<div class="countdown-container">```    
"p.bin-text#hours" =>```<p class="big-text" id="hours"></p>  ```
ul>li*4>input+label  

## countdown timer
style.css에서    
```
* {
    box-sizing: border-box;
    margin:0; #이거해야 윗부분 틈사라지고 body를 꽉채울 수 있음
}
```
align content와 align items=> 한줄일때는 items

.countdown-el span으로 class 이름이  countdown-el mins-c 등등인 태크아래의 span을 건든다.
  
setInterval ms단위
  
## quiz App
```
  <li><input type="radio" id="a" name="answer"><label for="a"></label></li> 
  ``` 
  name이 같아야 한 덩어리로 인식이 된다.  

  min-height=100vh;를 해야 alig n-items:center가 먹힌다. height가 정해져있어야 한다.  
  
  let answer= undefined 해야 나중에 if (answer)를 할수 있다.  
  
  radio check 어디에 됐는지 확인하는 방법  
  ```
  if (document.getElementById("a").checked){
        answer_text="a";
  
  OR
  
  const answers = document.querySelectorAll("answer")
  answers.forEach((answer)=>{
    if answer.checked{
      answer=answer.id
    }))
  
  
  ```

## recipe-app
아이콘 집어넣기  fontawesome cdn에서 링크복사 후 집어넣기
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
후 <i class="far fa-heart"></i>로 사용
```
img 맞추기
object-fit: cover;

```
<li><img src="https://www.themealdb.com/images/ingredients/Beef.png" alt=""><span>meat</span></li>
```

에서 span은 display flex시 자동으로 밑으로 내려간다. `이미지 크기만 "적당하면"
```
async function getRandomMeal(){
    const randomMeal = await fetch("www.themealdb.com/api/json/v1/1/random.php");
}
```
(https:// 안쓰니까 안되더라)www.themealdb.com/api/json/v1/1/random.php

innerHTML에서 `가 물결표시임 따옴표가 아니라

## todo-app
form 이란 addEventLisenter "submit"으로 엔터시 가능

margin:auto란 이걸로 중앙정렬가능

input autocomplete off

small tag
## note-app
wrap 속성https://studiomeal.com/archives/197

class는 보통 꾸밀 때 https://velog.io/@hyemison/id-VS-class-%EB%AD%98-%EC%93%B8%EC%A7%80-%ED%97%B7%EA%B0%88%EB%A6%B0%EB%8B%A4%EB%A9%B4

queryselector, documentgetbyid by class 차이점과 역할 

```
editBtn.addEventListener("click",()=>{
        main.classList.toggle("hidden") //이해가 안됌
        textArea.classList.toggle("hidden")
    })
이것으로
<div class="main ${text ? "":"hidden"}">
<textarea class="${text ? "hidden":""}"></textarea>
를 toggle함

```
## movie-app
cors 정책위반 해결

transform:translateY(101%)
hover시에 transform:translateY(0)  and transition: transform 0.3s ease-in

## github-profile-app
https://api.github.com/users/gurum505에서 api사용가능
box shadow 익히기
font awesome 색입히기

## pw-generator
copy paste할려면 textarea를 경유해서 해야함
```
    textarea.value=password;
    document.body.appendChild(textarea)
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
```
팝업창 튀어나오듯 하는거
transform: translate(-50%,50%);
transition: opcacity 0.2s ease, transform 0.2 ease;
