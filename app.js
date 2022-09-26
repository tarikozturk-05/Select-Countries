const select = document.getElementById("select")
const fetchCountryByAllName =() => {
  const url = "https://restcountries.com/v3.1/all";
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderNames(data))
    .catch((err) => console.log(err));
};

let isError = false;
const renderNames = (data)=> {
 
  if(isError) {
    
    document.querySelector("body") += `
      <h2 class="text-center">Countries Can not be fetched</h2>
        <img class="text-center w-50 mx-auto"src="https://thumbs.dreamstime.com/b/error-concept-white-background-sign-logo-icon-error-concept-simple-vector-icon-123196424.jpg" alt="" />
    `;
    return;
  }
  let names = data.map((data) => data.name.common).sort();
  names.forEach((item)=> { 
    select.innerHTML += `
    <option value="${item}">${item}</option>
    `;
  })
}

select.addEventListener("change",(e)=> {
  fetchCountryByName(e.target.value)
})

const fetchCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML = `
    <h2 class="text-center">Countries can not fetched</h2>
    <img class="text-center w-50 mx-auto" src="https://thumbs.dreamstime.com/b/error-concept-white-background-sign-logo-icon-error-concept-simple-vector-icon-123196424.jpg" alt="" />
  `;
};

const renderCountries = (data) => {
  const countryDiv = document.querySelector(".countries");
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
    maps:{googleMaps}
  } = data[0];

  countryDiv.innerHTML = `
    <div class="card mx-auto m-3 shadow-lg" style="width: 18rem;">
      <img src="${svg}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${common}</h5>
        <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <i class="fas fa-lg fa-landmark"></i> ${capital}
        </li>
        <li class="list-group-item">
          <i class="fas fa-lg fa-comments"></i> ${Object.values(languages)}
        </li>
        <li class="list-group-item">
          <i class="fas fa-lg fa-money-bill-wave"></i>
          ${Object.values(currencies).map((item) => Object.values(item) + " ")}
       </li>
      </ul>
 <div class="card-body text-center">
        <a href="${googleMaps}" target="_blank" class="card-link btn btn-secondary">Google Maps</a>
        
      </div>
    </div>

  `;
};

fetchCountryByName("norway");
fetchCountryByAllName()