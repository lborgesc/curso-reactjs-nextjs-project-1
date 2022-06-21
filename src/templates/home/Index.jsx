import { useCallback, useEffect, useState } from "react";
import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";


export const Home = ( ) => {
  const [ posts, setPosts ] = useState([])
  const [ allPosts, setAllPosts ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ postsPerPage] = useState(10)
  const [ searchValue, setSearchValue ] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
  ? allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  : posts;

  const HandleLoadPosts = useCallback ( async ( page, postsPerPage ) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, []);

  useEffect( ( ) => {
    HandleLoadPosts( 0, postsPerPage );
  }, [ HandleLoadPosts, postsPerPage ])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nexPosts);

    setPosts(posts)
    setPage(nexPosts)
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  };

  return (
    <section className="container">
      <div className="search-container">
        {searchValue && (
          <>
            <h1>Search value: {searchValue} </h1> <br />
          </>
        )}

        <Input
          onChange={handleChange} value={searchValue}
        />
      </div>
      
      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts =(</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}
