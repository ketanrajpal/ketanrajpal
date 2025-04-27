import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Blog, addBlog } from "../reducers/blog";
import sanity from "../services/sanity";
import { Link } from "react-router-dom";

export default function BlogComponent() {
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

  return state.length > 0 ? (
    <section className="experience_component">
      <ul className="timeline-list">
        {state.map((post, index) => (
          <li key={index}>
            <div className="content">
              <Link to={`/blog/${post.slug}`} className="link">
                <span className="material-symbols-rounded">rss_feed</span>
                <span>Read More</span>
              </Link>
              <h2>
                <span>{post.title}</span>
              </h2>
              <p>{post.content[0].children[0].text}</p>
              <div className="technologies">
                {post.categories.map((category, index) => (
                  <span key={index}>{category}</span>
                ))}
              </div>
              <br />
            </div>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <></>
  );
}
