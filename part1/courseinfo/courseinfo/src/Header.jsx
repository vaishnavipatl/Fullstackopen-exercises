import PropTypes from 'prop-types';
import Content from "./Content"
import Total from "./Total"

const Header = ({ course }) => {
  console.log("Course Data:", course); // Debugging log

  return (
    <div>
      {course.length > 0 ? (
        course.map((courseItem) => (
         <>
          <h2 key={courseItem.id}>{courseItem.name}</h2>
          <Content parts={courseItem.parts} />
          <Total parts={courseItem.parts} /> 
        </>
        ))
      ) : (
        <p>No courses available</p>
      )}
      

    </div>
  );
};

Header.propTypes = {
  course: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      parts: PropTypes.array.isRequired
    })
  ).isRequired,
};

export default Header;
