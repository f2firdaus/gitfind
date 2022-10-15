import { useEffect, useState } from "react";
import Details from "./components/Details";
import Followerlist from "./components/Followerlist";
import Followinglist from "./components/Followinglist";
import Footer from "./components/Footer";
import RepoList from "./components/RepoList";
import Search from "./components/Search";
import { github } from "./Utils";

function App() {
  const [detail, setDetail] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [username, setUsername] = useState("");
  const [successfull, setSuccessful] = useState(true);
  const [followingList, setFollowinglist] = useState([]);
  const [visibleComponent, setvisibleComponent] = useState(2);

  useEffect(
    (_) => {
      setDetail({});
      setSuccessful(true);
      if (username === "") {
        return;
      }
      (async (_) => {
        try {
          const response = await github.get(`/${username}`);
          setDetail(response.data);
        } catch (e) {
          setSuccessful(false);
        }
      })();
    },
    [username]
  );
  useEffect(
    (_) => {
      setFollowinglist([]);
      if (username === "") {
        return;
      }
      (async (_) => {
        const response = await github.get(`/${username}/following`);
        setFollowinglist(response.data);
      })();
    },
    [username]
  );

  useEffect(
    (_) => {
      setRepoList([]);
      if (username === "") {
        return;
      }
      (async (_) => {
        const response = await github.get(`/${username}/repos`);
        setRepoList(response.data);
      })();
    },
    [username]
  );

  useEffect(() => {
    setFollowerList([])
    if (username === "") {
      return;
    }
    (async () => {
      const response = await github.get(`/${username}/followers`);
      setFollowerList(response.data);
    })();
  }, [username]);

  const searchUsername = (keyword) => {
    setUsername(keyword);
  };
  const showLoadMore = () => {
    if (visibleComponent === 1) {
      if (followerList.length === detail.followers) {
        return false;
      } else {
        return true;
      }
    } else if (visibleComponent === 2) {
      if (repoList.length === detail.public_repos) {
        return false;
      } else {
        return true;
      }
    } else {
      if (followingList.length === detail.following) {
        return false;
      } else {
        return true;
      }
    }
  }
  const loadMoreData = async _ => {
    if (visibleComponent === 1) {
      const currentPages = Math.ceil(followerList.length / 30);
      const nextPage = currentPages + 1;
      const response = await github.get(`/${username}/followers?page=${nextPage}`);

      const list = response.data;

      setFollowerList((currentList => {
        const newList = [...currentList, ...list];
        return newList;
      }))

    } else if (visibleComponent === 2) {
      const currentPages = Math.ceil(repoList.length / 30);
      const nextPage = currentPages + 1;
      const response = await github.get(`/${username}/repos?page=${nextPage}`);

      const list = response.data;

      setRepoList((currentList => {
        const newList = [...currentList, ...list];
        return newList;
      }))


    } else {
      const currentPages = Math.ceil(repoList.length / 30);
      const nextPage = currentPages + 1;
      const response = await github.get(`/${username}/repos?page=${nextPage}`);

      const list = response.data;

      setFollowinglist((currentList => {
        const newList = [...currentList, ...list];
        return newList;
      }))
    }
  }

  return (
    <main>
      <Search searchUsername={searchUsername} successfull={successfull} />
      {detail.id === undefined ? (
        false
      ) : (
        <>
          <Details data={detail} changeVisible={setvisibleComponent} visibleComponent = { visibleComponent } />
            { visibleComponent === 1 ? (
            <Followerlist data={followerList} />
          ) : (
            visibleComponent === 2 ? (
              <RepoList data={repoList} />
            ) : (
              <Followinglist data={followingList} />
            )
      )}
          {showLoadMore() === true ? (
            <div className="card load-more">
              <button onClick={loadMoreData}>Load More</button>
            </div>
          ) : (false)}
        </>
      )}
      <Footer />
    </main>
  );
}

export default App;
