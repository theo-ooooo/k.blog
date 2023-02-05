import { useState } from "react";
import LabelInput from "../system/Labelnput";
import Tag from "./Tag";

interface TagInterface {
  id: number;
  name: string;
}

interface Props {
  list: TagInterface[];
  visible: boolean;
  selectedTag: TagInterface[];
}

function TagLayer(props: Props) {
  const { list, visible, selectedTag } = props;

  const [tag, setTag] = useState("");
  //   const [selectTag, setSelectTag] = useState<TagInterface>(selectedTag || []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTag(value);
  };
  if (!visible) return;
  return (
    <div className="fixed top-[50%] left-[50%] w-[500px] h-[500px] bg-white translate-x-[-50%] translate-y-[-50%] p-5">
      <div className="mb-5">
        <LabelInput
          label="태그"
          placeholder="태그를 입력해주세요"
          type="text"
          name="tags"
          onChange={onChange}
          value={tag}
          //   onKeyDown={onKeyDown}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg mb-3">리스트</h2>
        <div className="flex gap-1">
          {list.map((item) => (
            //   <li key={item.id}>{item.name}</li>
            <Tag key={item.id} tag={item.name} onClick={() => {}} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg mb-3">선택된 태그 리스트</h2>
        <div className="flex gap-1">
          {selectedTag.map((item) => (
            //   <li key={item.id}>{item.name}</li>
            <Tag key={item.id} tag={item.name} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TagLayer;
