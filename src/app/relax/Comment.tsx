import Image from "next/image";

type IForm = {
  feedId: string;
  sign: string;
  token: string;
  customname: string;
};

export default async function Comment(props: IForm) {
  const res = await fetch(`/api/cloud_community?feedId=${props.feedId}&sign=${props.sign}&token=${props.token}&customname=${props.customname}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <div>{data.title}</div>
      <div>
        <Image src={data.img} width={100} height={100} alt={""} />
      </div>
      <div>{data.content}</div>
    </div>
  )
}