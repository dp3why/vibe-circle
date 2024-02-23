import React, { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import SearchBar from "../searchbar/SearchBar";
import "./Home.css";
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../../constants";
import axios from "axios";
import PhotoGallery from "../photogallery/PhotoGallery";
import CreatePostButton from "../createpost/CreatePostButton";
import "yet-another-react-lightbox/plugins/captions.css";

const { TabPane } = Tabs;
const Home = ({ isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("image");
  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    keyword: "",
  });
  useEffect(() => {
    fetchPost(searchOption);
  }, [searchOption]);

  const fetchPost = (option) => {
    const { type, keyword } = option;
    let url = "";
    if (type === SEARCH_KEY.all) {
      url = `${BASE_URL}/search`;
    } else if (type === SEARCH_KEY.user) {
      url = `${BASE_URL}/search?user=${keyword}`;
    } else {
      url = `${BASE_URL}/search?keyword=${keyword}`;
    }
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    const opt = {
      method: "GET",
      url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      },
    };
    axios(opt)
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
      })
      .catch((err) => {
        console.log("fetch post failed:", err.message);
        message.error("fetch post failed");
      });
  };
  useEffect(() => {
    console.log("in effect", searchOption);
    // do search the first time -> didMount -> search: {type: all, value: ''}
    // after the first search -> didUpdate -> search: {type: keyword / user, value: value}
    // eslint-disable-next-line
    const { type, keyword } = searchOption;
    fetchPost(searchOption); // fetchPost when: did mount, click all, click search button
  }, [searchOption]); // change searchOption when: click all, or click search button

  // =======================
  const renderPosts = (type) => {
    if (!posts || posts.length === 0) {
      return <div>No data</div>;
    }
    if (type === "image") {
      const imageArr = posts
        .filter((item) => item.type === "image")
        .map((image) => {
          return {
            postId: image.id,
            src: image.url,
            user: image.user,
            caption: image.message,
            thumbnail: image.url,
            thumbnailWidth: 400,
            thumbnailHeight: 300,
          };
        });
      return <PhotoGallery images={imageArr} />;
    }
    if (type === "video") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {posts
            .filter((item) => item.type === "video")
            .map((video) => (
              <div
                style={{
                  margin: "2em",
                }}
                key={video.url}
              >
                <video
                  src={video.url}
                  controls={true}
                  className="video-block"
                  style={{ maxWidth: "800px" }}
                />
                <p>
                  {video.user}: {video.message}
                </p>
              </div>
            ))}
        </div>
      );
    }
  };

  const handleSearch = (opt) => {
    // trigger useEffect.
    const { type, keyword } = opt;
    setSearchOption({ type: type, keyword: keyword });
  };

  const onShowPost = (tab) => {
    // auto rerender after an uploading.
    setActiveTab(tab);
    setTimeout(() => {
      setSearchOption((prevState) => {
        return prevState;
      });
    }, 1000);
  };

  const operations = (
    <CreatePostButton isLoggedIn={isLoggedIn} onShowPost={onShowPost} />
  );

  return (
    <div className="home">
      <SearchBar handleSearch={handleSearch} />
      <div className="display">
        <Tabs
          onChange={(key) => setActiveTab(key)}
          defaultActiveKey="image"
          activeKey={activeTab}
          // === button ===
          tabBarExtraContent={operations}
        >
          <TabPane tab="Images" key="image">
            {renderPosts("image")}
          </TabPane>
          <TabPane tab="Videos" key="video">
            {renderPosts("video")}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
