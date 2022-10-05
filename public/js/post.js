const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();

  const post_content = document.querySelector("#post-content").value.trim();

  if (title && post_content) {
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ title, post_content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(title);
    console.log(post_content);
    if (response.ok) {
      // document.location.replace("/");
    } else {
      alert("Failed to create post");
    }
  }
};

document.querySelector(".new-post").addEventListener("submit", newPostHandler);
