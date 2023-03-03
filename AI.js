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
          <i class="fas fa-arrow-right" onclick="fetchAiDetail('${element.id}');toggleSpinner(true)" style="color:red"  data-bs-toggle="modal"
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

const fetchAiDetail = (id) =>{
  let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showAiDetail(data.data))
}

const showAiDetail = (detail)=>{
  console.log(detail);
  const modalBody = document.getElementById('modal-body');
  const inModal = document.createElement("div");
  inModal.classList.add("container","d-flex","gap-3","justify-content-center");
  inModal.innerHTML = `
  <div class=" card border border-danger bg-modalCard">
  <h6 class="mt-3 mr-2 text-center">${detail.description}</h6>
  </div>
  <div class="card">
  <div class="d-flex position-relative">
  <img src=${detail.image_link[0]} class="img-fluid rounded-start w-auto" alt="...">
  <button class="btn btn-danger position-absolute top-0 end-0 py-1 px-2 position-absolute">${detail.accuracy.score? detail.accuracy.score*100 : 0}% accuracy</button>
  </div>
  <h2>ABCD</h2>
  </div>
  `;
        modalBody.appendChild(inModal);

}

fetchAIData(6);


// onclick="fetchNewsDetail('${_id}')" 