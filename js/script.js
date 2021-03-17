// constant variables - data that never changes
const BASE_URL =
 'http://ddragon.leagueoflegends.com/cdn/10.4.1/data/en_US/champion.json';

 const skinUrl = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

// state variables - data that changes
let championName;

// cached element references - parts of the dom we need to touch
let $champions = $('#champions');

// event listeners - capture and respond to events i.e user clicks on something

// functions
init();

function init() {
 getData();
}

function getData() {
 $.ajax(BASE_URL).then(
  function (data) {
   let championName = Object.entries(data.data);
   render(championName);
  },
  function (error) {
   console.log(error);
  },
 );
}

function render(championName) {
 const html = championName.map(function (champion) {
  return `
      <article class="card">
        <h1>${champion[0]}</h1>
      </article>
      `;
 });
 $champions.append(html);
}