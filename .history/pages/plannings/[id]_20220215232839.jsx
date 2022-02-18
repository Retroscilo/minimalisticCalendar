import { User, Calendar } from "../../models"
import dbConnect from "../../lib/dbConnect";
import { useSession, getSession } from "next-auth/react";

const Planning = ({ calendar }) => {
  console.log(calendar)
  return <div>calendrier id : {calendar._id}</div>;
};

export default Planning;

export async function getServerSideProps(context) {
  await dbConnect()
  const session = await getSession(context)

  const user = User.findOne({email: session.user.email}).lean()
  console.log(user.owned)
  const calendar = await Calendar.findById(context.params.id).lean()
  calendar._id = calendar._id.toString()

  return { props: { calendar: JSON.parse(JSON.stringify(calendar)) } }
}