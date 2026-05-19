import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogCards.css";
import BASE_URL from '../Config';



const PostDetail = () => {
  const { id, slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/posts/${id}/${slug}/`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="post-div">
      {/* Post Title */}
      <div>
        <h2 className="post-title-main">{post.title}</h2>
      </div>

       <section class="article-meta-post">
        
     
        <div class="red-bar-post"></div>

      
        <div class="timestamp-post">
            <span>10 HR AGO</span>
         
        </div>

     
        <div class="authors-post">
            By Chris Lau, Rae Wang
        </div>

    </section>




      {/* Main Image */}
      {post.mainImage && (
        <div className="image-wrapper">
          <img
            className="post-image-main"
            src={post.mainImage}
            alt={post.title}
            loading="lazy"
          />
        </div>
      )}

      {/* Content Grid */}
      <div className="post-detail-main">
        <div></div>

        {/* Middle Column */}
        <div>
          {post.contents?.map((item) => (
            <React.Fragment key={item.id}>
              {/* HTML Content */}
              {item.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
              )}

              {/* Content Image */}
              {item.contentImage && (
                <div className="image-wrapper">
                  <img
                    className="post-image-main"
                    src={item.contentImage}
                    alt="Post content"
                    loading="lazy"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default PostDetail;










// import React from "react";
// import "./BlogCards.css";




// const PostDetail = () => {
//     return (
//         <div className="post-div">

//             <div>

//                  <h2 className="post-title-main">fdhhtgh</h2>
//             </div>

//         <div className="image-wrapper" >
//           <img
//             className="post-image-main"
//             src="https://picsum.photos/seed/scotus/600/450"
//             alt="alt"
//             loading="lazy"
//           />
//         </div>

//             <div className="post-detail-main">
//                 <div></div>
//                 <div>
//                     <p>ggggggggggggggggggkg 44rttyyyyy</p>
//                     <p>ggggggggggggggggggkg 44rttyyyyy</p>
//                     <p>ggggggggggggggggggkg 44rttyyyyy</p>
//                 </div>
//                 <div></div>
//             </div>




//         </div>

//     );

// };


// export default PostDetail;



