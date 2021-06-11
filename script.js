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
     missionTarget.innerHTML = `
     <h2>Mission Destination</h2>
<ol>
   <li>Name: ${json[2].name}</li>
   <li>Diameter: ${json[2].diameter}</li>
   <li>Star: ${json[2].star}</li>
   <li>Distance from Earth: ${json[2].distance}</li>
   <li>Number of Moons: ${json[2].moons}</li>
</ol>
<img src="${json[2].image}"></img>
`
   });
});
const form = document.querySelector("form");
form.addEventListener("submit", function(event){
   event.preventDefault;
   if(pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
      window.alert("All fields are required!")
   } else if (! isNaN(pilotName.value) || ! isNaN(copilotName.value) || isNaN(fuelLevel.value) || 
   isNaN(cargoMass.value)){
      window.alert("Invalid information!")
   } else if(fuelLevel.level<10000 && cargoMass.value > 10000){
      fuelStatus.innerHTML = "Insuffient fuel";
      cargoStatus.innerHTML = "Too much mass for the shuttle to take off";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      faultyItems.style.visibility = "visible"; 
      launchStatusCheck.style.color = "red";
   } else if(fuelLevel.value < 10000){
      fuelStatus.innerHTML = "Insuffient fuel";
      faultyItems.style.visibility = "visible"; 
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatusCheck.style.backgroundColor = "red";
   } else if(cargoMass.value > 10000){
      faultyItems.style.visibility = "visible";
      cargoStatus.innerHTML = "Too much mass for the shuttle to take off";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatusCheck.style.backgroundColor = "red";
   } else {
      launchStatus.innerHTML =  "Shuttle is ready for launch";
      launchStatusCheck.style.backgroundColor = "green";
      faultyItems.innerHTML =`
<ol>
<li id="pilotStatus">Pilot ${pilotName.value} Ready</li>
<li id="copilotStatus">Co-pilot ${copilotName.value}Ready</li>
<li id="fuelStatus" value="Fuel level high enough for launch"> ${fuelStatus.value}</li>
<li id="cargoStatus" value="Cargo mass low enough for launch"> ${cargoStatus.value} </li>
</ol>
`
   }



});

});
