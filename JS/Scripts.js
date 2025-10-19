let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts() {
    let feed = document.getElementById("feed");
    if (!feed) return;
    feed.innerHTML = "";

    posts.forEach((postData, index) => {
        let post = document.createElement("div");
        post.classList.add("post");

        post.innerHTML = `
            <p><strong>Usuario</strong> - ${postData.date}</p>
            <p>${postData.text}</p>
            <div class="post-content"></div>
            <button class="likeBtn">👍 Me gusta</button> <span class="likes">${postData.likes}</span>
            <button class="commentBtn">💬 Comentar</button>
            <div class="comments"></div>
        `;

        // Imagen
        if (postData.image) {
            let imgElement = `<img src="${postData.image}" style="max-width:200px;">`;
            post.querySelector(".post-content").innerHTML = imgElement;
        }

        // Comentarios
        let commentsDiv = post.querySelector(".comments");
        postData.comments.forEach(c => {
            let comment = document.createElement("p");
            comment.textContent = "💬 " + c;
            commentsDiv.appendChild(comment);
        });

        // Like
        let likeBtn = post.querySelector(".likeBtn");
        let likeCount = post.querySelector(".likes");
        likeBtn.addEventListener("click", () => {
            posts[index].likes++;
            likeCount.textContent = posts[index].likes;
            savePosts();
        });

        // Comentarios
        let commentBtn = post.querySelector(".commentBtn");
        commentBtn.addEventListener("click", () => {
            let commentText = prompt("Escribe tu comentario:");
            if (commentText) {
                posts[index].comments.push(commentText);
                savePosts();
                renderPosts();
            }
        });

        feed.prepend(post);
    });
}

function showTab(tab) {
    let content = document.getElementById("tab-content");

    if (tab === "muro") {
        content.innerHTML = `
            <h2>Muro</h2>
            <textarea id="postText" placeholder="Escribe algo..."></textarea><br>
            <input type="file" id="postImage" accept="image/*"><br><br>
            <button id="publishBtn">Publicar</button>
            <div id="feed"></div>
        `;

        renderPosts();

        document.getElementById("publishBtn").addEventListener("click", () => {
            let text = document.getElementById("postText").value;
            let imageFile = document.getElementById("postImage").files[0];

            if (text.trim() === "" && !imageFile) {
                alert("Escribe algo o selecciona una imagen");
                return;
            }

            let newPost = {
                text: text,
                image: null,
                date: new Date().toLocaleDateString(),
                likes: 0,
                comments: []
            };

            if (imageFile) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    newPost.image = e.target.result;
                    posts.push(newPost);
                    savePosts();
                    renderPosts();
                };
                reader.readAsDataURL(imageFile);
            } else {
                posts.push(newPost);
                savePosts();
                renderPosts();
            }

            document.getElementById("postText").value = "";
            document.getElementById("postImage").value = "";
        });
    }

    else if (tab === "info") {
        content.innerHTML = `
            <h2>Info</h2>
            <p>Email: Horcus@krueesposrts.com</p>
            <p>Teléfono: 3152633175</p>
            <p>Intereses: Programación, Voleibol, Kru Esports</p>
            <p>Situación sentimental: Casado</p>
        `;
    }

    else if (tab === "photos") {
        content.innerHTML = `
            <h2>Photos</h2>
            <div class="photos-grid" id="photos-storage">
                <!-- Fotos fijas -->
                <img src="Assets/Metallica.jpeg" alt="Foto 1">
                <img src="Assets/Omen.jpeg" alt="Foto 2">
                <img src="Assets/descarga.jpeg" alt="Foto 3">
                <img src="Assets/solo leveling Arise.jpeg" alt="Foto 4">
                <img src="Assets/Pirlo 4_20 la rata.jpeg" alt="Foto 5">
                <img src="Assets/Tokio.jpeg" alt="Foto 6">
            </div>
        `;

        // 🔥 Agregar fotos dinámicas desde los posts
        let photosSection = document.getElementById("photos-storage");
        posts.forEach(post => {
            if (post.image) {
                let photo = document.createElement("img");
                photo.src = post.image;
                photo.alt = "Foto publicada";
                photo.style.maxWidth = "100px";
                photosSection.appendChild(photo);
            }
        });
    }

    else if (tab === "boxes") {
        content.innerHTML = `
            <h2>Boxes</h2>
            <p>Aquí van otros módulos o widgets personalizados.</p>
        `;
    }
}

// Mostrar "Muro" por defecto
window.onload = () => showTab("muro");

