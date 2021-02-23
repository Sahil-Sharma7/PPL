import React, { useState , useEffect } from 'react';

import axios from 'axios';
import externals from '../../config';

function Single_Post (props) {
          const [dataRecieved,setDataRecieved] = useState([{}])
          const [count,setCount] = useState()
          const [comment , setComment] = useState()
          
          let Email = localStorage.getItem('email');
          const base_URL = externals.serverUrl
          let data ={
            id : props.match.params.Number
          }
          useEffect(() => {        
            axios.post(`${base_URL}/Image_Detail`,data).then((response) => {
              setDataRecieved(response.data)
            })
        }, [])
        
        
        const Like_Clicked = (id) =>{
          console.log(Email,'This is the recieved email',id,'id recieved here')
          
          axios.post(`${base_URL}/Liked`,{'email' : Email,'id' : id}).then((response) => {
            console.log(response.data)
            setCount(response.data)
            
          })
        }
        const Comment_Typed = (event) => {
          
          setComment(event.target.value)
        
        }
        
        const Comment_Sumitted = () => {
          console.log('You requested fro a comment')
          console.log(comment)
          axios.post(`${base_URL}/Commented`,{'email': Email , 'id' : dataRecieved._id,'comment' : comment}).then((res) => {
            window.location.reload(false);
        })}

    return (
        <div>
         
        
         {/* {console.log(dataRecieved.Comment)} */}
        
        <div className="content">
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div className="rght_list">
                  <ul>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_01.png" alt="up" /></span> CATS</a></li>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_02.png" alt="up" /></span> Dogs</a></li>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_03.png" alt="up" /></span> Birds</a></li>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                    <li><a href="#"><span className="list_icon"><img src="/images/icon_05.png" alt="up" /></span> Others</a></li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="/images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="/images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">{dataRecieved.Description}</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">{dataRecieved.Category}</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="/images/img_6.png" />Steave Waugh</div>
                    <div className="div_top_rgt"><span className="span_date">{dataRecieved.Created_At}</span><span className="span_time">{dataRecieved.Creation_Time}</span></div>
                  </div>
                  <div className="div_image"><img src={`${base_URL}/${dataRecieved.file_name}`} alt="pet" /></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                        {console.log(dataRecieved._id)}
                        <li onClick={(evnt) => {Like_Clicked(dataRecieved._id)}}><a ><span  className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{count} Likes</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
              
          
            <ul>
            
            {dataRecieved.Comment&&
        dataRecieved.Comment.map(element => {
          return(
          // console.log(element)
          <li>
                  <div>
                    <div className="list_image">
                      <div className="image_sec"><img src="/images/post_img.png" /></div>
                      <div className="image_name">{element.Name}</div>
                    </div>
                    <div className="list_info">
                      {element.Text}
                    </div>
                    <input type="button" defaultValue="Reply" className="black_btn" />
                    <br/>
                    </div>
                    </li>
                 )
        })}
                  <li>
                  <div className="cmnt_div">
                      <input type="text" onChange = {Comment_Typed}  className="cmnt_bx" />
                      <input type="submit" onClick = {Comment_Sumitted} className="sub_bttn" defaultValue="Submit Comment" />
                    </div>
                  
                  </li>
                </ul>
            
          
          
        
                
                <div className="view_div"><a href="#">View more</a></div>
              </div>
            </div>
          </div>
          <div className="clear" />
        
        
      </div>

    )
}
export default Single_Post;