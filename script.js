const episodeSearch = document.getElementsByClassName("season-names");
const episodeCard = document.getElementsByClassName("card")
console.log(episodeCard)
// console.log(episodeSearch)
let inputSearch = document.createElement("INPUT");
inputSearch.setAttribute("type", "search");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchBar()
  filter(makePageForEpisodes)
}

function filter(callback){
  inputSearch.addEventListener('keyup', (event) => {
  const searchString = event.target.value;
  for(i=0; i<episodeCard.length; i++){
    episodeCard[i].textContent.toLowerCase().includes(searchString) ? episodeCard[i].style.display = "": episodeCard[i].style.display = "none"
  }
});
return callback
}

function searchBar(){
    let bod = document.getElementsByTagName("BODY")[0];
    let topdiv = document.createElement("div");
    topdiv.setAttribute("class", "topdiv");
    bod.appendChild(topdiv)

    topdiv.appendChild(inputSearch)
    inputSearch.placeholder = "Search for an episode...";

    const rootElem = document.getElementById("root");
    bod.insertBefore(topdiv, rootElem)
}



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