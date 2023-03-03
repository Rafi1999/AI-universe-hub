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
          ${generate(element.features)}
</ol>
        </div>
        <ul class="list-group">
          <h5 class="mt-2">${element.name}</h5>
          <div class="d-flex justify-content-between">
          <p class="text-secondary"><i class="fa-solid fa-calendar-day"></i></i> ${element.published_in}</p>
          <i class="fas fa-arrow-right" onclick="fetchAiDetail('${element.id}')" style="color:red"  data-bs-toggle="modal"
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


const generate = features =>{
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
  console.log(detail.description);
  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = "";
  const inModal = document.createElement("div");
  inModal.classList.add("container","d-flex","gap-3","justify-content-center","w-auto","mb-3");
  inModal.innerHTML = `
  <div class="w-50 card border border-danger bg-modalCard">
  <h5 class="mt-3 mr-2 text-center">${detail.description}</h5>
  <div class="d-flex mt-2 justify-content-center gap-4">
  <h6 class="bg-light border py-2 px-2 text-success fs-6 border-4 text-center border-light rounded">${(detail.pricing==null)? "Free of Cost": (detail.pricing[0].price==0)? "Free of Cost":(detail.pricing[0].price=="No cost")? "Free of Cost":detail.pricing[0].price}<br>
  ${(detail.pricing==null)? "Basic" : (detail.pricing[0].plan=="Free")?"Basic":detail.pricing[0].plan}</h6>
  <h6 class="bg-light border py-2 px-2 text-warning fs-6 border-4 border-light rounded text-center">${(detail.pricing==null)? "Free of Cost":(detail.pricing[1].price=="No cost")? "Free of Cost":detail.pricing[1].price}<br>
  ${detail.pricing==null?"Free of Cost":detail.pricing[1].plan}</h6>
  <h6 class="bg-light border py-2 px-2 fs-6 text-danger border-4 border-light rounded text-center">${detail.pricing[2].price!="No cost"?detail.pricing[2].price:"Free of cost"}<br>
  ${detail.pricing[2].plan}</h6>
  </div>
  <div class=" d-flex justify-content-center gap-3">
  <div><h5 class="card-title mt-2">Features</h5>
  <ul class="text-secondary">
  <li>${detail.features[1].feature_name!=null? detail.features[1].feature_name:"No data found"}</li>
  <li>${detail.features[2].feature_name!=null? detail.features[2].feature_name:"No data found"}</li>
  <li>${detail.features[3].feature_name!=null? detail.features[3].feature_name:"No data found"}</li>
</ul></div>
  <div>
  <h5 class="card-title mt-2">Integrations</h5>
  <ul class="text-secondary">
  ${generate(detail.integrations)!=null?generate(detail.integrations): "No data found"}
  </div>
  </div>
  </div>
  <div class="w-50 card text-center">
  <div class="d-flex position-relative">
  <img src=${detail.image_link[0]} class="img-fluid rounded-start w-auto" alt="...">
  <button class="btn btn-danger position-absolute top-0 end-0 py-1 px-2 position-absolute">${detail.accuracy.score? detail.accuracy.score*100 : 0}% accuracy</button>
  </div>
  <h4 class="mt-2">${detail.input_output_examples[0].input!=null?detail.input_output_examples[0].input:"No input"}</h4>
  <p class="text-secondary">${detail.input_output_examples[0].output!=null?detail.input_output_examples[0].output:"No! Not Yet! Take a break!!!"}</p>
  </div>
  `;
        modalBody.appendChild(inModal);

}

fetchAIData(6);


// onclick="fetchNewsDetail('${_id}')" 