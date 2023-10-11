import { SearchOutlined } from "@ant-design/icons"
import { Select } from "antd"
import cn from "classnames"
export const Search = () => {
const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}
  return (
    <form className={cn({
      "header-fixed": scroll,
    },'search-form ')}>
    <div className='search-input'>
    <label htmlFor="local">Địa điểm</label>
    <Select
    showSearch
    id="local"
    style={{ width: "auto", display:"block" }}
    placeholder="Bạn muốn đi đâu?"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
    </div>
    <div className='search-input'>
    <label htmlFor="checkIn">Nhận phòng</label>
    <input id='checkIn' type="text"  placeholder='Ngày đến' />
    </div>
    <div className='search-input'>
    <label htmlFor="checkOut">Trả phòng</label>
    <input id='checkOut' type="text"  placeholder='Ngày đi' />
    </div>
    <div className='search-input'>
    <label htmlFor="guest">Khách</label>
    <input id='guest' type="text"  placeholder='Số khách' />
    </div>
    <div>
    <SearchOutlined type='button' className='search-icon' />

    </div>
    </form>
  )
}
