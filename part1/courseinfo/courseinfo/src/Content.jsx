import PropTypes from 'prop-types';
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part, index) => (
          <p key={index}>
            {part.name} {part.exercises}
          </p>
        ))}
      </div>
    );
  };

  Content.propTypes = {
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        exercises: PropTypes.number.isRequired
      })
    ).isRequired
  };
  
  export default Content;
