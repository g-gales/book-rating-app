import { BsFillStarFill } from "react-icons/bs";
import "./BookRating.scss";

function BookRating({ rating }) {
  return (
    <div className="book-rating">
      {Array.from({ length: 5 }, (_, i) => (
        <BsFillStarFill
          key={i}
          color={i < rating ? "#55634e" : "#fafafa"}
          className="star"
        />
      ))}
    </div>
  );
}

export default BookRating;
