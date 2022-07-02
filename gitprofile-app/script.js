const APIURL="https://api.github.com/users/"

const main= document.getElementById("main")
const form= document.getElementById("form")
const search= document.getElementById("search")

async function getUser(user){
    const resp = await fetch (APIURL+user)
    const respData=await resp.json()
    createUserCard(respData)
}

function createUserCard(user){

    const cardHTML=`
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
            </div>
            <div>
                <h2>${user.name ? user.name:"username"}</h2>
                <p>${user.bio ? user.bio:"userbio"}</p>

                <ul class="info">
                    <li><i class="fa-solid fa-eye"></i> ${user.followers ? user.followers:0}</li>
                    <li><i class="fa-solid fa-heart"></i> ${user.following ? user.following:0}</li>
                    <li><i class="fa-solid fa-flag"></i> ${user.public_repos ? user.public_repos:0}</li>
                </ul>
            </div>
        </div>
    `
    main.innerHTML=cardHTML;
    
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const user= search.value;
    if(user){
        getUser(user);
        search.value=""
    }
})