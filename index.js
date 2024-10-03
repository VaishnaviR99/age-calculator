$(() => {
  // Input validation
  $(".dob-input").on("input", function (event) {
    if ($(this).val().length > 1) {
      $(this).val($(this).val().slice(0, 1));
    }
    const value = $(this).val();
    if (value) {
      const minValue = parseInt($(this).attr("min"));
      const maxValue = parseInt($(this).attr("max"));
      const enteredValue = parseInt(value);

      // Remove error class and border style if validation passes
      if (enteredValue >= minValue && enteredValue <= maxValue) {
        $(this).css("border", "1px solid #ccc");
      } else {
        $(this).css("border", "1px solid red");
        createNotification("Error: Invalid Date Format");
        $(this).val("");
      }

      const d1 = $("#d1").val();
      const d2 = $("#d2").val();
      const m1 = $("#m1").val();
      const m2 = $("#m2").val();
      const y1 = $("#y1").val();
      const y2 = $("#y2").val();

      if (d1 === "3" && d2 > "1") {
        $("#d2").css("border", "1px solid red");
        $("#d1").css("border", "1px solid red");
        createNotification("Error: Invalid date format");
        $("#d2").val("");
        $("#d1").val("");
        $("#d1").focus();
        return;
      } else if (m1 === "1" && m2 > "2") {
        $("#m2").css("border", "1px solid red");
        $("#m1").css("border", "1px solid red");
        createNotification("Error: Invalid month format");
        $("#m2").val("");
        $("#m1").val("");
        $("#m1").focus();
        return;
      } else if (
        value.length === 1 &&
        enteredValue >= minValue &&
        enteredValue <= maxValue
      ) {
        $(this).css("border", "1px solid #ccc");
        $(this).next().focus();
      }
    }
  });

  //get date from calendar
  $("#calendar").on("change", function () {
    fillDobFromCalendar(this);
  });

  // Age calculation form
  $("#age-form").on("submit", function (event) {
    event.preventDefault();

    const d1 = $("#d1").val();
    const d2 = $("#d2").val();
    const m1 = $("#m1").val();
    const m2 = $("#m2").val();
    const y1 = $("#y1").val();
    const y2 = $("#y2").val();
    const y3 = $("#y3").val();
    const y4 = $("#y4").val();

    const dobString = `${y1}${y2}${y3}${y4}-${m1}${m2}-${d1}${d2}`;
    const dob = new Date(dobString);

    // Get today's date
    const today = new Date();

    const ageInMilliseconds = today.getTime() - dob.getTime();

    // Convert milliseconds to years, months, and days
    const years = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (ageInMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
        (1000 * 60 * 60 * 24 * 30)
    );

    const days = Math.floor(
      (ageInMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );

    $(".card-inner").addClass("flipped");
    const name = $("#name").val().toUpperCase();
    console.log($("#name").val());
    $("#age-message").text(
      `${name}'s age as of today is ${years} years, ${months} months, and ${days} days.`
    );
  });

  $("#reset").on("click", function () {
    $("#age-form").trigger("reset");
    $(".card-inner").removeClass("flipped");
  });
});
const starsContainer = document.querySelector(".stars");

function createStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Randomly position the star within the container
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";

    starsContainer.appendChild(star);
  }
}

createStars(70);

function createNotification(message, duration = 5000) {
  const notification = document.createElement("div");
  notification.classList.add("notify");
  notification.textContent = message;

  notification.classList.add("notify-enter");

  // Function to remove notification after duration
  const removeNotification = () => {
    notification.classList.remove("notify-enter");
    notification.classList.add("notify-leave");
    notification.addEventListener("transitionend", () => {
      notification.remove();
    });
  };

  document.body.appendChild(notification);

  setTimeout(removeNotification, duration);
}

function fillDobFromCalendar(input) {
  const date = new Date($(input).val());
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString();

  $("#d1").val(day[0]);
  $("#d2").val(day[1]);
  $("#m1").val(month[0]);
  $("#m2").val(month[1]);
  $("#y1").val(year[0]);
  $("#y2").val(year[1]);
  $("#y3").val(year[2]);
  $("#y4").val(year[3]);
}
