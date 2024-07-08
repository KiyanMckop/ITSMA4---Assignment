import { LoginWithEmailPassword } from "../src/index.js";


// Function to handle sign up
document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Sign up with email and password
    try {
        LoginWithEmailPassword(email, password);
    } catch (error) {
        console.log(error.message);
    }

});