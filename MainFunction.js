let box=document.querySelector("#vidBox")
let audioRecorder=document.querySelector("#audio-recorder")
let videoRecorder=document.querySelector("#vid-recorder")
let newBtn=document.querySelector("#new")
audioRecorder.style.display="none";
videoRecorder.style.display="none";
let btn1=document.querySelector("#btn")
let para=document.querySelector("#para")
let details=document.querySelector("#details")
let body=document.querySelector("body")
let map=document.querySelector(".map")
let SearchesByNear=document.querySelector("#NearSearches")
let NearBysearches=document.querySelector(".nearbysearches")
let allFetchedData=document.querySelector(".allFetchedData")
let Down=document.querySelector(".down")
Down.style.display="none"

const fun=async()=>{
    //console.log(navigator.geolocation.getCurrentPosition)
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (position)=>{
//console.log(position.coords.latitude,position.coords.longitude)
const {latitude,longitude}=position.coords
console.log(latitude,longitude)
//para.innerHTML=`Location Is ${latitude} latitude and ${longitude} Longitude`
//getCurrentAddress(latitude,longitude)    

const url = `https://nearby-point-of-interest.p.rapidapi.com/api/near-by-point-of-interest-by-lat-lon?lat=${latitude}&lon=${longitude}&tag=medicalshop%2Cgym&radius=5000&limit=5`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '355d027219msh386d40ea1898e94p144534jsnb79e8056d9bc',
		'x-rapidapi-host': 'nearby-point-of-interest.p.rapidapi.com'
	}
};


try {
	const response = await fetch(url, options);
	const result = await response.json();
   // First.innerHTML=result.success
	console.log(result);
    for(let i=0;i<5;i++){
        let EveryContent=document.createElement("div")
        EveryContent.classList.add("everyContent")
        let dataType=document.createElement("p")
        dataType.innerHTML=`Type:${result["data"][i]["type"]}\n`
        //allFetchedData.appendChild(dataType)
        EveryContent.appendChild(dataType)
        
        let dataDisplayName=document.createElement("p")
        dataDisplayName.innerHTML=`Name:${result["data"][i]["name"]}\n`
        //allFetchedData.appendChild(dataDisplayName)
        EveryContent.appendChild(dataDisplayName)


        let dataDisplayDistance=document.createElement("p")
        dataDisplayDistance.innerHTML=`Distance:${result["data"][i]["distance"]}\n`
        //allFetchedData.appendChild(dataDisplayDistance)
        EveryContent.appendChild(dataDisplayDistance)
allFetchedData.appendChild(EveryContent)

	console.log(result["data"][i]["class"]);

    }
} catch (error) {
	console.error(error);
}
},(error)=>{
console.log(error.message)
        })
    }
}

SearchesByNear.addEventListener("click",fun)
 
  
function showToast() {
    // Create a toast div
    const toast = document.createElement('div');
    toast.classList.add('toast');
  
    // Set toast message
    toast.textContent = 'Alert Sent! Response You Fast';
  
    // Append the toast to the toast container
    const container = document.getElementById('toast-container');
    container.appendChild(toast);
  
    // Show the toast with fade-in effect
    setTimeout(() => {
      toast.classList.add('show');
    }, 1000);  // Small delay to trigger the CSS transition
  
    // Remove the toast after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      // Remove the toast element after fade-out
      setTimeout(() => {
        container.removeChild(toast);
      }, 500);  // Time to wait for fade-out to complete
    }, 4000);  // Toast will disappear after 4 seconds
  }
  
  const apiEndpoint="https://api.opencagedata.com/geocode/v1/json?"
  const apiKey="c87463ad06a24bc5a3e3818924fa958b"
  const getCurrentAddress=async (latitude,longitude)=>{
     
  console.log(latitude,longitude)
  let query=`${latitude},${longitude}`
  let apiUrl=`${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`
  try {
      const res=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=c87463ad06a24bc5a3e3818924fa958b`)
      const data=await res.json()
      console.log(data)
      console.log(data.results[0].components)
      const{office,road,state,postcode,country}=data.results[0].components
  details.innerHTML=`User Address:${office}, ${road}, ${state}, ${postcode}, ${country}`
  let iframe=document.createElement('iframe')
  iframe.src=`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115146.41911521796!2d85.1375645051387!3d25.594094728110353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f29937c52d4f05%3A0x831a0e05f607b270!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1731934618416!5m2!1sen!2sin`
  map.appendChild(iframe)
  
  const url = `https://distance-calculator8.p.rapidapi.com/calc?startLatitude=${latitude}&startLongitude=${longitude}&endLatitude=${latitude}&endLongitude=${longitude}`;
  const options = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '355d027219msh386d40ea1898e94p144534jsnb79e8056d9bc',
          'x-rapidapi-host': 'distance-calculator8.p.rapidapi.com'
      }
  };
  try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.body.distance["kilometers"]);
  sendMail(latitude,longitude,office,road,state,postcode,country,result.body.distance["kilometers"])
      alert("Distance")
  } 
  catch (error) {
      console.error(error);
  }
  } 
  catch (error) {
      console.log(error.message)
  }
  }
  newBtn.addEventListener("click",()=>{
      console.log(navigator.geolocation.getCurrentPosition)
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((position)=>{
  //console.log(position.coords.latitude,position.coords.longitude)
  const {latitude,longitude}=position.coords
  para.innerHTML=`Location Is ${latitude} latitude and ${longitude} Longitude`
  getCurrentAddress(latitude,longitude)    
  },(error)=>{
  console.log(error.message)
          })
      }
  })



function start_video_recording(){
    if(document.querySelector(".content")){
        document.querySelector(".content").remove()
    }
box.style.display="block"
    let chuncks=[]
    const startbtn=document.getElementById("start")
    const stopbtn=document.getElementById("stop")

    navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
    })
    .then((mediaStreamObj)=>{
        document.getElementById("vidBox").srcObject=mediaStreamObj
startbtn.disabled=true
stopbtn.disabled=false
        const medRec=new MediaRecorder(mediaStreamObj)
        window.mediaStream=mediaStreamObj
        window.mediaRecorder=medRec
        medRec.start()
        medRec.ondataavailable=(e)=>{
chuncks.push(e.data)
        }
        medRec.onstop=()=>{
const blobFile=new Blob(chuncks,{
    type:'video/mp4'
})
chuncks=[]
const recMediaFile=document.createElement('video')
recMediaFile.classList.add("content")
recMediaFile.controls=true
const RecUrl=URL.createObjectURL(blobFile)
recMediaFile.src=RecUrl
document.getElementById('vid-recorder').appendChild(recMediaFile)
        }
    })
}

function stop_Recording(end,start){
window.mediaRecorder.stop()
window.mediaStream.getTracks().forEach((track) => {
    track.stop()
})
end.disabled=true
start.disabled=false
}

function start_audio_recording(){
    if(document.querySelector(".audioContent")){
        document.querySelector(".audioContent").remove()
    }
    let chuncks=[]
    const startbtn=document.getElementById("Audio_start")
    const stopbtn=document.getElementById("Audio_stop")

    navigator.mediaDevices.getUserMedia({
        audio:true,
        video:false
    })
    .then((mediaStreamObj)=>{
        document.getElementById("vidBox").srcObject=mediaStreamObj
startbtn.disabled=true
stopbtn.disabled=false
        const medRec=new MediaRecorder(mediaStreamObj)
        window.mediaStream=mediaStreamObj
        window.mediaRecorder=medRec
        medRec.start()
        medRec.ondataavailable=(e)=>{
chuncks.push(e.data)
        }
        medRec.onstop=()=>{
const blobFile=new Blob(chuncks,{
    type:'audio/mpeg'
})
chuncks=[]
const recMediaFile=document.createElement('audio')
recMediaFile.classList.add("audioContent")
recMediaFile.controls=true
const RecUrl=URL.createObjectURL(blobFile)
recMediaFile.src=RecUrl
document.getElementById('audio-recorder').appendChild(recMediaFile)
        }
    })
}
function stop_audio_recording(end,start){
window.mediaRecorder.stop()
window.mediaStream.getTracks().forEach((track) => {
    track.stop()
})
end.disabled=true
start.disabled=false
}
let btn=document.getElementById("clickme")
let audiobtn=document.getElementById("audioAlert")
btn.addEventListener("click",()=>{
    audiobtn.play()
    // sleep(2000)
    // audiobtn.onpause()
})

// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition((position)=>{
// //console.log(position.coords.latitude,position.coords.longitude)
// const {latitude,longitude}=position.coords
// },(error)=>{
// console.log(error.message)
//     })
// }
function sendMail(latitudeData,longitudeData,officeData,roadData,stateData,postcodeData,countryData,distanceData) {
    if(document.getElementById("name").value!="" && 
     document.getElementById("email").value!="" &&
     document.getElementById("message").value!=""){
        showToast()
       
let audiobtn=document.getElementById("audioAlert")
    audiobtn.play()
    // sleep(2000)
    // audiobtn.onpause()
    var params = {
      Name: document.getElementById("name").value,
      Number: document.getElementById("email").value,
      Message: document.getElementById("message").value,
      Location:`Sender Location Is :Latitude ${latitudeData} And Longitude ${longitudeData}.`,
      Place:`Sender Place Is :${officeData} ,${roadData} ,${stateData} ,${postcodeData} ,${countryData}.`,
      Distance:`Sender Distance From You Is :${Math.floor(distanceData)} Kms.`,
     // File:`Senders File Is :${srcData}`
    };
  
    const serviceID = "service_hj77vkf";
    const templateID = "template_js5ai4f";
  
      emailjs.send(serviceID, templateID, params)
      .then(res=>{
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
         // document.querySelector(".audioWant").style.display="inline"
         // document.querySelector(".videoWant").style.display="inline"
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
  

function audio_Yes(){
audioRecorder.style.display="inline"
document.querySelector(".audioWant").style.display="none"

}
function audio_No(){
document.querySelector(".audioWant").style.display="none"
}
function video_Yes(){
    document.querySelector(".videoWant").style.display="none"
    videoRecorder.style.display="inline"
}
function video_No(){
    document.querySelector(".videoWant").style.display="none"
}

 