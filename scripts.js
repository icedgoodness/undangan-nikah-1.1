document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const openButton = document.getElementById("open-button");
  const coverPage = document.querySelector(".cover-page");
  const hiddenContent = document.querySelector(".hidden-content");
  const backgroundMusic = document.getElementById("background-music");

  // Ensure content is loaded before hiding preloader
  window.addEventListener("load", function () {
    preloader.style.display = "none";
    coverPage.style.display = "flex"; // Ensure cover page is displayed initially
    hiddenContent.style.display = "flex"; // Preload hidden content to prevent delay
    hiddenContent.style.visibility = "collapse"; // Hide content until coverPage is hidden
    hiddenContent.style.height = "0";
  });

  openButton.addEventListener("click", function () {
    coverPage.classList.add("slide-up");

    // Wait for the slide-up animation to complete before displaying hidden content
    coverPage.addEventListener(
      "transitionend",
      function () {
        coverPage.style.display = "none";
        hiddenContent.style.visibility = "visible"; // Show content once animation is done
        backgroundMusic.play(); // Play the background music
        backgroundMusic.loop = true;
        hiddenContent.style.height = "100vH";
      },
      { once: true }
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slideIn");
          observer.unobserve(entry.target); // Stop observing once it's animated
        }
      });
    },
    { threshold: 0.3 } // Trigger when 50% of the element is visible
  );

  // Select all elements with the .animate class and observe them
  const animateElements = document.querySelectorAll(".animate");
  animateElements.forEach((element) => {
    observer.observe(element);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, options);

  const anims = document.querySelectorAll(".anim");
  anims.forEach((anim) => {
    observer.observe(anim);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const countdownDate = new Date("Nov 17, 2024 08:29:59").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(
      "days"
    ).innerHTML = `<span style="font-weight: bold; font-size: 20px;">${days}</span> Hari`;

    document.getElementById(
      "hours"
    ).innerHTML = `<span style="font-weight: bold; font-size: 20px;">${hours}</span> Jam`;

    document.getElementById(
      "minutes"
    ).innerHTML = `<span style="font-weight: bold; font-size: 20px;">${minutes}</span> Menit`;

    document.getElementById(
      "seconds"
    ).innerHTML = `<span style="font-weight: bold; font-size: 20px;">${seconds}</span> Detik`;

    if (distance < 0) {
      clearInterval(interval);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  };

  const interval = setInterval(updateCountdown, 1000);
});

function redirectToMap() {
  window.open("https://maps.app.goo.gl/q758EeXrEDFqEbsH8", "_blank");
}

function addCalendarEvent() {
  const event = {
    action: "TEMPLATE",
    text: "Undangan Pernikahan Rumaisha & Indrawan",
    dates: "20241117T000000Z/20241117T235900Z",
    details: "Join us for the wedding of Rumaisha & Indrawan.",
    location: "Jakarta, Indonesia",
  };
  const baseUrl = "https://www.google.com/calendar/render";
  const queryString = new URLSearchParams(event).toString();
  window.open(`${baseUrl}?${queryString}`, "_blank");
}

let index = 0;
let autoSlideInterval;
const images = document.querySelectorAll(".carousel img");
const totalImages = images.length;

function showNextImage() {
  images[index].classList.remove("image1");
  index = (index + 1) % totalImages;
  images[index].classList.add("image1");

  // Restart the interval
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(showNextImage, 3000);
}

function showPrevImage() {
  clearInterval(autoSlideInterval);
  images[index].classList.remove("image1");
  index = (index - 1 + totalImages) % totalImages;
  images[index].classList.add("image1");

  // Delay before resuming auto-slide
  setTimeout(() => {
    autoSlideInterval = setInterval(showNextImage, 3000);
  }, 1000);
}

// Automatically start sliding
autoSlideInterval = setInterval(showNextImage, 3000);
