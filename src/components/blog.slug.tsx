import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Blog, addBlog } from "../reducers/blog";
import sanity from "../services/sanity";

export default function BlogSlugComponent() {
  const { slug } = useParams();

  const state = useAppSelector(Blog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.length > 0) return;

    sanity
      .fetch(
        `*[_type == "post"] {
            title,
            "slug":slug.current,
            content,
            "categories": category[]->name,
        }`
      )
      .then((data) => {
        console.log(data);
        dispatch(addBlog(data));
      })
      .catch(console.error);
  }, [state.length, dispatch]);

  return state.find((post) => post.slug === slug) ? (
    <section className="blog_component">
      <h2>{state.find((post) => post.slug === slug)?.title}</h2>
      <div className="post">
        {state
          .filter((post) => post.slug === slug)
          .map((post, index) => (
            <div className="post" key={index}>
              {post.content.map((content, index) => (
                <p className="spaced" key={index}>
                  {content.children[0].text}
                </p>
              ))}
              <div className="categories">
                {post.categories.map((category, index) => (
                  <span key={index} className="category">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>

      <section className="blog_component">
        <h2>Discover more captivating reads!</h2>
        <div className="other_posts">
          {state
            .filter((s) => s.slug !== slug)
            .slice(0, 2)
            .map((post, index) => (
              <div className="post" key={index}>
                <Link to={`/blog/${post.slug}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.content[0].children[0].text.substring(0, 200)}...</p>
                <div className="categories">
                  {post.categories.map((category, index) => (
                    <span key={index} className="category">
                      {category}
                    </span>
                  ))}
                  <Link to={`/blog/${post.slug}`} className="link">
                    <span className="material-symbols-rounded">rss_feed</span>
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </section>
  ) : (
    <></>
  );
}
