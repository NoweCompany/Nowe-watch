document.addEventListener("DOMContentLoaded", function(){
    const entrar = "nowecompany";

    function handleFormSubmit(event){
        event.preventDefault(); 
        var codigo = document.getElementById("codigo").value; 

        if (codigo === entrar) {
            document.querySelector('.form-container').style.display = 'none';
            document.getElementById('video-container').style.display = 'block';
        } else {
            alert("Código está errado, ou foi inserido de forma errada");
        }
    }

    var form = document.getElementById("form");
    if(form) {
        form.addEventListener("submit", handleFormSubmit); 
    }
});



let videos = {
    "Pé pedal": { type: "youtube", videoId: "dCvdShQp5sQ" },
    "Shopping time": { type: "youtube", videoId: "Hv_ehjM3bJ0" },
    "aniger vlog" : {type: "youtube", videoId: "7eErsF31968"},
    "Dia livre" : {type: "youtube", videoId: "Z8u63PZLwk0"},
    "Shopping Time2" : {type: "youtube", videoId: "NVZW5OwFsHg"},


};


//card 
function initVideoGrid(hashVideos) {
    let grid = document.getElementById('videoGrid');
    grid.innerHTML = "";

    for (let title in hashVideos) {
        let video = hashVideos[title];

        // Nós começaremos com 'col-md-3' para telas maiores
        let col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-lg-4 mt-4'; 


        let videoContent;
        if (video.type === "youtube") {
            videoContent = `
            <div class="embed-responsive embed-responsive-16by9 d-flex justify-content-center align-items-center p-2 m-2">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${video.videoId}" allowfullscreen></iframe>
            </div>`;
        } else {
            videoContent = `
            <div class="embed-responsive embed-responsive-16by9 d-flex justify-content-center align-items-center p-2 m-2">
                <video class="embed-responsive-item" src="${video.path}" controls></video>
            </div>`;
        }

        let card = `
        <div class="card h-100"> 
            ${videoContent}
            <div class="d-flex justify-content-center">
                <hr class="border border-1 opacity-100 w-75 m-0">
            </div>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
            </div>
        </div>
        `;
        col.innerHTML = card;
        grid.appendChild(col);
    }
}

initVideoGrid(videos);
    


//filtro 


function padronizar(video, term) {
    const lowerCaseTitle = video.title.toLowerCase();
    const lowerCaseTerm = term.toLowerCase();
    return lowerCaseTitle.includes(lowerCaseTerm) ? 1 : 0;
}


//algoritimo merge sort
function mergeSort(videos, term) {
    if (videos.length <= 1) {
        return videos;
    }

    const meio = Math.floor(videos.length / 2);
    const esquerda = videos.slice(0, meio);
    const direita = videos.slice(meio);

    return merge(
        mergeSort(esquerda, term), 
        mergeSort(direita, term), 
        term
    );
}

function merge(esquerda, direita, term) {
    let resultArray = [], esquerdaIndex = 0, direitaIndex = 0;

    while (esquerdaIndex < esquerda.length && direitaIndex < direita.length) {
        if (padronizar(esquerda[esquerdaIndex], term) > padronizar(direita[direitaIndex], term)) {
            resultArray.push(esquerda[esquerdaIndex]);
            esquerdaIndex++;
        } else {
            resultArray.push(direita[direitaIndex]);
            direitaIndex++;
        }
    }

    return resultArray
            .concat(esquerda.slice(esquerdaIndex))
            .concat(direita.slice(direitaIndex));
}

document.getElementById('searchBar').addEventListener('input', function(e) {
    let term = e.target.value;
  
    let videosArray = Object.keys(videos).map((title) => {
        return { title: title, ...videos[title] };
    });

    let sortedVideos = mergeSort(videosArray, term);

    let sortedVideosObject = {};
    sortedVideos.forEach(video => {
        sortedVideosObject[video.title] = { type: video.type, videoId: video.videoId, path: video.path };
    });
    initVideoGrid(sortedVideosObject);
});
