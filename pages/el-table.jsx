import { Input, Button, Checkbox, Select } from "antd";
import { useState } from "react";
import * as nunjucks from "nunjucks";
const placeholder = `region:行政区划
lon : 经度
lat : 纬度
position : 地理位置
area : 面积（亩）
land_type : 土地类型 【1.建设用地 2.农用地 3.未利用地 4.其他】
ownership : 权属 【1.国有  2. 集体  3.个人】
usage : 使用情况`;
nunjucks.configure({
  trimBlocks: true, // 自动移除块周围的换行
  lstripBlocks: true, // 移除块开始位置的空白
});

const templateStr = `<el-table :data="tableData" border>
  <el-table-column type="index" width="50" label="序号" />
  <el-table-column type="selection" width="50" />

{%for item in columns %}
  <el-table-column prop="{{item.prop}}" label="{{item.label}}"{%for attr in attrs %} {{attr.attr}}{% if attr.value  %}="{{attr.value}}"{% endif %}{% endfor %}>
  {% if item.prop in scopes %}
  {% raw %}    </el-table>
      <div>
        {{ scope.row }}
      </div>
    </template>{% endraw %}
  {% endif %}  </el-table-column>
  {% endfor %}

  <el-table-column width="100" label="操作">
  {% raw %}    <template slot-scope="scope">
      <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
      <el-popconfirm
        title="确定删除?"
        @confirm="handleDelete([scope.row])"
      >
        <el-button
          slot="reference"
          type="text"
          style="color: #f56c6c; margin-left: 8px"
          >删除</el-button>
        </el-popconfirm>
      </template>
    </template>{% endraw %}
  </el-table-column>
  </el-table>`;

function ElTable() {
  const [result, setResult] = useState(``);
  const [prefix, setPrefix] = useState([]);
  const [columns, setColumns] = useState([]);
  const [attrs, setAttrs] = useState([]);
  const [scopes, setScopes] = useState(false);
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
      list.push({ label, prop, value: prop });
    });
    setColumns(() => list);
  };
  const handleSubmit = () => {
    setResult(
      nunjucks.renderString(templateStr, {
        columns: columns,
        attrs: attrs,
        scopes,
      }),
    );
  };
  const columnOptions = [
    { label: "width", value: "width", defaultValue: "80" },
    { label: "min-width", value: "min-width", defaultValue: "80" },
    { label: "align", value: "align", defaultValue: "center" },
    { label: "show-overflow-tooltip", value: "show-overflow-tooltip" },
  ];
  const onAttrChange = (val) => {
    setAttrs(() =>
      val.map((attr) => {
        const item = columnOptions.find((o) => o.value === attr);
        return { attr, value: item.defaultValue };
      }),
    );
  };
  const onScopeChange = (checked) => {
    setScopes(checked);
  };
  return (
    <div>
      <Input.TextArea
        placeholder={placeholder}
        allowClear
        rows={10}
        onChange={onChange}
      />
      <Button onClick={handleSubmit} type="primary">
        生成
      </Button>
      <div>
        <Checkbox.Group options={columnOptions} onChange={onAttrChange} />
        <div className="flex gap-3 items-center">
          模板
          <Select
            allowClear
            style={{ minWidth: "200px" }}
            mode="multiple"
            onChange={onScopeChange}
            options={columns}
          />
        </div>
      </div>
      <pre>
        <code>{result}</code>
      </pre>
    </div>
  );
}

export default ElTable;
