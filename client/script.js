async function generateImage() {
    let textInput = document.getElementById('textInput').value;
    let generatedImage = document.getElementById('generatedImage');
    let generatingBar = document.getElementById('generatingBar');
    let generatingText = document.getElementById('generatingText');
    let generateBtn = document.getElementById('generateBtn');

    if(textInput != '') {
        addGeneratingClasses();

        let response = await requestOpenAI(textInput);
        
        if(response.error) {
            alert('Erro ao gerar imagem.');

            return;
        }
        else {
            generatedImage.src = response.data[0].url;
            generatedImage.style.display = 'block';
        }

        removeGeneratingClasses();
    } 
    else {
        alert('You must enter a prompt!');

        return;
    }
}

async function requestOpenAI(input) {
    console.log('> Gerando . . .');
    console.log(input);

    let response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer [YOUR_API_KEY]'
        },
        body: JSON.stringify({
            prompt: input,
            n: 1,
            size: '512x512'
        })
    });

    let openAIResponse = await response.json();
    console.log(openAIResponse.data);

    return openAIResponse;
}

function addGeneratingClasses() {
    generatingBar.classList.add('generating-bar-full');
    generatingText.classList.remove('d-none');
    generateBtn.setAttribute('disabled', true);
    generateBtn.classList.add('btn-primary');
}

function removeGeneratingClasses() {
    generatingBar.classList.remove('generating-bar-full');
    generatingText.classList.add('d-none');
    generateBtn.removeAttribute('disabled');
    document.getElementById('textInput').value = "";
}