(function () {

    // Report Object
    function Report({id, date, location, description}) {
        this.id =  id,
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
            // let showButtons = document.querySelectorAll('.show-description');
            // console.log(showButtons);

            // Listening for click event for all the show buttons
            let showButtons = document.querySelectorAll('.show-description');
            console.log(showButtons);
            showButtons.forEach((showButton) => {
                showButton.addEventListener('click', e => {
                    console.log(e.target.dataset.id);
                    let paragraph = document.querySelector(`.${e.target.dataset.id}`);
                    console.log(paragraph);
                    paragraph.style.display = "block";
                });
            });
            
        } else {
            alert('Please fill all the fields to proceed !');
        }
    });
    // Clears values from form fields
    function clearFormFields () {
        dateInput.value = '';
        locationInput.value = '';
        descriptionInput.value = '';
    };
}())