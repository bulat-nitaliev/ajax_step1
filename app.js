//constant
const container = document.querySelector(".post-get");
const btnGetPost = document.querySelector(".btn-get-posts");
const btnAddPost = document.querySelector(".btn-add-posts");
const apiUrl = "https://jsonplaceholder.typicode.com/";

//event
btnGetPost.addEventListener("click", (e) => {
  getPost((res) => {
    let fragment = "";
    res.forEach((element) => {
      const elPost = renderPost(element);
      fragment += elPost;
    });
    container.insertAdjacentHTML("afterbegin", fragment);
  });
});

btnAddPost.addEventListener("click", (e) => {
  const newPost = {
    id: 1,
    title: "new post",
    body: "this is new description",
    userId: 1,
  };
  addPost(newPost, (res) => {
    container.insertAdjacentHTML('afterbegin', renderPost(res))
  });
});

//ajax
function getPost(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `${apiUrl}/posts`);
  xhr.addEventListener("load", () => {
    if (xhr.status !== 200) {
      console.log("error", xhr.status);
      return;
    }
    const res = JSON.parse(xhr.responseText);
    cb(res);
  });
  xhr.addEventListener("error", () => {
    console.log("error ");
  });
  xhr.send();
}

function addPost(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${apiUrl}/posts`);
  xhr.addEventListener("load", () => {
    if (xhr.status !== 201) {
      console.log("error", xhr.status);
      return;
    }
    const res = JSON.parse(xhr.responseText);
    cb(res);
  });
  xhr.setRequestHeader("Content-type", "application/json", "charset=UTF-8");
  xhr.addEventListener("error", () => {
    console.log("error ");
  });
  xhr.send(JSON.stringify(body));
}

function renderPost(post) {
  return `
    <div class="card">
        <div class="card-header">
        <h5 class="card-title">${post.title}</h5>
        </div>
        <div class="card-body">
        <p class="card-text">${post.body}</p>
        </div>
    </div>
    `;
}
