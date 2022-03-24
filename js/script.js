(function () {

    // Report Object
    function Report({date, location, description}) {
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
                date,
                location,
                description
            };
            let reportsContainer = document.getElementById("reports-container");
            let report = new Report(obj);
            let reportTemplate = `<div class="panel-header" rel="lang-head">
                <h2>${report.location}</h2>
                <button type="button">Show</button>
                
            </div>
            <div class="panel" id="lang-report" >
                <p>${report.description}</p>
            </div>`; 
            reportsContainer.innerHTML += reportTemplate;
            reports.push(report);
            clearFormFields();
            
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