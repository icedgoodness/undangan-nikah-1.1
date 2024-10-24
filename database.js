// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXEhlWA50PzKfag0fBbIMxddugX3rnJ0I",
  authDomain: "list-undangan-ais2.firebaseapp.com",
  projectId: "list-undangan-ais2",
  storageBucket: "list-undangan-ais2.appspot.com",
  messagingSenderId: "803933770984",
  appId: "1:803933770984:web:fd468be1d909f96ef2255d",
  measurementId: "G-N6BTYXXGP9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to display messages from Firestore
async function displayMessages() {
  const messageList = document.getElementById("message-list");
  messageList.innerHTML = ""; // Clear the existing messages

  const q = query(collection(db, "messages"), orderBy("timestamp"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const newListItem = document.createElement("li");
    newListItem.classList.add("message-item");
    const nameDiv = document.createElement("div");
    nameDiv.textContent = data.name;
    const messageDiv = document.createElement("div");
    messageDiv.textContent = data.message;
    newListItem.appendChild(nameDiv);
    newListItem.appendChild(messageDiv);
    // Insert new list item at the top of the list
    messageList.insertBefore(newListItem, messageList.firstChild);
  });
}

// Initial fetch to populate message list
document.addEventListener("DOMContentLoaded", displayMessages);

// Event listener for form submission
document
  .getElementById("message-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.querySelector('input[name="name"]').value;
    const kehadiran = document.querySelector('select[name="kehadiran"]').value;
    const jumlahTamu = document.querySelector('input[name="jumlahTamu"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Add data to Firestore
    try {
      await addDoc(collection(db, "messages"), {
        name: name,
        kehadiran: kehadiran,
        jumlahTamu: jumlahTamu,
        message: message,
        timestamp: new Date(),
      });
      console.log("Document successfully written!");
      // Clear the table and display the updated messages
      displayMessages();
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    // Clear the form
    event.target.reset();
  });
