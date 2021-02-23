import React, { PureComponent } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import externals from "../../config";
import { Link } from "react-router-dom";

function Timeline() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();
  const [post, setPost] = useState([]);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState();

  let Email = localStorage.getItem("email");
  // console.log('email here is ',Email)
  // console.log(externals.serverUrl)
  const base_URL = externals.serverUrl;
  // console.log(base_URL)
  // console.log()
  useEffect(() => {
    axios.get(`${base_URL}/Login`).then((response) => {
      console.log(response.data);
      setPost(response.data);
    });
  }, [value]);
  useEffect(() => {
    // console.log(count)
  }, [count]);

  const FSumit = (event) => {
    event.preventDefault();
    let formData = new FormData(); //formdata object
    let today = new Date().toLocaleDateString();
    let date = new Date();
    let time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // console.log('time now is ',time)
    formData.append("Description", title); //append the values with key, value pair
    formData.append("Category", category);
    formData.append("file_name", file);
    formData.append("Created_At", today);
    formData.append("Creation_Time", time);
    formData.append("Email", Email);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post(`${base_URL}/Image`, formData, config)
      .then((response) => {
        // console.log(response);
        setValue(value + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showForm1 = () => {
    setShowForm(!showForm);
  };
  const Like_Clicked = (id) => {
    // console.log(Email,'This is the recieved email')

    axios
      .post(`${base_URL}/Liked`, { email: Email, id: id })
      .then((response) => {
        console.log(response.data);
        setCount(response.data);
        // window.location.reload(false);
      });
  };

  return (
    <div>
      <div className="content">
        <div className="content_rgt">
          <div className="rght_btn">
            {" "}
            <span className="rght_btn_icon">
              <img src="/images/btn_iconb.png" alt="up" />
            </span>{" "}
            <span className="btn_sep">
              <img src="/images/btn_sep.png" alt="sep" />
            </span>{" "}
            <a href="#" onClick={showForm1}>
              Upload Post
            </a>{" "}
          </div>

          {showForm && (
            <form onSubmit={FSumit}>
              Description:-
              <input
                type="text"
                name="Description"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
              <br />
              Category : -
              <input
                type="text"
                name="Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                required
              />
              <br />
              File:-
              <input
                type="file"
                name="file_name"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                required
              />{" "}
              <br></br>
              <input type="submit" required />
            </form>
          )}
          <div className="rght_btn">
            {" "}
            <span className="rght_btn_icon">
              <img src="/images/btn_icona.png" alt="up" />
            </span>{" "}
            <span className="btn_sep">
              <img src="/images/btn_sep.png" alt="sep" />
            </span>{" "}
            <a href="#">Invite Friends</a>{" "}
          </div>
          <div className="rght_cate">
            <div className="rght_cate_hd" id="rght_cat_bg">
              Categories
            </div>
            <div className="rght_list">
              <ul>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="/images/icon_01.png" alt="up" />
                    </span>{" "}
                    CATS
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="/images/icon_02.png" alt="up" />
                    </span>{" "}
                    Dogs
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="/images/icon_03.png" alt="up" />
                    </span>{" "}
                    Birds
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="/images/icon_04.png" alt="up" />
                    </span>{" "}
                    Rabbit
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="list_icon">
                      <img src="/images/icon_05.png" alt="up" />
                    </span>{" "}
                    Others
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rght_cate">
            <div className="rght_cate_hd" id="opn_cat_bg">
              Featured
            </div>
            <div className="sub_dwn">
              <div className="feat_sec">
                <div className="feat_sec_img">
                  <img src="/images/feat_img1.png" alt="image" />
                </div>
                <div className="feat_txt">Lorem Ipusum Text</div>
              </div>
              <div className="feat_sec">
                <div className="feat_sec_img">
                  <img src="/images/feat_img2.png" alt="image" />
                </div>
                <div className="feat_txt">Lorem Ipusum Text</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Dogs</div>
                </div>
              </div>
              <div className="feat_sec">
                <div className="feat_sec_img">
                  <img src="/images/feat_img3.png" alt="image" />
                </div>
                <div className="feat_txt">Lorem Ipusum Text</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Rabbits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content_lft">
          <div className="contnt_1">
            <div className="list_1">
              <ul>
                <li>
                  <input type="checkbox" className="chk_bx" />
                  Friends
                </li>
                <li>
                  <input type="checkbox" className="chk_bx" />
                  Flaged
                </li>
              </ul>
            </div>
            <div className="timeline_div">
              <div className="timeline_div1">
                <div className="profile_pic">
                  <img src="/images/timeline_img1.png" />
                  <div className="profile_text">
                    <a href="#">Change Profile Pic</a>
                  </div>
                </div>
                <div className="profile_info">
                  <div className="edit_div">
                    <a href="#">
                      Edit <img src="/images/timeline_img.png" />
                    </a>
                  </div>
                  <div className="profile_form">
                    <ul>
                      <li>
                        <div className="div_name1">Name :</div>
                        <div className="div_name2">Stefiney Gibbs</div>
                      </li>
                      <li>
                        <div className="div_name1">Sex :</div>
                        <div className="div_name2">Female</div>
                      </li>
                      <li>
                        <div className="div_name1">Description :</div>
                        <div className="div_name3">
                          This is an example of a comment. You can create as
                          many comments like this one or sub comments as you
                          like and manage all of your content inside Account.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="timeline_div2">
                <ul>
                  <li>
                    <a href="#" className="active">
                      Timeline{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">About </a>
                  </li>
                  <li>
                    <a href="#">Album</a>
                  </li>
                  <li>
                    <a href="#"> Pets</a>
                  </li>
                  <li>
                    <a href="#">My Uploads </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="contnt_2">
            {post.map((item) => {
              let name = item._id;
              return (
                <div className="div_a">
                  <div className="div_title">{item.Description}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{item.Category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft">
                      <img src="/images/img_6.png" />
                      Steave Waugh
                    </div>
                    <div className="div_top_rgt">
                      <span className="span_date">{item.Created_At}</span>
                      <span className="span_time">{item.Creation_Time}</span>
                    </div>
                  </div>
                  <Link to={`/Timeline/${name}`}>
                    <div className="div_image">
                      <img
                        src={`http://localhost:8888/${item.file_name}`}
                        alt="pet"
                      />
                    </div>
                  </Link>

                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="/images/icon_001.png" alt="share" />
                            </span>
                            Share
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="/images/icon_002.png" alt="share" />
                            </span>
                            Flag
                          </a>
                        </li>
                        <li
                          onClick={(evnt) => {
                            Like_Clicked(name);
                          }}
                        >
                          <a>
                            <span className="btn_icon">
                              <img src="/images/icon_003.png" alt="share" />
                            </span>
                            {count} Likes
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="/images/icon_004.png" alt="share" />
                            </span>
                            {item.Login} Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Timeline;
