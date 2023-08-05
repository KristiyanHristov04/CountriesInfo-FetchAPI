function myFunction() {
    const input = document.getElementById('countrySearch');
    const result = document.getElementById('result');
    let image = document.getElementById('image');
    image.removeAttribute('src');
    image.style.display = 'none';
    fetch(`https://restcountries.com/v3.1/name/${input.value}`)
        .then(response => {
            if (!response.ok) {
                result.textContent = `We've encountered a problem!`;
                result.innerHTML += `<br>Error: ${response.status} (Not Found)`;
            }
            return response.json();
        })
        .then(data => {
            console.log(data[0]);
            let countryName = data[0].name.common;
            let countryNameOfficial = data[0].name.official;
            let capitalName = data[0].capital;
            let continentName = data[0].region;
            let population = data[0].population.toLocaleString('en-US');
            let spokenLanguages = Object.values(data[0].languages);
            let infoAboutCurrency = Object.values(data[0].currencies)
            let infoAboutCurrency2 = Object.entries(infoAboutCurrency[0]);
            let currencyName = infoAboutCurrency2[0][1];
            let currencySymbol = infoAboutCurrency2[1][1];
            let countryFlagURL = data[0].flags.png;
            result.innerHTML = `Country: ${countryName}(${countryNameOfficial})<br>Capital: ${capitalName}<br>Continent: ${continentName}<br>Population: ${population}<br>Official Languages: ${spokenLanguages.join(', ')}<br>Currency: ${currencyName} '${currencySymbol}'`;
            image.setAttribute('src', `${countryFlagURL}`);
            image.style.display = 'inline';
            result.innerHTML += `<br><a target="_blank" href="https://www.google.com/maps/place/${countryName}">open google maps</a>`
        })
        .catch(error => {
            console.log('CATCH: Error fetching data:', error);
        });
    input.value = '';
}