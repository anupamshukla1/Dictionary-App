//api key
let apiKey = '28e7a8c9-13e3-42b2-8701-7627e1f960e0'

let input = document.querySelector('#input')
let searchBtn  = document.querySelector('#search')
let notFound = document.querySelector('.not__found')
let defBox = document.querySelector('.def')
let audioBox = document.querySelector('.audio')
let loading = document.querySelector('.loading')

searchBtn.addEventListener('click', function(event){
    event.preventDefault();


     // clearing the  data
     audioBox.innerHTML = '';
     notFound.innerText = '';
     defBox.innerText = '';
 

    // get Input Data
    let word = input.value

    //call api data
    if(word === ''){
        window.alert("Word is Required")
        return;
    }

    getData(word)

})

async function getData(word){
    loading.style.display = 'block'
    //ajax api calling
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

    const data = await response.json();

    console.log(data);

    //for entering input does not match
    if(!data.length){
        loading.style.display = 'none'
        notFound.innerText = 'No Result Found';
        return;
    }

    //if result is the non-english word and a suggestion

    if(typeof data[0] === 'string'){
        loading.style.display = 'none'
        let heading = document.createElement('h3')
        heading.innerText = 'Did You Mean ?'
        notFound.appendChild(heading)
        data.forEach(element => {
            let suggestion = document.createElement('span')
            suggestion.classList.add('suggested')
            suggestion.innerText = element
            notFound.appendChild(suggestion)
        });
        return;
    }


    //for Result Found
    loading.style.display = 'none'
    let definition = data[0].shortdef[0]
    defBox.innerText = definition

    //audio sound

    let soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName){
            renderSound(soundName)
        }
}

function renderSound(soundName){
     // https://media.merriam-webster.com/soundc11

     let subFolder = soundName.charAt(0);
     let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apiKey}`;

     let audio = document.createElement('audio')
     audio.src = soundSrc
     audio.controls = true;
     audioBox.appendChild(audio);
}



