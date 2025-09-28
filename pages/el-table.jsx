import { Input, Button, Checkbox } from "antd";
import { useState } from "react";
import Handlebars from "handlebars";

const template = Handlebars.compile(
  `{{#each columns}}
  <el-table-column prop="{{this.prop}}" label="{{this.label}}" {{attributes ../attrs}}></el-table-column>
  {{/each}}`,
);
Handlebars.registerHelper("attributes", function (attrs, options) {
  let result = "";
  for (const attr of attrs) {
    let value = attr.value;
    result += ` ${Handlebars.escapeExpression(attr.attr)}="${Handlebars.escapeExpression(value)}"`;
  }
  return new Handlebars.SafeString(result); // 注意 SafeString，Handlebars 不会对这段 HTML 进行转义
});
function ElTable() {
  const [result, setResult] = useState(`dv`);
  const [prefix, setPrefix] = useState([]);
  const [columns, setColumns] = useState([]);
  const [attrs, setAttrs] = useState([]);
  const onChange = (el) => {
    const text = el.target.value;
    if (!text) {
      setColumns(() => []);
      return;
    }
    const list = [];
    text.split("\n").forEach((item) => {
      let [prop, label] = item.split(":");
      prop = prop.trim();
      label = label.trim();
      label = label.split(" ")[0];
      list.push({ label, prop });
    });
    setColumns(() => list);
  };
  const onTypeChange = (val) => {};
  const handleSubmit = () => {
    setResult(template({ columns: columns, attrs: attrs }));
  };
  const plainOptions = ["index", "selection"];
  const columnOptions = [
    { label: "width", value: "width" },
    { label: "min-width", value: "min-width" },
    { label: "align", value: "align" },
    { label: "header-align", value: "header-align" },
    { label: "show-overflow-tooltip", value: "show-overflow-tooltip" },
  ];
  const onAttrChange = (val) => {
    setAttrs(() => val.map((item) => ({ attr: item, value: "1" })));
  };
  return (
    <div>
      <Input.TextArea
        placeholder="textarea with clear icon"
        allowClear
        rows={10}
        onChange={onChange}
      />
      <Button onClick={handleSubmit} type="primary">
        生成
      </Button>
      <div>
        <Checkbox.Group
          options={plainOptions}
          defaultValue={["Apple"]}
          onChange={onTypeChange}
        />
      </div>
      <div>
        <Checkbox.Group options={columnOptions} onChange={onAttrChange} />
      </div>
      {result}
    </div>
  );
}

export default ElTable;
