 // constant variables - data that never changes
const BASE_URL =
'http://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion.json';

const SKIN_URL = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';


// state variables - data that changes
let championName;

// cached element references - parts of the dom we need to touch
let $champions = $('#champions');

// event listeners - capture and respond to events i.e user clicks on something
$champions.on("click", ".card", handleShowModal);

// functions
init();

function init() {
getData();
}


function handleShowModal(event) {
  // console.log(this.dataset.championName)

  let selectedChampion = this.dataset.championName
  console.log(event.target.tagName)
//   console.log( championName[1][0])
  const selectedChampionName = championName.find(function(champion) { 
  return champion[1].name === selectedChampion;
});

console.log(selectedChampionName)

$("#title").text(selectedChampionName[1].title);
$("#tags").text(selectedChampionName[1].tags);
$("#blurb").text(selectedChampionName[1].blurb);
$("#skin").attr({
  src:`${SKIN_URL}${selectedChampion}_1.jpg`,
  alt: "skin"
})
if($(event.target).is("img")) {
  $('.modal').modal();
} else {
  return;
}}


function getData() {
$.ajax(BASE_URL).then(
 function (data) {
  championName = Object.entries(data.data);
  console.log(championName)
  render();
 },
 function (error) {
  console.log(error);
 },
);
}



function render() {
const html = championName.map(function (champion) {
 return `
     <article data-champion-name="${champion[0]}" class="card">
   <h1>${champion[0]}</h1>
   <img class="img" src=${SKIN_URL}${champion[0]}_0.jpg alt="skin">
     </article>
     `;
});
$champions.append(html);
}