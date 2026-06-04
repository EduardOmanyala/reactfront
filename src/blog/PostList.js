import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogCards.css";
import BASE_URL from '../Config';



const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      <div className="card-grid-blogpage">
        {posts.map((post) => (
          <article className="card-blogpage" key={post.id}>
            <Link
              to={`/posts/${post.id}/${post.slug}`}
              className="card-link-blogpage"
            >
              {/* Image */}
              {post.mainImage && (
                <div className="card-image-wrapper-blogpage">
                  <img
                    className="card-image-blogpage"
                    src={post.mainImage}
                    alt={post.title}
                    loading="lazy"
                  />
                </div>
              )}

              {/* Card Body */}
              <div className="card-body-blogpage">
                {/* Category */}
                <p className="card-category-blogpage">
                  {post.category}
                </p>

                {/* Title */}
                <h2 className="card-title-blogpage">
                  {post.title}
                </h2>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostList;
