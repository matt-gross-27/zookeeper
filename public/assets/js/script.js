// DOM elements
const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector('#zookeeper-form');


// ~~~~~ post requests ~~~~~ //
const postAnimal = animalObj => {
  fetch('/api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObj)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      alert(`Error: ${res.statusText}`);
    })
    .then(postResponse => {
      console.log(postResponse);
      if(postResponse) {
        alert(`Thanks for adding an animal!`);
      }
    })
};

const postZookeeper = zookeeperObj => {
  fetch('/api/zookeepers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(zookeeperObj)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      alert(`Error: ${res.statusText}`)
    })
    .then(postResponse => {
      console.log(postResponse);
      if(postResponse) {
        alert(`Thanks for adding a zookeeper!`);
      }
    });
};


// ~~~~~ event handlers ~~~~~ //
const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };
  postAnimal(animalObject);
};

const handleZookeeperFormSubmit = event => {
  event.preventDefault();

  //get new zookeeper data and organize it
  const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value;
  const age = parseInt($zookeeperForm.querySelector('[name="age"]').value);
  const favoriteAnimal = $zookeeperForm.querySelector('[name="favorite-animal"]').value;

  const zookeeperObject = { name, age, favoriteAnimal };
  postZookeeper(zookeeperObject);
};


// ~~~~~ event listeners ~~~~~ //
$animalForm.addEventListener('submit', handleAnimalFormSubmit);
$zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit);
