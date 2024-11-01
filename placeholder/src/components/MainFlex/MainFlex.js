import React from "react";

function MainFlex() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Bad response: ",
            response.status);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="main-wrapper">
      <h1>Posts</h1>
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MainFlex;
`.main-wrapper {
  /* flex: 1 1 300px; */
  display: flex;
  flex-direction: column;
  justify-content: center; /* flex-end, space-between… */
  align-items: center; /* flex-end, baseline… */  
  min-height: 100vh; /* takes full viewport height */
}`
