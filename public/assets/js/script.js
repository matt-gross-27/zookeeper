const $animalForm = document.querySelector('#animal-form');

const postAnimal = function(animalObj) {
  fetch('/api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObj)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert(`Error: ${response.statusText}`);
    })
    .then(postResponse => {
      console.log(postResponse);
      alert(`Thanks for adding an animal!`);
    })
}

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

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
