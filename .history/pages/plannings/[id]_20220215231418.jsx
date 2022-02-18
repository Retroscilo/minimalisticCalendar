import { Calendar } from "../../models"
import dbConnect from "../../lib/dbConnect";

const Planning = ({ calendar }) => {
  console.log(calendar)
  return <div>calendrier id</div>;
};

export default Planning;

export async function getServerSideProps({ params }) {
  await dbConnect()
  console.log(params.id)

  const calendar = await Calendar.findById(params.id).lean()
  calendar._id = calendar._id.toString()

  return { props: { calendar } }
}