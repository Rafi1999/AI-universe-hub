const fetchAIData = (dataLimit) => {
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => ShowAIData(data.data.tools,dataLimit))
}
// Show All AI Data
const ShowAIData = (data,dataLimit) => {
  const showAll = document.getElementById("show-all");
  // showAll.textContent = '';
  if(dataLimit && data.length>6){
    data = data.slice(0,6);
    showAll.classList.remove('d-none');
    
  }else{
    showAll.classList.add('d-none');
    data = data.slice(6,13);
  }
  const DataContainer = document.getElementById('showAIData');
  // DataContainer.classList.add("col","col-1","col-md-3");
  data.forEach(element => {
    const card = document.createElement("div");
    card.classList.add("col", "p-3","mb-2");
    card.innerHTML = `
        <div class="card h-100">
          <img src=${element.image} class="card-img-top img-fluid rounded-start" alt="...">
          <div class="card-body">
            <h5 class="card-title mt-2">Features</h5>
            <ol class="text-secondary">
            ${generate(element.features)}
  </ol>
          </div>
          <ul class="list-group mx-2">
            <h5 class="mt-2">${element.name}</h5>
            <div class="d-flex justify-content-between">
            <p class="text-secondary"><i class="fa-solid fa-calendar-day"></i></i> ${element.published_in}</p>
            <i class="fas fa-arrow-right" onclick="fetchAiDetail('${element.id}')" style="color:red"  data-bs-toggle="modal"
          data-bs-target="#exampleModal"></i>
            </div>
          </ul>
        </div>
        `;
    DataContainer.appendChild(card);
  });
  toggleSpinner(false);
}
// spinner 
const toggleSpinner = isLoading => {
const loaderPart = document.getElementById("loader"); 
if (isLoading){ 
  loaderPart.classList.remove('d-none') 
}
else{
  loaderPart.classList.add('d-none');
} 
}

// button to show all Data
document.getElementById('btn-showall').addEventListener('click',function(){
  toggleSpinner(true);
  fetchAIData();
})

//finding feature and integration data function
const generate = features =>{
      let featureHTML= '';
      for (let i = 0; i < features.length; i++){
          featureHTML +=`<li>${features[i] ? features[i] : "Not Available"}</li>`;
      }
      return featureHTML;
  }

// fetching Data in detail
const fetchAiDetail = (id) =>{
  let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showAiDetail(data.data))
}

// Modal work
const showAiDetail = (detail)=>{
  // console.log(detail.published_in);
  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = "";
  const inModal = document.createElement("div");
  inModal.classList.add("container-fluid","d-flex","gap-3","justify-content-center","w-auto","mb-3","flex-column","flex-md-row");
  inModal.innerHTML = `
  <!-- first part -->
  <div class="w-100 card border border-danger bg-modalCard">
  <h5 class="mt-3 mr-2 text-center">${detail.description}</h5>
  <div class="d-flex mt-2 justify-content-around gap-1">
  <h6 class="bg-light py-0 px-0 py-md-2 px-md-2 text-success fs-6 border-0 border-md-2 text-center border-light rounded">${(detail.pricing==null)? "Free of Cost": (detail.pricing[0].price==0)? "Free of Cost":(detail.pricing[0].price=="No cost")? "Free of Cost":detail.pricing[0].price}<br>
  ${(detail.pricing==null)? "Basic" : (detail.pricing[0].plan=="Free")?"Basic":detail.pricing[0].plan}</h6>
  <h6 class="bg-light py-0 px-0 py-md-2 px-md-2 text-warning fs-6 border-0 border-md-2 border-light rounded text-center">${(detail.pricing==null)? "Free of Cost":(detail.pricing[1].price=="No cost")? "Free of Cost":detail.pricing[1].price}<br>
  ${detail.pricing==null?"Pro":detail.pricing[1].plan}</h6>
  <h6 class="bg-light  py-0 px-0 py-md-2 px-md-2 fs-6 text-danger border-0 border-md-2 border-light rounded text-center">${(detail.pricing==null)? "Free of Cost":detail.pricing[2].price!="No cost"?detail.pricing[2].price:"Free of cost"}<br>
  ${(detail.pricing==null)? "Enterprise": detail.pricing[2].plan}</h6>
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
  ${(detail.integrations==null)?"No data found": generate(detail.integrations)!=null?generate(detail.integrations): "No data found"}
  </div>
  </div>
  </div>
  <!-- second part -->
  <div class="w-auto card text-center">
  <div class="d-flex position-relative">
  <img src=${detail.image_link[0]} class="img-fluid rounded-start w-auto" alt="...">
  <button class="btn btn-danger position-absolute top-0 end-0 py-1 px-2 position-absolute">${detail.accuracy.score? detail.accuracy.score*100 : 0}% accuracy</button>
  </div>
  <h4 class="mt-2">${(detail.input_output_examples==null)?"Can you give any example?":detail.input_output_examples[0].input!=null? detail.input_output_examples[0].input:"Can you give any example?"}</h4>
  <p class="text-secondary">${(detail.input_output_examples==null)?"No! Not Yet! Take a break!!!":detail.input_output_examples[0].output!=null?detail.input_output_examples[0].output:"No! Not Yet! Take a break!!!"}</p>
  </div>
  `;
        modalBody.appendChild(inModal);

}

const fetchSearchAIData = dataLimit =>{
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => showSearchAIData(data.data.tools));
}
// show sorted data
const showSearchAIData = (data)=>{
  data.sort((a,b)=>new Date(a.published_in)-new Date(b.published_in));
  const showAll = document.getElementById("show-all");
  showAll.textContent = '';
  // if(dataLimit && data.length>6){
  //   data = data.slice(0,6);
  //   showAll.classList.remove('d-none');
    
  // }else{
  //   showAll.classList.add('d-none');
  //   data = data.slice(7,13);
  // }
  const DataContainer = document.getElementById('showAIData');
  DataContainer.textContent = '';
  data.forEach(element => {
    const card = document.createElement("div");
    card.classList.add("col", "p-3","mb-2");
    card.innerHTML = `
        <div class="card h-100">
          <img src=${element.image} class="card-img-top img-fluid rounded-start" alt="...">
          <div class="card-body">
            <h5 class="card-title mt-2">Features</h5>
            <ol class="text-secondary">
            ${generate(element.features)}
  </ol>
          </div>
          <ul class="list-group mx-2">
            <h5 class="mt-2">${element.name}</h5>
            <div class="d-flex justify-content-between">
            <p class="text-secondary"><i class="fa-solid fa-calendar-day"></i></i> ${element.published_in}</p>
            <i class="fas fa-arrow-right" onclick="fetchAiDetail('${element.id}')" style="color:red"  data-bs-toggle="modal"
          data-bs-target="#exampleModal"></i>
            </div>
          </ul>
        </div>
        
        
        `;
    DataContainer.appendChild(card);
  });
  toggleSpinner(false);    
  }


fetchAIData(6);


// onclick="fetchNewsDetail('${_id}')" 