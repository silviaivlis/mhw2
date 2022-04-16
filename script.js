/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const checked = 'images/checked.png';
const unchecked ='images/unchecked.png';
const scores = { blep: 0, burger: 0, cart: 0,dopey: 0, happy: 0, nerd: 0,shy: 0, sleeping: 0, sleepy: 0};

function onClick(event)
{
  const box = event.currentTarget;
  const container = box.parentElement;
  const vector = container.querySelectorAll('div');

  for(const items of vector){
    items.classList.remove('selezionato');
    items.classList.add('scartato');
    const image = items.querySelector('.checkbox');
    image.src = unchecked;
  }

  box.classList.remove('scartato');
  box.classList.add('selezionato');
  const image = box.querySelector('.checkbox');
  image.src = checked;


  const selezionati = document.querySelectorAll('.selezionato');
  const boxes = document.querySelectorAll('.choice-grid div');
  const risultato = document.querySelector('#risultato');
  const titolo = risultato.querySelector('h1');
  const testo = risultato.querySelector('p');
  let flag = false;

  if(selezionati.length == 3){
    for (const box of boxes)
    {
      box.removeEventListener('click', onClick);
    }

    for(const selezionato of selezionati){
      const choiceid = selezionato.dataset.choiceId;
      const questionid = selezionato.dataset.questionId;

      if(questionid == 'one'){
        var primarisposta = choiceid;
      }
      scores[choiceid]=scores[choiceid]+1;
    }

    for (const property in scores) {
      if(scores[property]>=2){
        titolo.textContent = RESULTS_MAP[property].title;
        testo.textContent = RESULTS_MAP[property].contents;
        flag = true;
        break;
      }
    }

    if(flag === false){
      titolo.textContent = RESULTS_MAP[primarisposta].title;
      testo.textContent = RESULTS_MAP[primarisposta].contents;
    }

    risultato.classList.remove('hidden');
  }
}

function refresh(){
  const boxes = document.querySelectorAll('.choice-grid div');
  const risultato = document.querySelector('#risultato');

  for(const box of boxes){
    box.classList.remove('selezionato');
    box.classList.remove('scartato');
    const image = box.querySelector('.checkbox');
    image.src = unchecked;
    box.addEventListener('click', onClick);
  }

  risultato.classList.add('hidden');

  for (const property in scores) {
    scores[property] = 0;
  }

  scrollTo(0,0);
}

const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes)
{
  box.addEventListener('click', onClick);
}

const button = document.querySelector('a');
button.addEventListener('click', refresh);