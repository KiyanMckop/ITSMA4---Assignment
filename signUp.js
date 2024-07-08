import { signInWithEmailPassword } from "../src/index.js";

// Function to handle sign up
document.getElementById("signUpButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value

    if (password == confirmPassword){
        // Sign up with email and password
        try {
            signInWithEmailPassword(email, password);
        } catch (error) {
            console.log(error.message);
        }
    }else{
        console.log("passwords do not match")
    }
});