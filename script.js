const apiKey = 'SUA_CHAVE_API'

async function Coordenadas(cidade, limit = 1) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=${limit}&appid=${apiKey}`;

    try { 
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }
        const dados_coordenadas = await resposta.json();
        console.log(dados_coordenadas);
        return dados_coordenadas[0]; // Retorna o primeiro resultado
    } catch (erro) {
        console.error('Erro', erro);
        return null;
    }
}

async function buscarClima(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }
        const dados_clima = await resposta.json();
        console.log(dados_clima);
        return dados_clima;
    } catch(erro) {
        console.error('Erro', erro);
        return null;
    }
}



document.getElementById('clima').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const cidade = document.getElementById('cidade').value;

    if (apiKey !="SUA_CHAVE_API") {
        if (cidade) {
            const coordenadas = await Coordenadas(cidade);
            if (coordenadas) {
                const clima = await buscarClima(coordenadas.lat, coordenadas.lon);
                if (clima) {
                    document.getElementById('resultado').innerText = `
                        Clima em ${clima.name}:
                        Temperatura: ${clima.main.temp}°C
                        Condições: ${clima.weather[0].description}
                    `;
                } else {
                    document.getElementById('resultado').innerText = 'Não foi possível obter os dados climáticos.';
                }
            } else {
                document.getElementById('resultado').innerText = 'Não foi possível encontrar a cidade.';
            }
        } else {
            document.getElementById('resultado').innerText = 'Por favor, insira o nome de uma cidade.';
        } 
    } else {
        document.getElementById('resultado').innerText = 'Por favor, utilize a sua chave API do Open Weather Map';
    }
});


// Função para definir a imagem de plano de fundo pelo horário

function changeBackgroundBasedOnTime() {
    const now = new Date();
    const hours = now.getHours();

    let backgroundImage;

    if (hours >= 6 && hours < 9) {
        backgroundImage = 'url("/img/nascer.jpg")'; // nascer do sol
    } else if (hours >= 9 && hours < 17) {
        backgroundImage = 'url("/img/manha_tarde.jpg")'; // dia/tarde
    } else if (hours >= 17 && hours < 18) {
        backgroundImage = 'url("/img/pordosol.jpg")'; // por do sol
    } else {
        backgroundImage = 'url("/img/noite_madrugada.jpg")'; // noite/madrugada
    }

    document.body.style.backgroundImage = backgroundImage;
}

changeBackgroundBasedOnTime();