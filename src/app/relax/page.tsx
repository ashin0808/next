"use client";

import { useState } from "react";
import Image from "next/image";

type Comment = {
  img: string;
  title: string;
  content: string;
  send_user: string;
  comment_list: CommentList[];
}
type CommentList = {
  anonymity: number;
  img: string;
  send_user: string;
  content: string;
  send_user_id: string;
  toUser: string;
  comment_list: CommentList[];
}

export default function Relax() {
  const [form, setForm] = useState({
    feedId: "4424596",
    sign: "0a0ca6365f60a0677d187bbb1185872b",
    token: "b210d9ea-1223-41ba-93b7-ef0a9d9e555b",
    customname: "075ae0b7-fcd0-408e-bbd0-fb4b1c47d3cf",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const [comment, setComment] = useState<Comment>({
    img: "",
    title: "",
    content: "",
    send_user: "",
    comment_list: []
  });
  const [commentStatus, setCommentStatus] = useState('empty');

  const getData = async () => {
    setCommentStatus('loading');
    try {
      const res = await fetch(`/api/cloud_community?feedId=${form.feedId}&sign=${form.sign}&token=${form.token}&customname=${form.customname}`);
      if (!res.ok) {
        setCommentStatus('empty');
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      console.log(data);
      setComment(data);
      setCommentStatus('success');
    } catch (error) {
      setCommentStatus('empty');
    }
  }
  
  return (
    <div className="min-h-screen flex p-4">
      <div className="mr-4">
        <div>
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        </div>
        <div className="flex items-center justify-center bg-slate-500 rounded-md p-2 text-white cursor-pointer" onClick={getData}>查看</div>
      </div>
      <div className="bg-white flex-1 rounded-xl p-3">
        {
          commentStatus === 'empty' ? <div>暂无数据</div> : commentStatus === 'loading' ? <div>加载中...</div> : 
          <>
            <div className="bg-white mb-5">
              <div className="font-bold text-lg">{comment.title}</div>
              <div className="flex items-center">
                <Image className="rounded-full overflow-hidden" src={comment.img} width={20} height={20} alt={""} />
                <span className="ml-2">{comment.send_user}</span>
              </div>
              <div className="text-gray-950 mt-3" dangerouslySetInnerHTML={{__html: comment.content}}></div>
            </div>
            <div>
              {comment.comment_list.length > 0 ?
                <>
                  <div className="text-xs text-gray-500">全部评论 {comment.comment_list.length}</div>
                  {comment.comment_list.map((item: any, index: number) => (
                    <div key={index + item.send_user_id} className="bg-gray-100 p-2 my-2 rounded-md">
                      <div className="flex items-center">
                        <Image className="rounded-full overflow-hidden" src={item.img} width={20} height={20} alt={""} />
                        <div className="ml-2 relative">
                          <span className="text-sm text-gray-800">{item.send_user}</span>
                          {item.anonymity === 0 && <span className="text-xs absolute right-0 top-0 translate-x-full bg-rose-400 px-1 rounded-full text-white">匿</span>}
                        </div>
                      </div>
                      <div className="mt-1 text-sm">{item.content}</div>
                      {item.comment_list.length > 0 && 
                        <div>
                          {item.comment_list.map((subItem: any, subIndex: number) => (
                            <div key={subIndex + subItem.send_user_id} className="bg-gray-200 p-2 my-2 rounded-md">
                              <div className="flex items-center">
                                <Image className="rounded-full overflow-hidden" src={subItem.img} width={20} height={20} alt={""} />
                                <div className={`relative ml-1 ${subItem.anonymity === 0 ? 'mr-5' : 'mr-1'}`}>
                                  <span className="text-sm text-gray-800">{subItem.send_user}</span>
                                  {subItem.anonymity === 0 && <span className="text-xs absolute right-0 top-0 translate-x-full bg-rose-400 px-1 rounded-full text-white">匿</span>}
                                </div>
                                <span className="text-sm text-gray-500">回复</span>
                                <span className="text-sm text-gray-800 ml-1">{subItem.toUser}</span>
                              </div>
                              <div className="text-sm mt-1">{subItem.content}</div>
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  ))}
                </>
                : <div>暂无评论</div>}
            </div>
          </>
        }
        
      </div>
    </div>
  );
}
