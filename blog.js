document.addEventListener("DOMContentLoaded", loadBlogs);

function saveBlog() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  let blogId = document.getElementById("blogId").value;

  if (title.trim() === "" || content.trim() === "") {
    alert("Please fill in both fields");
    return;
  }

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  if (blogId) {
    blogs[blogId] = { title, content };
    document.getElementById("blogId").value = "";
  } else {
    // Add new blog
    blogs.push({ title, content });
  }

  localStorage.setItem("blogs", JSON.stringify(blogs));
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  loadBlogs();
}

function loadBlogs() {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  let container = document.getElementById("blogsContainer");
  container.innerHTML = "";

  blogs.forEach((blog, index) => {
    let div = document.createElement("div");
    div.className = "blog";
    div.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
      <button class="edit" onclick="editBlog(${index})">Edit</button>
      <button class="delete" onclick="deleteBlog(${index})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function editBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  let blog = blogs[index];

  document.getElementById("title").value = blog.title;
  document.getElementById("content").value = blog.content;
  document.getElementById("blogId").value = index;
}

function deleteBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  loadBlogs();
}
