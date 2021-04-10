//Global Variables
const episodeSearch = document.getElementsByClassName("season-names");
const episodeCard = document.getElementsByClassName("card");
const showCard = document.getElementsByClassName("show-card")
const rootElem = document.getElementById("root");

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


let showId;
let episode;

//Setup Function
function setup() {
  searchBar()
  searchFilter()
  showsList()
  showSelection()
  getShows()
  citation()
}

//Populates the page with the shows
function getShows(){
  const rootElem = document.getElementById("root");

  let shows = getAllShows();
  let allShows = shows.sort(function compare(a, b) {
    if (a.name.toUpperCase() < b.name.toLocaleUpperCase()) { return -1 }
    if (a.name.toUpperCase() > b.name.toUpperCase()) { return 1 }
    return 0;
  })

  for(i=0; i<allShows.length; i++){
    let mainDiv = document.createElement("div")
    mainDiv.setAttribute("class", "show-card")

    let title = `${allShows[i].name} `
    let h2 = document.createElement("h2")
    h2.setAttribute("id", allShows[i].id)
    h2.addEventListener("click", presentEpisodes)
    h2.innerHTML = title

    let page = `${allShows[i].summary}`
    let p = document.createElement("p")
    p.setAttribute("id", "show-text")
    p.innerHTML = page

    let status = `Genre: ${allShows[i].genres} Status: ${allShows[i].status}`
    let h4 = document.createElement("h4")
    h4.setAttribute("class", "status")
    h4.innerHTML = status

    let headers = `Rating: ${allShows[i].rating.average} Runtime: ${allShows[i].runtime}`
    let h5 = document.createElement("h5")
    h5.setAttribute("class", "headers")
    h5.innerHTML = headers

    let image = document.createElement("img")
    image.setAttribute("class", "show-images")
    let img = allShows[i].image.medium
    image.src = img

    rootElem.appendChild(mainDiv)
    mainDiv.append(h2, image, p, h4, h5)
  }
}

//Fetch and Print all episodes to webpage (default parameter)
function getEpisodes(showId){
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
  })
  .catch(function(error){
    console.log(error)
  });
}

//Present the episodes on page
function presentEpisodes(event) {
  const rootElem = document.getElementById("root");
  //rootElem.innerHTML = "";
  showId = parseInt(event.target.id);
  getEpisodes(showId)
}


//Select show based on the unique id (ref = showId)
function showSelection(){
  let listOfShows = document.getElementsByClassName("shows")[0];
  listOfShows.addEventListener('change', (event) => {
  getEpisodes(parseInt(event.target.value));
  });
}

//Filter through shows/episodes in searchbar
function searchFilter(){
  inputSearch.addEventListener('keyup', (event) => {
  const searchString = event.target.value;
    for(i=0; i<episodeCard.length; i++){
      episodeCard[i].textContent.toLowerCase().includes(searchString) ? episodeCard[i].style.display = "": episodeCard[i].style.display = "none"
    }
    for(i=0; i<showCard.length; i++){
      showCard[i].textContent.toLowerCase().includes(searchString) ? showCard[i].style.display = "": showCard[i].style.display = "none"
    }
  });
}

//Select an Episode or return to all episodes
function episodeSelection(){
  let select = document.getElementsByClassName("selector")[0];
  select.addEventListener('change', (event) => {
    const optionVal = event.target.value //OR select.options[select.selectedIndex].value;
    console.log(optionVal)
    for(i=0; i<episodeCard.length; i++){
      let epi = episodeCard[i]
      let other = "-Select an episode-"
      let showEverything = other===optionVal;
      let showSelected = epi.textContent.includes(optionVal) ;
      let isVisible = showSelected || showEverything
      epi.style.display = isVisible ? "" : "none"
    }
  });
}

//Create div for the Search Bar and placeholder
function searchBar(){
  let topdiv = document.createElement("div");
  topdiv.setAttribute("class", "topdiv");
  main.appendChild(topdiv)

  topdiv.appendChild(inputSearch)
  inputSearch.placeholder = "Search...";

  const rootElem = document.getElementById("root");
  bod.insertBefore(main, rootElem)
}

//Create div for episodes dropdown
function episodesList(){
  let checkDiv = document.getElementsByClassName("dropDiv")
  if(checkDiv.length > 0){
    return 
  }
  let dropDiv = document.createElement("div");
  dropDiv.setAttribute("class", "dropDiv");
  main.appendChild(dropDiv)

  dropDiv.appendChild(selector)
  const rootElem = document.getElementById("root");
  bod.insertBefore(main, rootElem)
}

//Populate episodes select dropdown with the selected show episodes
function populate(allEpisodes){ // allepisodes = array of episodes objects (JSON data - fetched from url)
  selector.innerHTML = ""; // clears the select element
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
  goBack()
  episodesList()
  episodeSelection()
  document.getElementsByClassName("showDiv").style.visibility = "hidden"
}

//Create the Shows Select Dropdown & Sort
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
  let sortShows = allShows.sort(function compare(a, b) {
    if (a.name.toUpperCase() < b.name.toLocaleUpperCase()) { 
      return -1 }
    if (a.name.toUpperCase() > b.name.toUpperCase()) { 
      return 1 }
      return 0;
  })
  for(i=0; i<sortShows.length; i++) {
    let items = document.createElement("option");
    items.innerHTML = sortShows[i].name
    items.value = sortShows[i].id
    shows.appendChild(items)
  }
}

//Citation text on page referencing source
function citation(){
  let linkText = document.createElement("p")
  linkText.setAttribute("id", "citation")
  let link = "TVMaze.com"
  linkText.innerHTML= `The data on this page has (originally) come from ${link.link("https://www.tvmaze.com/")}`
  document.body.appendChild(linkText) 
}

//Creates the back button to go back to the shows page
function goBack() {
  let backButton = document.getElementsByClassName("back-btn")
  if(backButton.length > 0){
    return 
  }
  let showButton = document.createElement("div");
  showButton.setAttribute("class","back-btn");

  let button = document.createElement("button");
  button.innerHTML = "&laquo; Shows Listing";
  button.setAttribute("type", "button")
  button.setAttribute("class", "btn")

  showButton.appendChild(button)
  main.appendChild(showButton)
  button.addEventListener("click", () => {
    rootElem.innerHTML = ""
    getShows()
  })
}

window.onload = setup;



