import { auth,app,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider,signOut, signInWithPopup,
  // db,
  // collection,
  
  // collection,
  // addDoc,
  
  
} from "./firebase.js";

let registerBtn = document.getElementById('registerBtn')

let register = ()=>{
  let name = document.getElementById('name')
    let email = document.getElementById('email')
    let password = document.getElementById('password')

    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
   
    const user = userCredential.user;
    console.log("user registered==",user);
    setTimeout(()=>{
      window.location.href = "./homee.html"
    },1000)
    // Swal.fire("Registered!");
    name.value = ""
    email.value = ""
    password.value = ""
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error.message);
  });

}
  

registerBtn.addEventListener("click",register)

let loginBtn = document.getElementById('loginBtn')

let login = ()=>{
    let email = document.getElementById('s-email')
    let password = document.getElementById('s-password')

  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
   
    const user = userCredential.user;
    console.log("login succesfully==",user);
    email.value = ""
    password.value = ""
    setTimeout(()=>{
      window.location.href = "./homee.html"
    },1000)
    
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error.message); 
    Swal.fire("Invalid Email or Password");
  });

}
loginBtn.addEventListener("click",login)


onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    console.log("user exist", user);
    
   
  } else {
     console.log("user not found");
     
  }
});




let logoutBtn = document.querySelector('#logoutBtn'); // Fixed the typo in the selector

let logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User logged out successfully");
      // Optionally, show an alert
      Swal.fire({
        icon: 'success',
        title: 'Logged Out Successfully',
        text: 'You have been logged out.',
      });

      // Redirect to the login page or any other page after logout
      setTimeout(() => {
        window.location.href = "./index.html"; // Change to your login page or home page
      }, 1000);
    })
    .catch((error) => {
      console.log("Error during logout:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: error.message,
      });
    });
};

// Add event listener for the logout button
 logoutBtn.addEventListener("click", logout);


// document.addEventListener('DOMContentLoaded', function() {
//   let logoutBtn = document.querySelector('#logoutBtn');
//   logoutBtn.addEventListener('click', logout);
// });

let googleSignInBtn = document.getElementById("google-sign-in-btn");
if (googleSignInBtn) {
  googleSignInBtn.addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in with Google:", user);
        alert("Google sign-in successful!");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error.message);
        alert("Google sign-in failed. Please try again.");
      });
  });

  
}

const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const displayName = email ? email.replace("@gmail.com", "") : "User";
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = Welcome, {$displayName};

    const logo = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", () => {
      alert("You have been logged out.");
      window.location.href = "index.html"; // Redirect to the login page
    });

     
function fetchBlogs() {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = ""; // Clear existing blogs

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  blogs.forEach((blog, index) => {
    // Remove "@gmail.com" from the author email
    const authorName = blog.author.replace("@gmail.com", "");

    const blogElement = document.createElement("div");
    blogElement.classList.add("post", "mb-4", "p-3", "border", "rounded");

    blogElement.innerHTML = `
      <h3 class="blog-title">${blog.title}</h3>
      <p class="blog-content">${blog.content}</p>
      <small class="text-muted">Posted on ${blog.time} by ${displayName}</small>
      <br>
      <button class="btn btn-warning btn-sm" onclick="editBlog(${index})">Edit</button>
      <button class="btn btn-danger btn-sm" onclick="deleteBlog(${index})">Delete</button>
    `;

    postsContainer.appendChild(blogElement);
  });
}

    // Function to save new or updated blog to localStorage
    function saveBlog(title, content, index = null) {
      let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      const newBlog = {
        title: title,
        content: content,
        time: new Date().toLocaleString(),
        author: displayName
      };

      if (index !== null) {
        blogs[index] = newBlog; // Update existing blog
      } else {
        blogs.push(newBlog); // Add new blog
      }

      localStorage.setItem("blogs", JSON.stringify(blogs));
      alert(index !== null ? "Blog updated successfully!" : "Blog saved successfully!");
      $('#addBlogModal').modal('hide'); // Close modal
      fetchBlogs(); // Re-fetch and display blogs
    }

    // Blog form submission
    document.getElementById("blogForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("blogTitle").value;
      const content = document.getElementById("blogContent").value;

      if (title.trim() === "" || content.trim() === "") {
        alert("Please fill in all fields.");
        return;
      }

      saveBlog(title, content, window.editIndex); // If editIndex is set, it's an update; otherwise, it's new
      document.getElementById("blogForm").reset(); // Reset form
    });

    // Edit a blog
    function editBlog(index) {
      const blogs = JSON.parse(localStorage.getItem("blogs"));
      const blog = blogs[index];
      document.getElementById("blogTitle").value = blog.title;
      document.getElementById("blogContent").value = blog.content;
      window.editIndex = index; // Store index for updating
      $('#addBlogModal').modal('show'); // Show modal
      document.querySelector(".modal-title").textContent = "Edit Blog"; // Change modal title
    }

    // Delete a blog
    function deleteBlog(index) {
      const blogs = JSON.parse(localStorage.getItem("blogs"));
      blogs.splice(index, 1); // Remove blog at index
      localStorage.setItem("blogs", JSON.stringify(blogs));
      alert("Blog deleted successfully!");
      fetchBlogs(); // Re-fetch and display blogs
    }

    // Fetch blogs on page load
    window.onload = fetchBlogs;



    document.getElementById("blogForm").addEventListener("submit", async (e) => {
        e.preventDefault();
      
        // Get title and content from the form
        const title = document.getElementById("blogTitle").value;
        const content = document.getElementById("blogContent").value;
      
        // Check if fields are not empty
        if (title.trim() === "" || content.trim() === "") {
          alert("Please fill in all fields.");
          return;
        }
      
        // Get the currently logged-in user's email
        const user = auth.currentUser;
      
        // If no user is logged in, show an error
        if (!user) {
          alert("You need to log in to create a blog.");
          return;
        }
      
        // Extract the display name from the email (remove "@gmail.com")
        const displayName = user.email.replace("@gmail.com", "");
      //   const displayName = user.email.replace("@gmail.com", "");
      
        // Log for debugging
        console.log("Display Name: ", displayName);
        console.log("User Email: ", user.email);
        try {
          // Save blog to Firestore "blog" collection
          const blogRef = collection(db, "blogs");
          await addDoc(blogRef, {
            title: title,
            content: content,
            createdAt: new Date(),
            author: authorName // Store the display name without "@gmail.com"
          });
      
          alert("Blog saved successfully!");
      
          // Close the modal
          $('#addBlogModal').modal('hide');
      
          // Reset the form fields
          document.getElementById("blogForm").reset();
        } catch (error) {
          console.error("Error adding document: ", error);
          alert("Failed to save blog. Please try again.");
        }
      });
