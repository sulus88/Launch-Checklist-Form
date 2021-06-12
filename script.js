// Write your JavaScript code here!
window.addEventListener("load", function(){
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let launchStatus =  document.getElementById("launchStatus")
let launchStatusCheck = document.getElementById("launchStatusCheck")
let faultyItems = document.getElementById("faultyItems");
let pilotStatus = document.getElementById("pilotStatus");
let copilotStatus = document.getElementById("copilotStatus");
let fuelStatus = document.getElementById("fuelStatus");
let cargoStatus = document.getElementById("cargoStatus");



fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
   response.json().then(function(json){
     const missionTarget = document.getElementById("missionTarget"); 
     function randomSelection(arr){
   let index = Math.floor(Math.random()*arr.length);
   return arr[index];
     }
    let index = randomSelection(json);
     missionTarget.innerHTML = `
     <h2>Mission Destination</h2>
<ol>
   <li>Name: ${index.name}</li>
   <li>Diameter: ${index.diameter}</li>
   <li>Star: ${index.star}</li>
   <li>Distance from Earth: ${index.distance}</li>
   <li>Number of Moons: ${index.moons}</li>
</ol>
<img src="${index.image}"></img>
`
   });
});

const form = document.querySelector("form");
form.addEventListener("submit", function(event){
   event.preventDefault();
   pilotStatus.innerHTML=`Pilot ${pilotName.value} Ready`
   copilotStatus.innerHTML=`Co-pilot ${copilotName.value} Ready`
   if(pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
      window.alert("All fields are required!")
   } else if (! isNaN(pilotName.value) || ! isNaN(copilotName.value) || isNaN(fuelLevel.value) || 
   isNaN(cargoMass.value)){
      window.alert("Invalid information!")
   } else if(fuelLevel.value < 10000){
      fuelStatus.innerHTML = "Insuffient fuel";
      faultyItems.style.visibility = "visible"; 
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   } else if(cargoMass.value > 10000){
      faultyItems.style.visibility = "visible";
      cargoStatus.innerHTML = "Too much mass for the shuttle to take off";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   } else {
      launchStatus.innerHTML =  "Shuttle is ready for launch";
      launchStatusCheck.style.color = "green";   
   }
   
});

});
