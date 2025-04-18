import React from "react";
import { Rating } from "@mui/material";
import "./Rating.css";
const RatingCard = ({ review }) => {
  return (
    <>
      <div className="_rating-container">
        {review.map((item, i) => (
          <div className="testimonial-box">
            <div className="box-top">
              <div className="profile">
                <div className="profile-img">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
                    alt="user"
                  />
                </div>
                <div className="name-user">
                  <strong>Barry Allen</strong>
                  <span>@barryallen</span>
                </div>
              </div>
              <div className="reviews">
                <Rating name="read-only" value={item.rating} readOnly />
              </div>
            </div>
            <div className="client-comment">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, quaerat quis? Provident temporibus architecto
                asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam
                tenetur voluptates incidunt blanditiis sed atque cumque.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RatingCard;
