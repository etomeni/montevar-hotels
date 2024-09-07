window.addEventListener("DOMContentLoaded", function() {
    const checkIn = document.getElementById("checkIn");
    checkIn.setAttribute("min", getCurrentDate());

    const checkOut = document.getElementById("checkOut");
    checkOut.setAttribute("min", getCurrentDate());
});
  
function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    // getMonth() returns 0-11, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getCurrentDateTime() {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const now = new Date();
    return now.toLocaleString('en-US', options);
}
  
function handleCheckInDate(value) {
    if (value) {
        const checkOut = document.getElementById("checkOut");
        checkOut.setAttribute("min", value);
    }

    return true;
}
  
function validateInput(inputField) {
    // console.log(inputField);
    const id = inputField.getAttribute('id');
    const ariaLabel = inputField.getAttribute('aria-label');
    const inputValue = inputField.value;
  
    const element = document.getElementById(id);
    // Add your validation logic here
    if (!inputValue) {
        document.getElementById(ariaLabel).innerText = "Please enter a value.";
        // document.getElementById(ariaLabel).className = "errorText";

        element.classList.add("errorInput");

        // errorText
        return false;
    } else {
        document.getElementById(ariaLabel).innerText = "";

        // const element = document.getElementById(id);
        element.classList.remove("errorInput");
    }
  
    // Other validation checks
  
    return true;
}



function submitForm(form) {
    const formData = new FormData(form);
    const formDataObject = {};
    for (let [key, value] of formData.entries()) formDataObject[key] = value;

    const data2backend = {
        ...formDataObject,

        bookingDate: getCurrentDateTime(),
        year: new Date().getFullYear(),
        hotelName: "Montevar Hotels",
        hotelPhoneNumber: "0706 099 6380",
        hotelEmail: "montevarhotelsuites@gmail.com",
    };

    console.log(data2backend);

    // Your validation logic here
    // ...
    
    // Assuming validation passes, log the form data

    const endPointUrl = "http://localhost:3000";
    const apiUrl = `${endPointUrl}/api/v1/sendNewBookingMail`;

    fetch(apiUrl, {
        method: 'POST',
        body: data2backend
    })
    .then(response => {
        if (!response.ok) {
            const errorMsg = document.getElementById("errorMsg");
            errorMsg.style.display = "block";
            errorMsg.innerText = "Network response was not ok.";
        };
        return response.json();
    })
    .then(data => {
        // Handle successful response
        console.log('API response:', data);




        // const successMsg = document.getElementById("successMsg");
        // successMsg.style.display = "block";
        // successMsg.innerText = "Network response was not ok.";
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);

        // const errorMsg = document.getElementById("errorMsg");
        // errorMsg.style.display = "block";
        // errorMsg.innerText = "Network response was not ok.";
    });

    return false;
}

function sendData2backend(data2backend) {
    const endPointUrl = "http://localhost:3000";
    const apiUrl = `${endPointUrl}/api/v1/sendNewBookingMail`;

    fetch(apiUrl, {
        method: 'POST',
        body: data2backend
    })
    .then(response => {
        if (!response.ok) {
            const errorMsg = document.getElementById("errorMsg");
            errorMsg.style.display = "block";
            errorMsg.innerText = "Network response was not ok.";
        };
        return response.json();
    })
    .then(data => {
        // Handle successful response
        console.log('API response:', data);




        // const successMsg = document.getElementById("successMsg");
        // successMsg.style.display = "block";
        // successMsg.innerText = "Network response was not ok.";
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);

        // const errorMsg = document.getElementById("errorMsg");
        // errorMsg.style.display = "block";
        // errorMsg.innerText = "Network response was not ok.";
    });
}

function saveDataToSession(key, value, expirationTime) {
    const data = {
        value: value,
        expiration: new Date().getTime() + expirationTime
    };
    sessionStorage.setItem(key, JSON.stringify(data));

    setTimeout(() => {
        sessionStorage.removeItem(key);
        console.log(`Data with key "${key}" has been removed from session storage.`);
    }, expirationTime);
}

// Usage
// Save 'userToken' to session storage for 5 minutes (300,000 milliseconds)
saveDataToSession('userToken', 'abcd1234', 300000);

// Retrieve data from session storage
function getDataFromSession(key) {
    const data = JSON.parse(sessionStorage.getItem(key));
    if (data !== null) {
        const now = new Date().getTime();
        if (now < data.expiration) {
            return data.value;
        } else {
            sessionStorage.removeItem(key);
            console.log(`Data with key "${key}" has expired and was removed.`);
        }
    }
    return null;
}

// Example: Retrieve 'userToken' from session storage
const token = getDataFromSession('userToken');
if (token) {
    console.log(`Retrieved token: ${token}`);
} else {
    console.log('No valid token found in session storage.');
}
