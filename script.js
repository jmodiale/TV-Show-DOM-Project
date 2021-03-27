const episodeSearch = document.getElementsByClassName("season-names");
const episodeCard = document.getElementsByClassName("card");
//console.log(episodeCard)
// console.log(episodeSearch)
let inputSearch = document.createElement("INPUT");
inputSearch.setAttribute("type", "search");

let selector = document.createElement("select");
selector.setAttribute("name", "episodes")
selector.className = "selector";

let shows = document.createElement("select");
shows.setAttribute("name", "series")
shows.className = "shows";

let bod = document.getElementsByTagName("BODY")[0];
let main = document.createElement("div")
main.setAttribute("class", "main")
bod.appendChild(main)

let pages = document.createElement("div")
pages.setAttribute("class", "pages")
bod.appendChild(pages)

function setup() {
  getEpisodes()
  // const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  searchBar()
  filter()
  episodesList()
  episodeSelection()
  showsList()
  sortShows()
  selectShows()
  citation()
}

function getEpisodes(showId = 82){
  const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
    fetch(url)
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw `${response.status} ${response.statusText}`;
    })
    .then(function(data) {
      console.log(data)
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = "";

    // const pagination = document.getElementById("pagination");
    // pagination.innerText = `Showing ${data.length} episodes`

  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
 
  for(i=0; i<data.length; i++){
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class", "card");
    rootElem.append(newDiv)

    const {name, season, number, summary, image: {medium, original}} = data[i]
    let season_Names = document.createElement("h3")
    season_Names.setAttribute("class", "season-names")
    let episodeCode = `S${season.toString().padStart(2, "0")}E${number.toString().padStart(2, "0")}`
    let names = name
    season_Names.innerHTML = `${names} - ${episodeCode}`

    let sumTag = document.createElement("p")
    sumTag.setAttribute("class", "summary-text")
    let summaries = summary
    sumTag.innerHTML = summaries

    let imgTag = document.createElement("img")
    imgTag.setAttribute("class", "pictures")
    let images = medium
    imgTag.src = images

    newDiv.append(season_Names, imgTag, sumTag)
  }
  populate(data);
  });  
}

function selectShows(){
  let listOfShows = document.getElementsByClassName("shows")[0];
  listOfShows.addEventListener('change', (event) => {
  getEpisodes(parseInt(event.target.value));
  //const optionVal = listOfShows.options[listOfShows.selectedIndex].value;
  //return optionVal
});
}

//show id for each individual series in shows.js
//any show id
//event listener for selection - to fetch

// function showSelection(showId){
//   const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
//   fetch(url)
//   .then(response => response.json())
//   .then((data) => {
//     console.log(data)
//     // const ids = data.map(selection => selection.show.name);
//     // console.log(ids)
//     // let listOfShows = document.getElementsByClassName("shows")[0];
//     // listOfShows.addEventListener('click', () => {
//     // const optionVal = listOfShows.options[listOfShows.selectedIndex].value;
//     // console.log(optionVal)
//     // });
//   })
// }

//Filter through episodes in searchbar
function filter(){
  inputSearch.addEventListener('keyup', (event) => {
  const searchString = event.target.value;
  for(i=0; i<episodeCard.length; i++){
    episodeCard[i].textContent.toLowerCase().includes(searchString) ? episodeCard[i].style.display = "": episodeCard[i].style.display = "none"
  }
});
}

//Select an Episode or return to all episodes
function episodeSelection(){
  let select = document.getElementsByClassName("selector")[0];
    select.addEventListener('change', () => {
     const optionVal = select.options[select.selectedIndex].value;
     console.log(optionVal)
       for(i=0; i<episodeCard.length; i++){
         let epi = episodeCard[i]
         let other = "-Select an episode-"
         let showEverything = other===optionVal;
         let showSelected = epi.textContent.includes(optionVal) ;
         let isVisible = showSelected || showEverything
         epi.style.display = isVisible ? "" : "none"
        //isVisible ? epi.style.display = "" : epi.style.display = "none";
        }
   });
}

//Create a Search Bar
function searchBar(){
    let topdiv = document.createElement("div");
    topdiv.setAttribute("class", "topdiv");
    main.appendChild(topdiv)

    topdiv.appendChild(inputSearch)
    inputSearch.placeholder = "Search for an episode...";

    const rootElem = document.getElementById("root");
    bod.insertBefore(main, rootElem)
}

//Populate the select dropdown with options
// allepisodes = array of episodes objects
function episodesList(){
    let dropDiv = document.createElement("div");
    dropDiv.setAttribute("class", "dropDiv");
    main.appendChild(dropDiv)

    dropDiv.appendChild(selector)

    const rootElem = document.getElementById("root");
    bod.insertBefore(main, rootElem)
    // selector.innerHTML = "";
    // let selectOption = document.createElement("option");
    // selectOption.innerText = "-Select an episode-";
    // selector.appendChild(selectOption);
}

function populate(allEpisodes){
  //let opal = document.getElementsByClassName("selector")[0];
  selector.innerHTML = ""; // clears selet element
    let selectOption = document.createElement("option");
    selectOption.innerText = "-Select an episode-";
    selector.appendChild(selectOption);
  let options = allEpisodes;
    for(i=0; i<options.length; i++) {
      let item = document.createElement("option");
      let episodeNum= `S${options[i].season.toString().padStart(2, "0")}E${options[i].number.toString().padStart(2, "0")}`
      let optName = options[i].name
      item.innerHTML = `${episodeNum} - ${optName}`;
      item.value = options[i].name
      selector.appendChild(item)
    }
}

//Shows select
function showsList(){
    let showDiv = document.createElement("div");
    showDiv.setAttribute("class", "showDiv");
    main.appendChild(showDiv)

    showDiv.appendChild(shows)

    const rootElem = document.getElementById("root");
    bod.insertBefore(main, rootElem)

    let selOption = document.createElement("option");
    selOption.innerText = "-Select a Show-";
    shows.appendChild(selOption);

    let allShows = getAllShows();
    for(i=0; i<allShows.length; i++) {
      let items = document.createElement("option");
      items.innerHTML = allShows[i].name
      items.value = allShows[i].id
      shows.appendChild(items)
    }
}

function sortShows() {
    let options = document.getElementsByClassName("shows")[0];
    let optionArray = [];
    let selectedValue = options[options.selectedIndex].value;
    for (let i=0;i<options.options.length;i++) optionArray.push(options.options[i]);
    optionArray.sort(function(a,b){ return (a.text < b.text)?-1:1; });
    while (options.options.length > 0) options.options[0] = null;
    let newSelectedIndex = 0;
    for (let i=0;i<optionArray.length;i++) {
        options.options[i] = optionArray[i];
        if(options.options[i].value == selectedValue) newSelectedIndex = i;
    }
    options.selectedIndex = newSelectedIndex;
    return;
}

function citation(){
  let linkText = document.createElement("p")
  linkText.setAttribute("id", "citation")
  let link = "TVMaze.com"
  linkText.innerHTML= `The data on this page has (originally) come from ${link.link("https://www.tvmaze.com/")}`
  document.body.appendChild(linkText) 
}

window.onload = setup;
