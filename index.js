// When the Services link is clicked, scroll to the Services section
// document.getElementById('service-link').addEventListener('click', function(event) {
//     event.preventDefault();  // Prevent default anchor behavior

//     // Get the services section
//     var servicesSection = document.getElementById('services');

//     // Show the services section and scroll to it
//     servicesSection.style.display = "block";  // Make the services section visible
//     servicesSection.scrollIntoView({ behavior: 'smooth' });  // Scroll smoothly to the services section
// });

document.getElementById('contact-link').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default anchor behavior

    // Get the services section
    var contactSection = document.getElementById('contact');

    // Show the services section and scroll to it
    contactSection.style.display = "block";  // Make the services section visible
    contactSection.scrollIntoView({ behavior: 'smooth' });  // Scroll smoothly to the services section
});

var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex =1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}


document.getElementById('home-link').addEventListener('click', function(event) {
  event.preventDefault();  // Prevent default anchor behavior

  // Get the services section
  var contactSection = document.getElementById('home');

  // Show the services section and scroll to it
  contactSection.style.display = "block";  // Make the services section visible
  contactSection.scrollIntoView({ behavior: 'smooth' });  // Scroll smoothly to the services section
});

document.getElementById('about-link').addEventListener('click', function(event) {
  event.preventDefault();  // Prevent default anchor behavior

  // Get the services section
  var contactSection = document.getElementById('about');

  // Show the services section and scroll to it
  contactSection.style.display = "block";  // Make the services section visible
  contactSection.scrollIntoView({ behavior: 'smooth' });  // Scroll smoothly to the services section
});
document.getElementById('factButton').addEventListener('click', function() {
  const facts = [
      "1.User-Friendly Interface: The system allows users to easily input their details, including name, email, and a message for communication, ensuring that all important information is collected swiftly.",
"2.Audio and Video Recording: Users can record audio and video to document their experience or report a specific situation. This feature helps to create a more accurate picture of the flood conditions, which can be used for emergency response and analysis.",

"3.Nearby Hospital Locator: The system provides users with a list of nearby hospitals and healthcare facilities. This is crucial in case of injuries or medical emergencies, especially when roads may be impassable, and quick access to medical assistance is needed.",

"4.Real-Time Alerts: As the flood situation develops, users receive real-time alerts and updates about the flood levels and safety measures to take. This keeps individuals informed about ongoing conditions.",

"5.Email Notification System: The system allows users to send their filled information, including the recorded video and audio, along with any other emergency details, to a designated email address. This ensures that relevant authorities and emergency responders are quickly notified, improving the chances of swift assistance."
  ];
  
  const factContainer = document.getElementById('facts');
  factContainer.innerHTML = facts.join('<br><br>');
});


// script.js
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting immediately

  // Get the values of the form fields
  const name = document.getElementById('Contactname').value;
  const email = document.getElementById('Contactemail').value;
  const message = document.getElementById('Contactmessage').value;
  const responseMessage = document.getElementById('response-message');

  // Simple form validation
  if (name === '' || email === '' || message === '') {
      responseMessage.textContent = 'Please fill in all fields.';
      responseMessage.classList.add('error');
  } else {
      responseMessage.textContent = 'Thank you for reaching out. We will get back to you soon!';
      responseMessage.classList.remove('error');
    }
});


function sendContactMail() {
  if(document.getElementById("Contactname").value!="" && 
   document.getElementById("Contactemail").value!="" &&
   document.getElementById("Contactmessage").value!=""){
     // showToast()
     
//let audiobtn=document.getElementById("audioAlert")
 // audiobtn.play()
  // sleep(2000)
  // audiobtn.onpause()
  var params = {
    Name: document.getElementById("Contactname").value,
    Gmail: document.getElementById("Contactemail").value,
    Message: document.getElementById("Contactmessage").value,
  //   Location:`Sender Location Is :Latitude ${latitudeData} And Longitude ${longitudeData}.`,
  //   Place:`Sender Place Is :${cityData} ,${stateData} ,${postcodeData} ,${countryData}.`,
  //   Distance:`Sender Distance From You Is :${Math.floor(distanceData)} Kms.`,
   // File:`Senders File Is :${srcData}`
  };

  const serviceID = "service_hj77vkf";
  const templateID = "template_d7690rb";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("Contactname").value = "";
        document.getElementById("Contactemail").value = "";
        document.getElementById("Contactmessage").value = "";
        //document.querySelector(".audioWant").style.display="inline"
        //document.querySelector(".videoWant").style.display="inline"
        console.log(res);
       // alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));
    //console.log(document.getElementById("File").files[0].name)
}
else{
  alert("All Data Required")
}
}

