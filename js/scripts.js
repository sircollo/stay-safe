(async function () {
    // Function to get user current position
    function getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    let { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                });
            } else {
                reject();;
            }
        });

    }
    let coordinates = await getLocation();
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2lyd2FuaSIsImEiOiJjbDEzeGw2eHMwNTdrM2JxenU4bzh3bHk2In0.Jyxj6qQnW1Jtq3srl_w9Gw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [coordinates.longitude, coordinates.latitude], // starting position [lng, lat]
        zoom: 16 // starting zoom
    });
    new mapboxgl.Marker({ color: 'red' })
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .addTo(map);

    // pk.eyJ1Ijoic2lyd2FuaSIsImEiOiJjbDEzeGw2eHMwNTdrM2JxenU4bzh3bHk2In0.Jyxj6qQnW1Jtq3srl_w9Gw
    // Report Object
    function Report({ id, date, location, description }) {
        this.id = id,
            this.date = date;
        this.location = location;
        this.description = description;
    };

    // Form Input Values
    let date = '', location = '', description = '', reports = []

    // Safety form
    let safetyForm = document.getElementById('safety-form');
    // Form Fields
    let dateInput = document.querySelector('#date');
    let locationInput = document.querySelector('.location');
    let descriptionInput = document.querySelector('.description');

    // Accessing values from the input fields
    dateInput.addEventListener('change', e => {
        date = e.target.value;
    });
    locationInput.addEventListener('change', e => {
        location = e.target.value;
    });
    descriptionInput.addEventListener('change', e => {
        description = e.target.value;
    });

    // Listening for submit event on the safety form
    safetyForm.addEventListener('submit', e => {

        e.preventDefault();

        // Form Validation to ensure all input fields have been filled
        if (date !== '' && location !== '' && description !== '') {
            let obj = {
                id: reports.length + 1,
                date,
                location,
                description
            };
            let reportsContainer = document.getElementById("reports-container");
            let report = new Report(obj);
            let reportTemplate = `<div class="panel-header" rel="lang-head">
                  <h2>#${report.id} - ${report.location}</h2>
                  <button class="show-description" data-id="description-${report.id}" type="button">Show</button>
              </div>
              <div class="panel description-${report.id}" id="lang-report" >
              <p>${report.description}</p>
              </div>`;
            reportsContainer.innerHTML += reportTemplate;
            reports.push(report);
            clearFormFields();

            // Listening for click event for all the show buttons
            let showButtons = document.querySelectorAll('.show-description');
            showButtons.forEach((showButton) => {
                showButton.addEventListener('click', e => {
                    let paragraph = document.querySelector(`.${e.target.dataset.id}`);
                    if (showButton.innerHTML === "Show") {
                        showButton.innerHTML = "Hide";
                        paragraph.style.display = "block";
                    } else {
                        showButton.innerHTML = "Show";
                        paragraph.style.display = "none";
                    }
                });
            });
        } else {
            alert('Please fill all the fields to proceed !');
        }
    });
    // Clears values from form fields
    function clearFormFields() {
        dateInput.value = '';
        locationInput.value = '';
        descriptionInput.value = '';
    };
}())