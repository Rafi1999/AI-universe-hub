const fetchAIData = () =>{
  
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => ShowAIData(data.data.tools))
}

const ShowAIData = (data) =>{
    const DataContainer = document.getElementById('showAIData');
    data = data.slice(0,6);
    data.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("card","w-25","p-3","col");
        card.innerHTML = `
        <img src=${element.image} class="card-img-top img-fluid rounded-start" alt="...">
        <div class="card-body">
          <h5 class="card-title mt-2">Features</h5>
          <ol class="text-secondary">
  <li>${element.features ? element.features[0] : "Not Available"}</li>
  <li>${element.features ? element.features[1] : "Not Available"}</li>
  <li>${element.features ? element.features[2] : "Not Available"}</li>
</ol>
        </div>
        
        
        
        `;
        DataContainer.appendChild(card);
    });
}




fetchAIData();


// onclick="fetchNewsDetail('${_id}')" 