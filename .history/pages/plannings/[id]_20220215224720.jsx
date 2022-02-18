import { Calendar } from "../../models"

const Planning = ({ calendar }) => {
  return <div>calendrier id {calendar._id}</div>;
};

export default Planning;

export async function getServerSideProps({ params }) {
  await dbConnect()

  const calendar = await Calendar.findById(params.id).lean()
  calendar._id = calendar._id.toString()

  return { props: { calendar } }
}