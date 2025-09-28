import { Input, Button, Checkbox } from "antd";
import { useState } from "react";
import Handlebars from "handlebars";

const template = Handlebars.compile(
  `
import request from '@/utils/request'

  {{#each list}}
export function {{name}}(params) {
  return request({
    url: "{{url}}",
    method: "{{method}}",
    {{#if isData}}
    data: params,
    {{else}}
    params,
    {{/if}}
  });
}

{{/each}}
`,
);
const onChange = (el) => {
  const text = el.target.value;
  if (!text) {
    setColumns(() => []);
    return;
  }
  const list = [];
  text.split("\n").forEach((item) => {
    let [url, method] = item.split(" ");
    list.push({ url, name: url.split() });
  });
  setColumns(() => list);
};

const handleSubmit = () => {
  const text = template({
    list: [
      { name: "111", url: "hddd/ddd", isData: false, method: 'get' },
      { name: "111", url: "hddd/ddd", isData: true, method: 'post' },
    ],
  });
  console.log("text:", text);
};

const request = () => {
  return (
    <div>
      <Input.TextArea rows={10}></Input.TextArea>
      <Button type="primary" onClick={handleSubmit}>
        生成
      </Button>
    </div>
  );
};

export default request;
