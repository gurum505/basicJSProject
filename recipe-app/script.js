const meals=document.getElementById("meals");
const favoriteContainer=document.getElementById("fav-meals");
const searchBtn=document.getElementById("search");
const searchTerm=document.getElementById("searchTerm");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal(){
    const resp = await (await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json();

    const randomMeal=resp.meals[0];
    addMeal(randomMeal,true)
}

function addMeal(mealData, random=false){
    const meal =document.createElement("div");
    meal.classList.add('meal');
    meal.innerHTML=`
    <div class="meal-header">
        ${random? `<span class="random">Recipe of a Day</span>` : ""}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn" >
            <i class="fas fa-heart"></i>
        </button>
    </div>`;

    const btn=meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener('click',()=>{
        if(btn.classList.contains("active")){
            removeMealLS(mealData.idMeal)
            btn.classList.remove("active")

        }else{
            addMealLS(mealData.idMeal)
            btn.classList.add("active")

        }
        fetchFavMeals();
    })

    meals.appendChild(meal)
}
function addMealtoFav(mealData){
    
    const favMeal =document.createElement("li");
    favMeal.innerHTML=`
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p><span >${mealData.strMeal}</span></p>
        <button class="clear" ><i class="fa-solid fa-ban"></i></button>
    `;

    
    const btn =favMeal.querySelector(".clear");
    btn.addEventListener('click',()=>{
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    })

    favoriteContainer.appendChild(favMeal)
}

function addMealLS(mealId){
    const mealIds=getMealsFromLS();
    localStorage.setItem("mealIds",JSON.stringify([...mealIds,mealId]))
}

function getMealsFromLS(){
    const mealIds= JSON.parse(localStorage.getItem("mealIds"))
    return mealIds === null ? [] : mealIds
}

function removeMealLS(mealId){
    const mealIds=getMealsFromLS();
    localStorage.setItem("mealIds",JSON.stringify(mealIds.filter(id=>id !== mealId)))
}

async function fetchFavMeals(){
    const mealIds=getMealsFromLS();
    favoriteContainer.innerHTML="";

    for(let i=0; i<mealIds.length;i++){
        const mealId=mealIds[i]
        meal = await getMealById(mealId)
        addMealtoFav(meal)
    }
}

async function getMealById(id){  
    const resp = (await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id))
    const respData=await resp.json();
    const meal=respData.meals[0];
    return meal
}

async function getMealsBySearch(term){  
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+term);
    const respData= await resp.json();
    const meals=respData.meals;

    return meals
}

searchBtn.addEventListener("click", async ()=>{
    meals.innerHTML="";
    const search = searchTerm.value;
    const meal_ls= await getMealsBySearch(search);
    
    if(meal_ls){
        meal_ls.forEach((meal)=>{
            addMeal(meal)
        })
    }
})