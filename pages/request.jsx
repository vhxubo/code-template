import { Input, Button, Checkbox } from "antd";
import { useState } from "react";
import * as nunjucks from "nunjucks";

nunjucks.configure({
  trimBlocks: true, // 自动移除块周围的换行
  lstripBlocks: true, // 移除块开始位置的空白
});
const placeholder = `/exposed/land post updateLand 更新数据
/exposed/land post updateLand`;
const templateStr = `
import request from "@/utils/request"

{% for item in list %}
{% if item.comment %}
/**
 * {{item.comment}}
 */
{% endif %}
export function {{ item.name }}(params) {
  return request({
    url: "{{ item.url }}",
    method: "{{ item.method }}",
    {% if item.method == 'post' %}
    data: params,
    {% else %}
    params,
    {% endif %}
  });
}

{% endfor %}
`;

const request = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const onChange = (el) => {
    const text = el.target.value;
    setValue(text);
  };

  const handleSubmit = () => {
    const _list = [];
    value.split("\n").forEach((item) => {
      const params = item.split(" ");
      let url = params[0];
      let name = url.split("/")[url.split("/").length - 1];
      let comment = "";
      if (params.length >= 3) {
        name = params[2];
      }
      if (params.length >= 4) {
        comment = params[3];
      }
      let method = params[1] || "get";
      _list.push({
        url,
        name,
        method,
        comment,
      });
    });
    const text = nunjucks.renderString(templateStr, {
      list: _list,
    });
    setResult(text);
  };

  return (
    <div>
      <Input.TextArea
        rows={10}
        onChange={onChange}
        placeholder={placeholder}
      ></Input.TextArea>
      <Button type="primary" onClick={handleSubmit} disabled={!value}>
        生成
      </Button>
      <pre>
        <code>{result}</code>
      </pre>
    </div>
  );
};

export default request;
