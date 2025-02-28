import PropTypes from 'prop-types';
const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  
    return <p><strong>Total exercises: {totalExercises}</strong></p>;
 };
  

  Total.propTypes = {
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        exercises: PropTypes.number.isRequired
      })
    ).isRequired
  };
  export default Total;
  