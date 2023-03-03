const fetchAIData = (dataLimit) => {
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => ShowAIData(data.data.tools,dataLimit))
}

const ShowAIData = (data,dataLimit) => {
  const showAll = document.getElementById("show-all");
  // showAll.textContent = '';
  if(dataLimit && data.length>6){
    data = data.slice(0,6);
    showAll.classList.remove('d-none');
    
  }else{
    showAll.classList.add('d-none');
    data = data.slice(7,13);
  }
  const DataContainer = document.getElementById('showAIData');
  data.forEach(element => {
    const card = document.createElement("div");
    card.classList.add("card", "w-25", "p-3", "col","mb-2");
    card.innerHTML = `
        <img src=${element.image} class="card-img-top img-fluid rounded-start" alt="...">
        <div class="card-body">
          <h5 class="card-title mt-2">Features</h5>
          <ol class="text-secondary">
          ${generateFeature(element.features)}
</ol>
        </div>
        <ul class="list-group">
          <h5 class="mt-2">${element.name}</h5>
          <div class="d-flex justify-content-between">
          <p class="text-secondary"><i class="fa-solid fa-calendar-day"></i></i> ${element.published_in}</p>
          <i class="fas fa-arrow-right" style="color:red"  data-bs-toggle="modal"
        data-bs-target="#exampleModal"></i>
          </div>
        </ul>
        
        
        `;
    DataContainer.appendChild(card);
  });
  toggleSpinner(false);
}

const toggleSpinner = isLoading => {
const loaderPart = document.getElementById("loader"); 
if (isLoading){ 
  loaderPart.classList.remove('d-none') 
}
else{
  loaderPart.classList.add('d-none');
} 
}

document.getElementById('btn-showall').addEventListener('click',function(){
  toggleSpinner(true);
  fetchAIData();
})


const generateFeature = features =>{
      let featureHTML= '';
      for (let i = 0; i < features.length; i++){
          featureHTML +=`<li>${features[i] ? features[i] : "Not Available"}</li>`;
      }
      return featureHTML;
  }




fetchAIData(6);


// onclick="fetchNewsDetail('${_id}')" 