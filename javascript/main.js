/**
 * Retrieves the HTML element with the ID "sticky-head" and assigns it to the variable `header`.
 * This element is expected to be used as a sticky header in the web page.
 *
 * @type {HTMLElement|null}
 */

window.addEventListener("scroll", function () {
  let header = document.getElementById("sticky-head");
  if (window.scrollY > 80) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

/* ============================= Discount banner Position Setting =================== */

const header = document.querySelector(".discount-div");
const clonedHeader = header.cloneNode(true); // Clone the header for the bottom
const offerLogo = clonedHeader.querySelector(".head-cols1 .mobile-img"); // Select the element with classes .head-cols1 .mobile-img
clonedHeader.style.position = "fixed";
clonedHeader.style.bottom = "0";
clonedHeader.style.left = "0";
clonedHeader.style.width = "100vw";
clonedHeader.style.zIndex = "9999";
clonedHeader.style.display = "none"; // Initially hidden
document.body.appendChild(clonedHeader);

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;

  if (scrollTop > windowHeight * 2) {
    clonedHeader.style.display = "block"; // Show the cloned header at the bottom
    offerLogo.style.top = "-100%";
  } else {
    clonedHeader.style.display = "none"; // Hide the cloned header
  }
});

/* ====================== Change Tv Picture ====================== */
window.onload = function () {
  /**
   * Selects all image elements within elements that have the class "img-div"
   * and are descendants of elements with the class "tv-div".
   *
   * @type {NodeListOf<HTMLImageElement>}
   */
  const images = document.querySelectorAll(".tv-div .img-div .tv");
  const tvItems = document.querySelectorAll(".tv-div .img-div .tv-item");

  let currentIndex = 0;

  // Hide all images except the first one
  for (let i = 1; i < images.length; i++) {
    images[i].style.display = "none";
    tvItems[i].style.display = "none";
  }

  setInterval(function () {
    // Hide the current image
    images[currentIndex].style.display = "none";
    tvItems[currentIndex].style.display = "none";

    // Calculate the next index
    currentIndex = (currentIndex + 1) % images.length;

    // Show the next image
    images[currentIndex].style.display = "block";
    tvItems[currentIndex].style.display = "block";
  }, 2000); // Change image every 2 seconds
};

/* ========================= Trusted Section of Slider ================ */
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
const reviewSlider = document.querySelector(".review-slider");
const reviews = document.querySelectorAll(".review");

let currentIndex = 0;

function updateSlider() {
  const reviewWidth = reviews[0].offsetWidth + 20; // Including gap
  reviewSlider.style.transform = `translateX(-${currentIndex * reviewWidth}px)`;
}

leftArrow.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex -= 1;
    updateSlider();
  }
});

rightArrow.addEventListener("click", function () {
  if (currentIndex < reviews.length - 1) {
    currentIndex += 1;
    updateSlider();
  }
});

// Ensure slider resets on window resize
window.addEventListener("resize", updateSlider);

/* ======================== Modal  Styling ======================= */

const openModalButton = document.querySelectorAll(".list-btn");
const closeModalButton = document.getElementById("featureClose-modal");
const modal = document.getElementById("featureModal");

openModalButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    modal.style.display = "flex";
  });
});

closeModalButton.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

/* ====================================== FAQ Section ============================= */
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", function () {
    const content = this.nextElementSibling;
    const icon = this.querySelector(".icon");

    // Toggle content display with animation
    if (content.classList.contains("open")) {
      content.classList.remove("open");
      icon.textContent = "+"; // Change to plus
    } else {
      content.classList.add("open");
      icon.textContent = "-"; // Change to minus
    }

    // Optionally close other accordion items
    accordionHeaders.forEach((otherHeader) => {
      if (otherHeader !== this) {
        const otherContent = otherHeader.nextElementSibling;
        const otherIcon = otherHeader.querySelector(".icon");
        otherContent.classList.remove("open");
        otherIcon.textContent = "+"; // Reset to plus
      }
    });
  });
});

/* ============================= Form Modal Section =========================== */
// =====================  Countdown Timer Function =============================

function calculateTimeDifference(eventDate) {
  const now = new Date();
  const targetDate = new Date(eventDate);

  if (targetDate <= now) {
    console.error("The event date must be in the future.");
    return { days: 0, hours: 0, minutes: 0 };
  }

  const timeDifference = targetDate.getTime() - now.getTime();

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}

function startCountdown(daysInput, hoursInput, minutesInput) {
  const daysElements = document.querySelectorAll(".days");
  const hoursElements = document.querySelectorAll(".hours");
  const minutesElements = document.querySelectorAll(".minutes");
  const secondsElements = document.querySelectorAll(".seconds");

  // Calculate the deadline based on the inputs
  const now = new Date();
  const deadline = new Date(
    now.getTime() +
      daysInput * 24 * 60 * 60 * 1000 +
      hoursInput * 60 * 60 * 1000 +
      minutesInput * 60 * 1000
  );

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = deadline.getTime() - now;

    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Stop the timer when time is up
      daysElements.forEach((el) => (el.innerHTML = "00"));
      hoursElements.forEach((el) => (el.innerHTML = "00"));
      minutesElements.forEach((el) => (el.innerHTML = "00"));
      secondsElements.forEach((el) => (el.innerHTML = "00"));
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysElements.forEach(
      (el) => (el.innerHTML = String(days).padStart(2, "0"))
    );
    hoursElements.forEach(
      (el) => (el.innerHTML = String(hours).padStart(2, "0"))
    );
    minutesElements.forEach(
      (el) => (el.innerHTML = String(minutes).padStart(2, "0"))
    );
    secondsElements.forEach(
      (el) => (el.innerHTML = String(seconds).padStart(2, "0"))
    );
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call to avoid 1-second delay
}

const targetDate = "01/12/2025";
const { days, hours, minutes } = calculateTimeDifference(targetDate);
// Example: Start the countdown for 2 days, 5 hours, and 25 minutes
startCountdown(days, hours, minutes);

// =====================  Dynamic Stats Section =====================
function startStats(enrollmentStartDate, initialEnrolledUsers) {
  const usersElement = document.getElementById("stat-users");
  const coursesElement = document.getElementById("stat-courses");
  const testimonialsElement = document.getElementById("stat-testimonials");
  const enrolledSinceElement = document.getElementById("enrolled-since");

  // Calculate Enrolled Users
  function calculateEnrolledUsers(startDate, initialUsers) {
    const now = new Date();
    const start = new Date(startDate);
    const daysElapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24)); // Total days since the start date

    // Formula: Users increase by 5 per day on average, with some variation
    const baseRate = 5; // Average new users per day
    const variation = Math.random() * 3; // Add randomness
    return Math.floor(initialUsers + daysElapsed * (baseRate + variation));
  }

  // Update Stats with Animation
  function animateStats() {
    const usersTarget = calculateEnrolledUsers(
      enrollmentStartDate,
      initialEnrolledUsers
    );
    const stats = [
      { id: "stat-users", endValue: usersTarget }, // Number of users enrolled
      { id: "stat-courses", endValue: 350 }, // Number of courses completed
      { id: "stat-testimonials", endValue: 500 }, // Number of positive testimonials
    ];

    stats.forEach((stat) => {
      const element = document.getElementById(stat.id);
      let currentValue = 0;
      const increment = Math.ceil(stat.endValue / 100); // Adjust speed

      const updateStat = setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.endValue) {
          currentValue = stat.endValue;
          clearInterval(updateStat);
        }
        element.textContent = currentValue;
      }, 20); // Adjust time interval for smoother animation
    });

    // Update Enrolled Since Text
    const startDate = new Date(enrollmentStartDate);
    const options = { month: "short", year: "numeric" };
    enrolledSinceElement.textContent = `Users Enrolled Since ${startDate.toLocaleDateString(
      "en-US",
      options
    )}`;
  }

  // Start Animation
  animateStats();
}

// Example: Start the stats section with enrollment starting in Aug 2024 and 100 initial users
// startStats("2024-11-01", 100);

// ======================== Utility Functions ===========================
const displayModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
};

// ======================== Enroll Button Functionality ==================

// Open the modal when user clicks on cta buttons
function openModal() {
  const storedUser = sessionStorage.getItem("enrolledUser");
  if (storedUser) {
    displayModal("alreadyModal");
    document.getElementById("modal").style.display = "none";
  } else {
    document.getElementById("modal").style.display = "block";
  }
}

// ======================== Close Modal ============================
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// Attach event listener to a static parent element, such as the document or a container
document.addEventListener("click", (event) => {
  // Check if the clicked element has the ID "closeModalBtn"
  if (event.target && event.target.id === "closeModalBtn") {
    // Get the parent modal of the button clicked
    const modal = event.target.closest(".modal");
    if (modal) {
      modal.style.display = "none";
      console.log("Close button clicked", modal);
    }
  }
});

// Close Modal when clicking outside content
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
// ======================== Handle Form Submission ======================
document.getElementById("enrollForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form refresh

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Generate an encrypted token using today's date
  const token = btoa(new Date().toISOString()); // Base64 encoding of the date

  // Prepare the data payload
  const data = {
    name: name,
    email: email,
    token: token,
  };

  // Disable the submit button and show text submitting to prevent multiple submissions
  const submitButton = event.target.querySelector("button[type='submit']");
  const buttonOriginalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  // Function to reset the button state after a delay
  function resetButton() {
    submitButton.disabled = false;
    submitButton.textContent = buttonOriginalText;
  }

  // ========= Toggle Between Dummy and Real Request =========
  const useDummyData = true; // Set to false when using real backend

  if (useDummyData) {
    // Simulated Dummy Response (For Development/Testing)
    const serverResponse =
      Math.random() > 0.2 ? { success: true } : { success: false }; // 80% success rate

    setTimeout(() => {
      if (serverResponse.success) {
        // Store user data in session storage
        const userData = JSON.stringify({ name, email });
        sessionStorage.setItem("enrolledUser", userData);

        // Show success modal
        displayModal("successModal");

        resetButton(); // Reset the submit button
      } else {
        // Show error modal
        displayModal("errorModal");
        resetButton(); // Reset the submit button
      }
      document.getElementById("modal").style.display = "none"; // Close form modal
    }, 3000);
  } else {
    // Real AJAX Request
    fetch("backend-handler.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Sending JSON data
      },
      body: JSON.stringify(data), // Convert the data object to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((result) => {
        if (result.success) {
          // Store user data in session storage
          const userData = JSON.stringify({ name, email });
          sessionStorage.setItem("enrolledUser", userData);

          // Show success modal
          displayModal("successModal");
        } else {
          // Show error modal
          displayModal("errorModal");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        displayModal("errorModal"); // Show error modal
      })
      .finally(() => {
        resetButton(); // Reset the submit button
        document.getElementById("modal").style.display = "none"; // Close form modal
      });
  }
});

// ============================ Website Preview Functionality =======================
// Iframe url index objects

const iframeUrls = [
  "https://programmerowais.github.io/hoobank/",
  "https://programmerowais.github.io/brainthunder/",
  "https://task-collab-github-io.vercel.app/",
];
function openPreview(urlIndex) {
  // Create the iframe container
  var previewContainer = document.createElement("div");
  previewContainer.id = "previewContainer";

  // Create the iframe
  var iframe = document.createElement("iframe");
  iframe.className = "previewIframe";
  iframe.src = iframeUrls[urlIndex]; // Replace with the URL you want to preview

  // Create the close button
  var closeButton = document.createElement("button");
  closeButton.className = "closePreview";
  closeButton.innerText = "X";
  closeButton.onclick = function () {
    document.body.removeChild(previewContainer);
    document.body.style.overflow = "auto"; // Show the main page scroll bar
  };

  // Append the iframe and close button to the container
  previewContainer.appendChild(iframe);
  previewContainer.appendChild(closeButton);

  // Append the container to the body
  document.body.appendChild(previewContainer);

  // Hide the main page scroll bar
  document.body.style.overflow = "hidden";
}
