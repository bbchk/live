import s from "./star-rating.module.scss";

// import styled from "styled-components";

// const StyledStarRating = styled.div`
//   i {
//     font-size: ${({ fontSize }) => `${fontSize}rem`};
//   }
//   p {
//     display: ${({ named }) => {
//       return named ? "block" : "none";
//     }};
//     white-space: nowrap;

//     font-size: ${({ fontSize }) => `${fontSize / 3}rem`};
//   }
//   color: ${({ color }) => color};
//   display: flex;
//   gap: ${({ gap }) => `${gap}rem`};
// `;

const StarRating = ({ score, fontSize, named, gap }) => {
  //   fontSize = fontSize?.replace(/[^0-9.]/g, "");
  //   gap = gap?.replace(/[^0-9.]/g, "");

  //   const stars =
  //   ["Bad", "Not Bad", "Ok", "Good", "Wonderful"].forEach((scoreName, index) => {
  //     stars.push(
  //       <div className="icon-link d-flex flex-column" key={index}>
  //         <i
  //           className={`bi bi-star-fill ${score > 0 ? s.checked : ""} ${s.star}`}
  //         ></i>
  //         <p>{scoreName}</p>
  //       </div>
  //     );
  //     --score;
  //   });

  return (
    // <StyledStarRating
    //   fontSize={fontSize}
    //   gap={gap}
    //   named={named}
    //   className={`${s.star_rating}`}
    // >
    //   {stars}
    // </StyledStarRating>
    <></>
  );
};

export default StarRating;
