import Cale

const Planning = ({ Calendar }) => {
  return <div>calendrier id {id}</div>;
};

export default Planning;

export async function getServerSideProps({ params }) {
  await dbConnect()

  const calendar = await Calendar.findById(params.id).lean()
  pet._id = pet._id.toString()

  return { props: { pet } }
}