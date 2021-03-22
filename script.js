const episodeSearch = document.getElementsByClassName("season-names");
const episodeCard = document.getElementsByClassName("card");
//console.log(episodeCard)
// console.log(episodeSearch)
let inputSearch = document.createElement("INPUT");
inputSearch.setAttribute("type", "search");

let selector = document.createElement("select");
selector.setAttribute("name", "episodes")
selector.className = "selector";

let bod = document.getElementsByTagName("BODY")[0];
let main = document.createElement("div")
main.setAttribute("class", "main")
bod.appendChild(main)

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchBar()
  filter()
  dropdown()
  selection()
}

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
function selection(){
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
function dropdown(){
    let dropDiv = document.createElement("div");
    dropDiv.setAttribute("class", "dropDiv");
    main.appendChild(dropDiv)

    dropDiv.appendChild(selector)

    const rootElem = document.getElementById("root");
    bod.insertBefore(main, rootElem)

    let selectOption = document.createElement("option");
    selectOption.innerText = "-Select an episode-";
    selector.appendChild(selectOption);

    let options = getAllEpisodes();
    for(i=0; i<options.length; i++) {
      let item = document.createElement("option");
      let episodeNum= `S${options[i].season.toString().padStart(2, "0")}E${options[i].number.toString().padStart(2, "0")}`
      let optName = options[i].name
      item.innerHTML = `${episodeNum} - ${optName}`;
      item.value = options[i].name
      selector.appendChild(item)
    }
}

//Display All Episodes on Page
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  let linkText = document.createElement("p")
  linkText.setAttribute("id", "citation")
  let link = "TVMaze.com"
  linkText.innerHTML= `The data on this page has (originally) come from ${link.link("https://www.tvmaze.com/")}`
  document.body.appendChild(linkText)

  for(i=0; i<episodeList.length; i++){
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class", "card");
    rootElem.append(newDiv)

    const {name, season, number, summary, image: {medium, original}} = episodeList[i]
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
}

window.onload = setup;