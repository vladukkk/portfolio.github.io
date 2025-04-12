
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bg-canvas').appendChild(renderer.domElement);
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
const light = new THREE.PointLight(0xffffff , 1, 100);
light.position.set(15, 15, 10);
scene.add(light);

camera.position.z = 8;
let targetZ = 4;
let zoomSpeed = 0.1;

function animateZoom() {
    if (camera.position.z > targetZ) {
        camera.position.z -= zoomSpeed;
        if (camera.position.z < targetZ) {
            camera.position.z = targetZ;
        }
        requestAnimationFrame(animateZoom);
    }
}

animateZoom();

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('models/projects.json')
          .then(res => res.json())
          .then(data => {
            const container = document.getElementById('proj-cont');
        
            data.forEach(project => {
                const row = document.createElement('div');
                row.className = 'row mb-5 mt-5';
            
                const techStack = project.technologies.map(tech => `<span class="badge bg-secondary me-1 fs-6">${tech}</span>`).join(' ');

                const refs = project.id === 4
                    ? `
                    <a href="${project.link}" class="btn btn-dark mt-3">View MVC</a>
                    <a href="https://github.com/vladukkk/Taskly_API/tree/dev" class="btn btn-dark mt-3">View API</a>
                    `
                    : `
                    <a href="${project.link}" class="btn btn-dark mt-3">View on GitHub</a>
                    `;


                row.innerHTML = `
                    <div class="col-md-5 d-flex align-items-center">
                        <img src="${project.image}" class="img-fluid rounded shadow" alt="${project.title}">
                    </div>
                    <div class="col-md-7 d-flex">
                        <div class="card-body d-flex flex-column justify-content-between w-100">
                        <div>
                            <div class="d-flex align-items-center gap-2">
                                <span class="badge bg-secondary my-2 fs-6">${project.teamtype}</span>
                                <h5 class="card-text text-body-secondary">${project.date}</h5>
                            </div>
                            <h4 class="card-title">${project.title} <small class="text-muted">${project.type}</small></h4>
                            <p class="card-text text-body-secondary">${project.description}</p>
                        </div>
                        <div class="mt-2">
                            <h5 class="card-text text-body-secondary"><strong>Tech Stack:</strong> ${techStack}</h5>
                            ${refs}
                        </div>
                        </div>
                    </div>
                `;

              container.appendChild(row);
            });
          })
          .catch(err => console.error('Failed to load projects:', err));
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('models/learning.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('learning-list');
    
        data.forEach(learning => {
            const li = document.createElement('li');
            li.className = 'list-group-item';

            li.innerHTML = `📌${learning.title}`;

            container.appendChild(li);
        });
    })
    .catch(err => console.error('Failed to load learning:', err));
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('models/skills.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('skills-container');
        
        const row = document.createElement('div');
        row.className = 'row text-center';

        data.forEach((skill, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';

            col.innerHTML = `
                <div class="skill-box p-4 shadow rounded bg-white">
                    <img src="${skill.image}" alt="${skill.title}" class="mb-3" style="width: 50px;">
                    <h5>${skill.title}</h5>
                    <p>${skill.description}</p>
                </div>
            `;

            row.appendChild(col);
        });

        container.appendChild(row);
    })
    .catch(err => console.error('Failed to load skills:', err));
});
