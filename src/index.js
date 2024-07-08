// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, push, onValue  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRc0m1Yb2FGQm1fr-7SOTBByH5aMDwEtw",
  authDomain: "nutritionapp-13b5a.firebaseapp.com",
  databaseURL: "https://nutritionapp-13b5a-default-rtdb.firebaseio.com",
  projectId: "nutritionapp-13b5a",
  storageBucket: "nutritionapp-13b5a.appspot.com",
  messagingSenderId: "509688869855",
  appId: "1:509688869855:web:78d8d1e70cd0487d9d8a6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);


//Authentication
export function signInWithEmailPassword(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = 'home.html'
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export function LoginWithEmailPassword(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in:', user);
      window.location = 'home.html'
    })
    .catch((error) => {
      console.log('Error during sign-in:', error.message);
    });
};


//reading and writing data
export function addNutritionInfo(foodInfo) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.uid)
      const currentDate = new Date().toDateString();
      const dbRef = ref(database, 'users/' + user.uid + '/' + currentDate);
      const foodIntakeRef = push(dbRef);
      set(foodIntakeRef, foodInfo);
    } else {
      console.log("no user logged in (redirect to signUP)")
    }
  });
}

export function getAllItems() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = ref(database, 'users/' + userId);

        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const itemsArray = [];
            for (let key in data) {
              itemsArray.push({ id: key, ...data[key] });
            }
            resolve(itemsArray);
          } else {
            resolve([]); // Resolve with an empty array if no data
          }
        }, (error) => {
          console.error("Error fetching data:", error);
          reject(error);
        });
      } else {
        console.log("No user logged in (redirect to signUp)");
        reject(new Error("No user logged in"));
      }
    });
  });
}