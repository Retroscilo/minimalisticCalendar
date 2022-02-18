import { User, Calendar } from "../../models";
import dbConnect from "../../lib/dbConnect";
import { useSession, getSession } from "next-auth/react";

const Planning = ({ calendar }) => {
  console.log(calendar);
  if (!calendar)
    return (
      <div>
        Vous n'avez pas les autorisations nécessaires pour voir ce calendrier.
      </div>
    );
  return <div>calendrier id : {calendar._id}</div>;
};

export default Planning;

export async function getServerSideProps(context) {
  await dbConnect();
  const session = await getSession(context);
  const user = await User.findOne({ email: session.user.email }).lean();
  const calendar = await Calendar.findById(context.params.id).lean();

  const owner = calendar.owner.toString();
  const editors = calendar.editors.map((editor) => editor.toString());
  const readers = calendar.readers.map((reader) => reader.toString());
  if (!calendar.public && [owner, ...editors, ...readers].indexOf(user._id.toString()) === -1)
    return { props: { calendar: null } };

  return { props: { calendar: JSON.parse(JSON.stringify(calendar)) } };
}
