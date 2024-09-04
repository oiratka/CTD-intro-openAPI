fetch('https://api.github.com/users/oiratka/repos')
.then(response => response.json())
.then(repositories =>{
    console.log(repositories)
    const projectSection = document.getElementById('project');
    const projectList = projectSection.querySelector('#listOfProjects');
    for (let i = 0; i < repositories.length; i++){
        let project = document.createElement('li');
        project.innerText = repositories[i].name;
        projectList.appendChild(project)
    }
})
.catch(err => console.log(err))

fetch("https://www.swapi.tech/api/species")
.then(res => res.json())
.then(data => {console.log(data)
const starWarsSection = document.getElementById('starWarsAPI');
const starWarsList = starWarsSection.querySelector('#people');
for (let i = 0; i < data.results.length; i++){
    let starWarsAPI = document.createElement('li');
    starWarsAPI.innerText = data.results[i].name;
    starWarsList.appendChild(starWarsAPI);
}
})
.catch(err => console.log(err));