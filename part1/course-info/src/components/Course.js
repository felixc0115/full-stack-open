const Header = ({ title }) => <h1>{title}</h1>;

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};
const Total = ({ course }) => (
  <strong>
    Number of exercises{" "}
    {course.parts.reduce((total, part) => total + part.exercises, 0)}
  </strong>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
